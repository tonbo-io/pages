<script>
	import { CodeBlock } from 'svhighlight';

	import 'highlight.js/styles/atom-one-light.css';

	let code0 = `
use monoio::io::{AsyncReadRentExt, AsyncWriteRentExt};
use monoio::net::TcpListener;

#[monoio::main(driver = "io_uring")]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();

    loop {
        let (mut stream, _) = listener.accept().await.unwrap();
        let (result, buf) = stream.read_exact(vec![0; 11]).await;
        result.unwrap();
        let (result, _) = stream.write_all(buf).await;
        result.unwrap();
    }
}
`;

	let code1 = `
use monoio::io::{AsyncReadRentExt, AsyncWriteRentExt};
use monoio::net::TcpListener;
use monoio::select;

#[monoio::main(driver = "io_uring")]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();

    loop {
        select! {
            stream = listener.accept() => {
                let (mut stream, _) = stream.unwrap();
                let (result, buf) = stream.read_exact(vec![0; 11]).await;
                result.unwrap();
                let (result, _) = stream.write_all(buf).await;
                result.unwrap();
            }
            _ = time::sleep(Duration::from_secs(1)) => {
                // do somethings
                continue;
            }
        }
    }
}
`;

	let code2 = `
pub enum Poll<T> {
    Ready(T),
    Pending,
}

pub trait Future {
    type Output;

    // Required method
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
`;

	let code3 = `
async fn foo(z: i32) { ... }

async fn bar(x: i32, y: i32) -> i32 {
    let mut z = x + y;
    foo(z).await;
    z
}
`;

	let code4 = `
enum Bar {
    // When it starts, it contains only its arguments
    Start { x: i32, y: i32 },

    // At the first await, it must contain \`z\` and the \`Foo\` future
    FirstAwait { z: i32, foo: Foo }

    // When its finished it needs no data
    Complete,
}

impl Future for Bar {
    Output = i32

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        // if self is Start then advance self to FirstAwait
        // if self is FirstAwait then advance it to Complete
    }
}
`;

	let code5 = `
impl Future for TcpListenerAccept {
    type Output = io::Result<TcpStream>;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Item> {
        match self.accept() {
            Ok((stream, _)) => Poll::Ready(Ok(stream)),
            Err(e) if e.kind() == io::ErrorKind::WouldBlock => {
                // register the file descriptor in TcpListener
                // from the epoll interest list
                ...
                Poll::Pending
            }
            Err(e) => Poll::Ready(Some(Err(e))),
        }
    }
}
`;

	let code6 = `
...
loop {    // <- Step 0. first round of loop.

          // <- Step 5. second round of loop,
            // 💀 listener starts to next accept syscall,
            // we loose the chance to handle the previous one.

    select! {   // <- Step 1. into select! macro,
                  // accept syscall is submitted to kernel.

        stream = listener.accept() => {
            let (mut stream, _) = stream.unwrap();
            let (result, buf) = stream.read_exact(vec![0; 11]).await;
            result.unwrap();
            let (result, _) = stream.write_all(buf).await;
            result.unwrap();
        }
        _ = time::sleep(Duration::from_secs(1)) => {
			// <- Step 2. time::sleep is ready before accept,
			  // goes to this branch.

            println!("timeout");    // <- Step 3. into timeout branch,
	                                    // 💥 accept syscall behind listener.accept()
	                                    // is ready at the time.

            continue;   // <- step 4. continue to next loop.
        }
    }
}
...
`;

	let code7 = `
impl Drop for TcpListenerAccept {
    fn drop(&mut self) {
        // Cancel accept operation
        // Submit request
    }
}
`;

	let code8 = `
loop {
    let canceler = monoio::io::Canceller::new();
    let handle = canceler.handle();
    let mut timer = pin!(time::sleep(Duration::from_millis(1)));
    let mut accept = pin!(listener.cancelable_accept(handle));

    select! {
        stream = &mut accept => {
						...
        }
        _ = &mut timer => {
            canceler.cancel();
            let stream = (&mut accept).await;
            if let Ok(stream) = stream {
                let (mut stream, _) = stream;
                let (result, buf) = stream.read_exact(vec![0; 11]).await;
            }
            continue;
        }
    }
}
`;

	let code9 = `
let canceler = monoio::io::Canceller::new();
let handle = canceler.handle();

let block = async {
    async {
        ...
        async {
            let stream = listener.cancelable_accept(handle).await;
        }.await;
        ...
    }.await;
};

drop(block);
// how to cancel the inner accept future and .await for completed operation?
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
				<h1 class="text-[2.5rem] font-medium">Async Rust is not safe with io_uring</h1>
				<p class="text-[0.75rem] mb-[1rem]">October 30, 2024 by Tzu Gwo</p>
			</div>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">TL;DR</h2>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark">	1. Clone <a
					href="https://github.com/ethe/io-uring-is-not-cancellation-safe"
					class="underline">this repository</a
				> on a Linux system that supports io_uring.</pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	2. Try switching <a
					href="https://github.com/ethe/io-uring-is-not-cancellation-safe/blob/master/src/main.rs#L9-L10"
					class="underline">these two lines.</a
				></pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	3. Execute cargo run for a while.</pre>
			<p class="mt-[1rem]">
				The demo shows that even though the behavior appears similar, TCP connections leak when
				using the io_uring driver but not with the epoll driver. I've also <a
					href="https://github.com/ethe/io-uring-is-not-cancellation-safe/branches/all"
					class="underline">tested this across various io_uring runtimes,</a
				> and it turns out to be a common issue across all of them.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">
				Barbara's TCP connection mysteriously leaked
			</h2>
			<p class="mt-[1rem]">
				Barbara had a lot of experience developing web services with async Rust. One day, she read a
				blog about io_uring, which described it as the next-generation async I/O interface for
				Linux. Interested, Barbara decided to try it out in her sidecar web service.
			</p>
			<p class="mt-[1rem]">
				Rust's "async/await" model is separate from the async runtime and I/O interface
				implementations, making it easy to switch between different runtimes. Barbara was very
				familiar with Tokio, the most popular async runtime in Rust, which uses epoll for I/O
				interface. So, she looked for an async runtime that supported io_uring to transform her web
				service into an io_uring-based version.
			</p>
			<p class="mt-[1rem]">
				After some research, Barbara discovered several async runtimes like <a
					href="https://github.com/DataDog/glommio"
					class="underline">glommio,</a
				>
				<a href="https://github.com/bytedance/monoio" class="underline">monoio,</a>
				and
				<a href="https://github.com/compio-rs/compio" class="underline">compio</a> that supported io_uring.
				She decided to give one of them a try—monoio, in particular, which provided both epoll and io_uring
				interfaces and allowed for easy switching. It seemed like the perfect fit for Barbara's io_uring
				exploration.
			</p>
			<p class="mt-[1rem]">
				With her familiarity with Tokio, Barbara quickly wrote her first HTTP server demo:
			</p>
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
				Barbara thought, "Great, this looks no different from a typical Tokio program—first bind to
				an address, then continuously accept new TCP connections in a loop and process them."
			</p>
			<p class="mt-[1rem]">
				Barbara then considered her next steps. She decided to learn how to implement asynchronous
				control, such as timeouts, so that if the TCP listener did not accept a connection for a
				while, it could switch to handling some sidecar tasks (like logging) before resuming
				acceptance:
			</p>
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
			<p class="mt-[1rem]">
				Using the concurrency primitive "select" to add timeouts to futures worked well with
				io_uring. Barbara was pleased and quickly updated her web service to use io_uring,
				eventually deploying it. Everything ran smoothly until one day she noticed something odd in
				the client logs: some requests were never processed. To investigate, Barbara wrote a minimal
				example, only to find the issue was far more complex than expected.
			</p>
			<p class="mt-[1rem]">
				Barbara found that while the client running in a child thread was connecting correctly, the
				server in the main thread wasn’t proceeding as it should. Instead, the timeout kept getting
				triggered, as if the client's connection had vanished. <b class="font-medium"
					>A TCP connection leak had occurred.</b
				>
				And it wasn't just monoio—this issue affected all async runtimes that used io_uring.
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">What’s going on?</h2>
			<p class="mt-[1rem]">
				Before understanding why using "select" for timeout control in an io_uring-based async
				runtime leads to TCP connection leaks, we need to first understand why this issue doesn’t
				occur with epoll.
			</p>
			<p class="mt-[1rem]">
				The entire async Rust ecosystem is built around a core asynchronous primitive from the
				standard library: Future. Its definition is as follows:
			</p>
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
				In Rust, all asynchronous operations—not just those manually written by async library
				developers but also those written by users using "async" blocks—are defined as recursive
				future structures, which get instantiated when ".await" is called. The entire structure
				contains all the state that must be saved across suspended futures during pending
				operations. The async executor is then responsible for repeatedly calling the "poll" method
				to advance this state until completion. Consider this example async block:
			</p>
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
			<p class="mt-[1rem]">will transform to below by compiler:</p>
			<CodeBlock
				language="rust"
				code={code4}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				For a more detailed explanation of futures and how they are executed, I recommend reading
				<a href="https://en.ihcblog.com/rust-runtime-design-1/" class="underline">ihciah's blog.</a>
				He is one of the core authors of monoio.
			</p>
			<p class="mt-[1rem]">Async Rust makes a few core assumptions about futures:</p>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	1. The state of futures only change when they are polled.</pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	2. Futures are implicitly cancellable by simply never polling them again.
				</pre>
			<p>
				Futures bound to epoll adhere to these assumptions, which relates to the mechanism of epoll:
				epoll is not an asynchronous syscall mechanism; it’s an event notification mechanism. In the
				above example, the actual behavior of the "listener.accept()" future, simplified, is as
				follows:
			</p>
			<CodeBlock
				language="rust"
				code={code5}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				"self.accept()" runs synchronously, either succeeding by obtaining a TCP stream or
				encountering a "would block" exception, leaving it in a pending state until the kernel is
				ready. To cancel this operation, you simply stop polling, as the syscall only happens during
				polling.
			</p>
			<p class="mt-[1rem]">However, io_uring-bound futures break these two assumptions:</p>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	1. The syscall is executed asynchronously by the kernel, not during polling. The kernel commit the TCP stream into a kernel / user shared ring buffer, meaning the accept event is completed implicitly.</pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark">	2. You cannot simply cancel an io_uring-bound future by stopping polling, as the kernel might complete the syscall at any time, <b
					class="font-medium">even during the cancellation progress</b
				>.
				</pre>
			<p>A step-by-step explanation of the earlier example will make this process clearer:</p>
			<CodeBlock
				language="rust"
				code={code6}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">How to solve this?</h2>
			<p class="mt-[1rem]">
				Before discussing the solution, we need to break the problem down into two parts:
			</p>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark">	1. <b
					class="font-medium">I/O Safety</b
				>: Ensuring that accepted TCP streams are properly closed without leaking connections.</pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark">	2. <b
					class="font-medium">Halt Safety</b
				> (proposed by Yoshua Wuyts): Handling connections that have already been opened when they are cancelled, allowing them to continue being processed.
				</pre>
			<h3 class="text-[1.2rem] font-medium mt-[0.2rem]">I/O Safety</h3>
			<p class="mt-[1rem]">
				First of all, we are fortunate that the I/O safety problem can be addressed now, which safe
				Rust aims to ensure this in the future. Rust provides the Drop trait to define custom
				behavior when a value is cleaned up. Thus, we can do something like this:
			</p>
			<CodeBlock
				language="rust"
				code={code7}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">We just need to encourage async runtimes to implement this fix.</p>
			<h3 class="text-[1.2rem] font-medium mt-[0.2rem]">Halt Safety</h3>
			<p class="mt-[1rem]">
				Halt safety is more complicated. Monoio provides a component called "cancellable I/O" to
				properly handle the cancellation of io_uring-bound futures. A complete example can be found
				here: <a
					href="https://github.com/ethe/io-uring-is-not-cancellation-safe/blob/cancelable-io/src/main.rs"
					class="underline">cancellable I/O example.</a
				> You can run this branch to see that the connection handling behavior now matches that of epoll.
				Here, I’ll show a simplified usage:
			</p>
			<CodeBlock
				language="rust"
				code={code8}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				As you can see, besides performing the accept operation in the regular select branch, the
				timeout branch explicitly cancels the accept future. Afterwards, it proceeds to .await the
				accept future again to confirm if a TCP stream was ready during the timeout period.
			</p>
			<p class="mt-[1rem]">
				Monoio's component partially solves the problem, but there's still an issue: since a future
				is a recursive structure, an io_uring-bound future may not be directly at the place where
				cancellation occurs:
			</p>
			<CodeBlock
				language="rust"
				code={code9}
				showHeader={false}
				showLineNumbers={true}
				background="bg-background-dark"
				codeTextClasses="font-code text-background-light text-[0.8rem]"
				lineNumberTextClasses="font-code text-background-light"
				rounded="rounded-none"
			/>
			<p class="mt-[1rem]">
				Canceling a future that contains an io_uring-bound future will also affect its inner
				io_uring-bound futures. This means that the cancellation safety of io_uring-bound futures is
				"contagious." Simply converting an io_uring-bound future to cancellable I/O does not solve
				all the issues.
			</p>
			<p class="mt-[1rem]">
				Another key issue is that if you forget to handle the cancellation of an io_uring-bound
				future, there are no compile-time checks to catch it. For io_uring-bound futures, you need
				to ".await" them after cancellation to see if they have completed. This means they must be
				<b class="font-medium">used exactly once,</b>
				a concept called
				<a href="https://en.wikipedia.org/wiki/Substructural_type_system" class="underline"
					>linear types,</a
				> which ensures correct usage of resources at compile time.
			</p>
			<p class="mt-[1rem]">
				Unfortunately, Rust lacks the support for this kind of type system. For more details on why
				adding linear logic to Rust is challenging, you can refer to Without Boats' blog:
				<a
					href="https://without.boats/blog/changing-the-rules-of-rust/#:~:text=Let%E2%80%99s%20say%20you%20want%20Rust%20to%20support%20types%20which%20can%E2%80%99t%20go%20out%20of%20scope%20without%20running%20their%20destructor.%20This%20is%20one%20of%20the%20two%20different%20definitions%20of%20%E2%80%9Clinear%20types%2C%E2%80%9D"
					class="underline">Changing the rules of Rust.</a
				>
			</p>
			<h2 class="text-[1.6rem] font-medium mt-[1.6rem]">Why wrote this?</h2>
			<p class="mt-[1rem]">
				There has been a lot of discussion about memory safety in the context of io_uring. For more
				details, you can refer to these resources:
			</p>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://blog.yoshuawuyts.com/async-cancellation-1/"
					class="underline">Async Cancellation by yoshuawuyts</a
				></pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://without.boats/blog/io-uring/"
					class="underline">Notes on io-uring by withoutboats</a
				></pre>
			<pre class="break-words whitespace-pre-wrap font-code text-background-dark"> • <a
					href="https://github.com/bytedance/monoio/blob/master/docs/en/why-async-rent.md"
					class="underline">Async Rent by ihciah</a
				></pre>
			<p class="mt-[1rem]">
				However, the community rarely addresses I/O safety and halt safety with io_uring in async
				Rust. I'm presenting a specific case to draw attention to this topic. The title of this blog
				might sound a bit dramatic, but everyone has different definitions and understandings of
				"safety." What do you think about this issue:
			</p>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark"> • Keep things as they are; I/O safety and halt safety do not need guarantees from the language.</pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark"> • Rust should ensure I/O safety (this is already a goal outlined in the RFC, but not yet implemented in Rust.)</pre>
			<pre
				class="break-words whitespace-pre-wrap font-code text-background-dark"> • Rust should ensure halt safety (rarely discussed!)</pre>
		</article>
	</div>
</div>
