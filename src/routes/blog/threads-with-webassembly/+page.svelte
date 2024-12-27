<script>
	import { CodeBlock } from 'svhighlight';

	import 'highlight.js/styles/atom-one-light.css';

	let code0 = `
let (sender, receiver) = channel::<Data>(1024);
let worker = Worker::new("./worker.js");
let callback = wasm_bindgen::Closure<FnMut(MessageEvent)>::new(|msg| {
  sender.send(msg);
}));
worker.set_onmessage(callback.as_ref().unchecked_ref());


// Send a message to the worker.
worker.post_message(&JsValue::from(data));
let data = receiver.recv();
`;

	let code1 = `
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
`;

	let code2 = `
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
`;

	let code3 = `
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
`;
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class=" min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<article
			class="w-full sm:w-[600px] md:w-[800px] mx-auto relative flex flex-col text-background-dark px-10 leading-[1.618] pb-[4rem] md:border-x-0 border-background-dark sm:px-0"
		>
			<div class="mt-10">
				<h1 class="text-[2.5rem] font-medium">Threads with WebAssembly</h1>
			</div>

			<p class="mt-[1rem]">
				Multi-threading is a cornerstone of modern programming, enabling applications to handle
				multiple tasks simultaneously. While web browsers support concurrency through the <a
					href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
					class="underline">Web Workers API</a
				>, WebAssembly (Wasm) still lacks built-in thread support. Currently, threading in Wasm is
				part of an active
				<a
					href="https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md"
					class="underline">proposal</a
				>
				in Phase 4 (standardizing the feature), as detailed in the
				<a href="https://webassembly.github.io/threads/" class="underline"
					>WebAssembly specification</a
				>.
			</p>

			<p class="mt-[1rem]">
				We faced this challenge while developing our proof of concept, <a
					href="https://github.com/tonbo-io/sqlite-tonbo"
					class="underline">TonboLite</a
				>. TonboLite is a WASM compatible SQLite extension written in Rust that allows users to
				create tables which supports analytical processing directly in SQLite. Its storage engine is
				powered by our open-source embedded key-value database,
				<a href="https://github.com/tonbo-io/tonbo" class="underline">Tonbo</a>. While Tonbo is
				thread-safe and supports asynchronous I/O, SQLite does not. When Tonbo operates as an
				extension within SQLite on the same thread, SQLite blocks Tonbo from scheduling asynchronous
				I/O, undermining the advantages of thread safety and asynchronous operations. To address
				this, we aimed to enable multiple SQLite threads to access a single Tonbo instance in
				parallel.
			</p>
			<p class="mt-[1rem]">
				In this article, we will explore the current landscape of multi-threading in Wasm. Using
				Rust as our primary example, we'll demonstrate how to leverage multi-threading in Wasm at
				the moment—a technique that is theoretically applicable to other programming languages
				compiled to Wasm as well.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Problems in Web Worker</h2>
			<p class="mt-[1rem]">
				We can use <a
					href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
					class="underline"
					>Web Workers API
				</a> to run a background thread and communicate with them using postMessage. However, there are
				two significant limitations:
			</p>

			<pre class="break-words whitespace-pre-wrap font-code text-background-dark">	1. <strong
					>Data Copying</strong
				>: postMessage copies data back and forth between web workers, and only supports structured cloning. This data copying incurs performance overhead, especially when handling large datasets or frequent communications.</pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark">	2. <strong
					>Synchronous</strong
				>: It is completely asynchronous, which makes synchronization in certain scenarios challenging. For example, when you need results for subsequent operations but do not know when they will be ready.</pre>

			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Shared Channel</h2>
			<p class="mt-[1rem]">
				An intuitive approach to implementing synchronization is to use native inter-thread
				communication tools, such as <em>std::sync::mpsc</em>. However, sharing the channel between
				workers is necessary.
			</p>
			<p class="mt-[1rem]">
				<a href="https://github.com/wasm-rs/shared-channel" class="underline">shared-channel</a>
				leverages
				<em>SharedArrayBuffer</em> to implement channels that can be shared in Wasm threads. It uses
				atomic operations like wait and notify for synchronization. The shared data must implement
				Serialize and Deserialize. Under the hood, it serializes and deserializes data to and from a
				<em>ArrayBuffer</em>.
			</p>
			<p class="mt-[1rem]">Now we can use channel for synchronization like this:</p>
			<CodeBlock
				language="rust"
				code={code0}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				<a href="https://github.com/wasm-rs/shared-channel" class="underline">shared-channel</a> solves
				the problem of synchronization, but data still need to be copied back and forth between web workers.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Shared Memory</h2>
			<p class="mt-[1rem]">
				Now that we could share channel between workers by <em>SharedArrayBuffer</em>, why not
				shared the data, too? We can share the WebAssembly memory between different
				<a
					href="https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Instance"
					class="underline">WebAssembly.Instance</a
				>.
			</p>
			<p class="mt-[1rem]">
				In WebAssembly, memory is just a large contiguous, mutable array of raw bytes, that can grow
				over time(<a
					href="https://webassembly.github.io/spec/core/intro/overview.html?highlight=linear+memory"
					class="underline">linear memory</a
				>). This memory can be created or accessed both in WebAssembly and JavaScript, allowing
				sharing by backing it with a <em>SharedArrayBuffer</em>. So, we can share memory by passing
				it to workers.
			</p>
			<p class="mt-[1rem]">Here’s an intuitive approach to sharing memory between workers:</p>
			<CodeBlock
				language="rust"
				code={code1}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<CodeBlock
				language="rust"
				code={code2}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				However, this approach raises a critical question: does instantiating a <a
					href="https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Module"
					class="underline">WebAssembly.Module</a
				> reset or overwrite memory? Unfortunately, it really resets and overwrites the memory. One way
				is to place all data segments in a separate module that is only instantiated once, then share
				the memory with other modules. But it is cumbersome since it requires two modules where one should
				be enough.
			</p>
			<p class="mt-[1rem]">
				To handle this problem, the
				<a
					href="https://github.com/WebAssembly/bulk-memory-operations/blob/master/proposals/bulk-memory-operations/Overview.md"
					class="underline">bulk-memory-operations</a
				>
				proposal introduces passive segments. These segments are flagged as passive by setting the low
				bit of flag to 1, which means it will not be automatically copied into the memory until
				<em>memory.init</em>
				instruction is called. Therefore, you can initialize memory manually at the top level and then
				pass it to web workers.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Thread Local Storage</h2>
			<p class="mt-[1rem]">
				Is this enough to implement threading? Not entirely. You also need a context to store thread
				local data, such as thread identifiers and local variables, which cannot be shared between
				workers. While you can implement your own thread stack or use alternative methods, the goal
				is to replicate the functionality of the real thread.
			</p>
			<p class="mt-[1rem]">You may need some code like this:</p>
			<CodeBlock
				language="rust"
				code={code3}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Synchronization</h2>
			<p class="mt-[1rem]">
				Although we have implemented shared memory, synchronization still remains a critical
				challenge. The <a
					href="https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md"
					class="underline">threads proposal</a
				> introduces atomic instructions for safe and efficient memory access. Developers can use these
				atomic operations similarly to how shared-channel does or use any of the classical methods of
				synchronous algorithms.
			</p>
			<p class="mt-[1rem]">
				However, there is a key consideration: blocking APIs are not permitted on the main thread.
				This restriction means that synchronization techniques must rely on non-blocking mechanisms
				such as spin locks or <a
					href="https://github.com/tc39/proposal-atomics-wait-async/blob/master/PROPOSAL.md"
					class="underline">Atomics.waitAsync</a
				> that waits asynchronously on a shared memory location.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Thift-Party Implementation</h2>
			<p class="mt-[1rem]">
				If the aproach we discussed above is too complicated, there is a helpful crate, <a
					href="https://github.com/chemicstry/wasm_thread/tree/main"
					class="underline">wasm_thread</a
				>, implements all these above for us. It abstracts the complexities of managing shared
				memory and thread synchronization by using <em>std::thread</em> and spin lock. This allows
				developers to spawn threads and share data seamlessly.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">References</h2>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://github.com/WebAssembly/bulk-memory-operations/blob/master/proposals/bulk-memory-operations/Overview.md"
					class="underline">Bulk Memory Operations</a
				>: Bulk Memory Operations and Conditional Segment Initialization</pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md"
					class="underline">threads proposal</a
				>: Threading proposal for WebAssembly</pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://github.com/chemicstry/wasm_thread/tree/main"
					class="underline">wasm_thread</a
				>: A rust <em>std::thread</em> replacement for wasm32 target</pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://rustwasm.github.io/2018/10/24/multithreading-rust-and-wasm.html"
					class="underline">Multithreading Rust and Wasm</a
				></pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://www.tweag.io/blog/2022-11-24-wasm-threads-and-messages/"
					class="underline">Threads and messages with Rust and WebAssembly</a
				></pre>
		</article>
	</div>
</div>
