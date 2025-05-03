<script>
	import Markdown from '$lib/components/Markdown.svelte';

	const content = `
# Threads with WebAssembly

October 30, 2024 by [Rui-wen Cheng](mailto:chengruiwen@tonbo.io)

Multi-threading is a cornerstone of modern programming, enabling applications to handle multiple tasks simultaneously. While web browsers support concurrency through the [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), WebAssembly (Wasm) still lacks built-in thread support. Currently, threading in Wasm is part of an active [proposal](https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md) in Phase 4 (standardizing the feature), as detailed in the [WebAssembly specification](https://webassembly.github.io/threads/).

We faced this challenge while developing our proof of concept, [TonboLite](https://github.com/tonbo-io/sqlite-tonbo). TonboLite is a WASM compatible SQLite extension written in Rust that allows users to create tables which supports analytical processing directly in SQLite. Its storage engine is powered by our open-source embedded key-value database, [Tonbo](https://github.com/tonbo-io/tonbo). While Tonbo is thread-safe and supports asynchronous I/O, SQLite does not. When Tonbo operates as an extension within SQLite on the same thread, SQLite blocks Tonbo from scheduling asynchronous I/O, undermining the advantages of thread safety and asynchronous operations. To address this, we aimed to enable multiple SQLite threads to access a single Tonbo instance in parallel.

In this article, we will explore the current landscape of multi-threading in Wasm. Using Rust as our primary example, we'll demonstrate how to leverage multi-threading in Wasm at the moment—a technique that is theoretically applicable to other programming languages compiled to Wasm as well.

## Problems in Web Worker

We can use [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to run a background thread and communicate with them using postMessage. However, there are two significant limitations:

1. **Data Copying**: postMessage copies data back and forth between web workers, and only supports structured cloning. This data copying incurs performance overhead, especially when handling large datasets or frequent communications.

2. **Synchronous**: It is completely asynchronous, which makes synchronization in certain scenarios challenging. For example, when you need results for subsequent operations but do not know when they will be ready.

## Shared Channel

An intuitive approach to implementing synchronization is to use native inter-thread communication tools, such as \`std::sync::mpsc\`. However, sharing the channel between workers is necessary.

[shared-channel](https://github.com/wasm-rs/shared-channel) leverages \`SharedArrayBuffer\` to implement channels that can be shared in Wasm threads. It uses atomic operations like wait and notify for synchronization. The shared data must implement Serialize and Deserialize. Under the hood, it serializes and deserializes data to and from a \`ArrayBuffer\`.

Now we can use channel for synchronization like this:

\`\`\`rust
let (sender, receiver) = channel::<Data>(1024);
let worker = Worker::new("./worker.js");
let callback = wasm_bindgen::Closure<FnMut(MessageEvent)>::new(|msg| {
  sender.send(msg);
}));
worker.set_onmessage(callback.as_ref().unchecked_ref());

// Send a message to the worker.
worker.post_message(&JsValue::from(data));
let data = receiver.recv();
\`\`\`

[shared-channel](https://github.com/wasm-rs/shared-channel) solves the problem of synchronization, but data still need to be copied back and forth between web workers.

## Shared Memory

Now that we could share channel between workers by \`SharedArrayBuffer\`, why not shared the data, too? We can share the WebAssembly memory between different [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Instance).

In WebAssembly, memory is just a large contiguous, mutable array of raw bytes, that can grow over time([linear memory](https://webassembly.github.io/spec/core/intro/overview.html?highlight=linear+memory)). This memory can be created or accessed both in WebAssembly and JavaScript, allowing sharing by backing it with a \`SharedArrayBuffer\`. So, we can share memory by passing it to workers.

Here's an intuitive approach to sharing memory between workers:

\`\`\`rust
fn spawn(work: impl FnOnce() + Send + 'static) -> Result<Worker, JsValue> {
    let worker = Worker::new("./worker.js")?;

    // Send the module/memory to the worker
    let array = Array::new();
    array.push(&wasm_bindgen::module());
    array.push(&wasm_bindgen::memory());
    array.push(&JsValue::from(work));
    worker.post_message(&array)?;

    Ok(worker)
}

/// Entry point for web workers
#[wasm_bindgen]
pub fn wasm_thread_entry_point(work_ptr: u32) {
    // ......
}
\`\`\`

\`\`\`javascript
// synchronously, using the browser, import out shim JS scripts
importScripts('pkg/threads.js');

// Wait for the main thread to send us the shared module/memory. Once we've got
// it, initialize it all with the \`wasm_bindgen\` global we imported via
// \`importScripts\`.
self.onmessage = event => {
  let [ module, memory, work ] = event.data;
  wasm_bindgen(module, memory).catch(err => {
    throw err;
  }).then( wasm => {
    wasm.wasm_thread_entry_point(work);
  };
};
\`\`\`

However, this approach raises a critical question: does instantiating a [WebAssembly.Module](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Module) reset or overwrite memory? Unfortunately, it really resets and overwrites the memory. One way is to place all data segments in a separate module that is only instantiated once, then share the memory with other modules. But it is cumbersome since it requires two modules where one should be enough.

To handle this problem, the [bulk-memory-operations](https://github.com/WebAssembly/bulk-memory-operations/blob/master/proposals/bulk-memory-operations/Overview.md) proposal introduces passive segments. These segments are flagged as passive by setting the low bit of flag to 1, which means it will not be automatically copied into the memory until \`memory.init\` instruction is called. Therefore, you can initialize memory manually at the top level and then pass it to web workers.

## Thread Local Storage

Is this enough to implement threading? Not entirely. You also need a context to store thread local data, such as thread identifiers and local variables, which cannot be shared between workers. While you can implement your own thread stack or use alternative methods, the goal is to replicate the functionality of the real thread.

You may need some code like this:

\`\`\`rust
fn spawn(work: impl FnOnce() + Send + 'static) -> Result<Worker, JsValue> {
    let worker = Worker::new("./worker.js")?;
    let ctx = Context::new();
    ctx.work = work;
    // ... other thread local data

    // Send the module/memory to the worker
    let array = Array::new();
    array.push(&wasm_bindgen::module());
    array.push(&wasm_bindgen::memory());
    array.push(&JsValue::from(ctx));
    worker.post_message(&array)?;

    Ok(worker)
}
\`\`\`

## Synchronization

Although we have implemented shared memory, synchronization still remains a critical challenge. The [threads proposal](https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md) introduces atomic instructions for safe and efficient memory access. Developers can use these atomic operations similarly to how shared-channel does or use any of the classical methods of synchronous algorithms.

However, there is a key consideration: blocking APIs are not permitted on the main thread. This restriction means that synchronization techniques must rely on non-blocking mechanisms such as spin locks or [Atomics.waitAsync](https://github.com/tc39/proposal-atomics-wait-async/blob/master/PROPOSAL.md) that waits asynchronously on a shared memory location.

## Third-Party Implementation

If the aproach we discussed above is too complicated, there is a helpful crate, [wasm_thread](https://github.com/chemicstry/wasm_thread/tree/main), implements all these above for us. It abstracts the complexities of managing shared memory and thread synchronization by using \`std::thread\` and spin lock. This allows developers to spawn threads and share data seamlessly.

## References

* [Bulk Memory Operations](https://github.com/WebAssembly/bulk-memory-operations/blob/master/proposals/bulk-memory-operations/Overview.md): Bulk Memory Operations and Conditional Segment Initialization
* [threads proposal](https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md): Threading proposal for WebAssembly
* [wasm_thread](https://github.com/chemicstry/wasm_thread/tree/main): A rust \`std::thread\` replacement for wasm32 target
* [Multithreading Rust and Wasm](https://rustwasm.github.io/2018/10/24/multithreading-rust-and-wasm.html)
* [Threads and messages with Rust and WebAssembly](https://www.tweag.io/blog/2022-11-24-wasm-threads-and-messages/)
`;
</script>

<Markdown {content} />
