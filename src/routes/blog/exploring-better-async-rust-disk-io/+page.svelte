<div class="bg-[#E7F1BE] font-code">
	<div
		class=" min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<article
			class="w-full sm:w-[600px] md:w-[800px] mx-auto relative flex flex-col text-background-dark px-10 leading-[1.618] pb-[4rem] md:border-x-0 border-background-dark sm:px-0"
		>
			<div class="mt-10">
				<h1 class="text-[2.5rem] font-medium">Exploring better async Rust disk I/O</h1>
				<p class="text-[0.75rem] mb-[1rem]">March 24, 2025 by Ruiwen Cheng, Tzu Gwo</p>
			</div>

			<h2 class="text-[1.2rem] font-medium mt-[1.2rem]">TL;DR</h2>
			<p class="pl-8 font-code text-background-dark">
				1. In most real-world scenarios involving sequential writes and random reads, using
				spawn_blocking/block_in_place together with write and <a
					href="https://man7.org/linux/man-pages/man2/pread.2.html"
					class="underline">pread</a
				> provides sufficiently good performance.
			</p>
			<p class="pl-8 font-code text-background-dark">
				2. To truly leverage an <a href="https://en.wikipedia.org/wiki/Io_uring" class="underline"
					>io_uring</a
				>-based runtime, the upper layers of your application need to cooperate. Since many popular
				libraries (for example, Parquet) default to using Tokio as their async runtime, merely
				swapping out the underlying I/O API is not enough to fully exploit io_uring’s potential.
			</p>
			<p class="mt-[1rem]">
				Rust’s asynchronous disk I/O efficiency is critically important to us because we’re building
				a database called <a href="https://github.com/tonbo-io/tonbo" class="underline">Tonbo</a> in
				async Rust—a tiered-storage database that uses memory, disk, and object storage layers on
				top of the Parquet format. However, as many in the community have observed,
				<a
					href="https://tokio.rs/tokio/tutorial#:~:text=to%20their%20needs.-,When%20not%20to%20use%20Tokio,-Although%20Tokio%20is"
					class="underline">async Rust’s disk I/O is not always ideal</a
				>, largely because fully asynchronous file I/O APIs are still relatively new on most
				mainstream operating systems.
			</p>
			<p class="mt-[1rem]">
				But for Tonbo, we still want to push for greater efficiency in async Rust. To that end, we
				developed <a href="https://github.com/tonbo-io/fusio" class="underline">Fusio</a>. The goal
				of Fusio is to provide a minimal cost abstraction layer that delivers unified asynchronous
				data access across various platforms—whether that’s a browser, a Linux or others—covering
				memory, local disks, and object storage.
			</p>
			<p class="mt-[1rem]">
				In async Rust, an executor usually tightly coupled to I/O reactor, which means you can’t
				just pick and choose I/O features from different async runtimes without significant hassle.
				Fusio addresses this problem by offering a stable set of I/O APIs, allowing you to switch
				seamlessly at compile time between different async runtimes as backends—such as Tokio,
				tokio-uring, monoio and WASM executor—without rewriting your code or juggling multiple,
				inconsistent interfaces.
			</p>
			<p class="mt-[1rem]">
				Therefore, we designed our latest I/O implementation tests around Fusio. Rather than
				measuring every possible file access pattern, we focus on two specific scenarios: sequential
				writes and random reads. Our reasoning is twofold:
			</p>
			<p class="pl-8 font-code text-background-dark">
				1. Most target platforms and storage media provide near-ideal support for sequential writes
				and random reads.
			</p>
			<p class="pl-8 font-code text-background-dark">
				2. Based on sequential writes and random reads, you can still build a highly efficient
				database. In Tonbo’s case, we use Parquet as our file format—though Parquet isn’t efficient
				for record updates, so Tonbo organizes Parquet files using an <a
					href="https://www.scylladb.com/glossary/log-structured-merge-tree/"
					class="underline">LSM-Tree</a
				>. An LSM-Tree is naturally suited to a write-once, read-many pattern, making it an
				excellent match for sequential writes and random reads.
			</p>
			<p class="mt-[1rem]">
				To ensure the test results are broadly applicable and relevant to common production
				environments, we conducted our benchmarks on an AWS EC2 t3a.xlarge instance. You can find
				more detailed information about our setup at the end of this blog.
			</p>
			<p class="mt-[1rem]">In our benchmarks, we compared three approaches:</p>
			<p class="pl-8 font-code text-background-dark">
				• fusio/<a href="https://github.com/bytedance/monoio" class="underline">monoio</a>: monoio
				is a well-known async runtime that uses io_uring as its I/O API.
			</p>
			<p class="pl-8 font-code text-background-dark">
				• <a href="https://tokio.rs/" class="underline">tokio</a>: Tokio is the most popular async
				Rust runtime. It uses a thread pool for disk I/O, first copying the read/write buffer, then
				handing it off to a worker thread to execute read, write, and seek operations.
			</p>
			<p class="pl-8 font-code text-background-dark">
				• fusio/tokio: Unlike vanilla Tokio, Fusio’s Tokio backend takes advantage of <a
					href="https://dtantsur.github.io/rust-openstack/tokio/index.html#cpu-bound-tasks-and-blocking-code"
					class="underline">spawn_blocking and block_in_place</a
				>, combined with write and pread calls to reduce the system call overhead of random reads.
			</p>
			<p class="mt-[1rem]">
				We designed two sets of benchmark scenarios to assess how extra (non-I/O) workload
				influences I/O efficiency. In all setups, we minimized the impact of user-space buffering on
				our measured I/O load:
			</p>
			<p class="pl-8 font-code text-background-dark">
				1. 4KB random reads and sequential writes with no additional compute load (see <a
					href="https://github.com/tonbo-io/fusio/blob/main/benches/tokio.rs"
					class="underline">fusio/benches/tokio.rs at main</a
				>
				and
				<a href="https://github.com/tonbo-io/fusio/blob/main/benches/monoio.rs" class="underline"
					>fusio/benches/monoio.rs at main</a
				>).
			</p>
			<p class="pl-8 font-code text-background-dark">
				2. Sequential writes to a Parquet file and random reads from the same file (<a
					href="https://github.com/tonbo-io/fusio/blob/main/benches/parquet"
					class="underline">fusio/benches/parquet at main</a
				>).
			</p>
			<p class="mt-[1rem]">Let’s start by looking at the no-load scenarios:</p>
			<pre class="mt-[1rem] text-[0.75rem]">
											random read (4KB)
							  ╔══════════════════════════════════════════════════╗
				 tokio        ╢██████████████████████████████████████████████████╟ 110.02
				 fusio/monoio ╢██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 3.7844
				 fusio/tokio  ╢█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 2.4747
							  ╠══════════════════════════════════════════════════╣
							  0                                                  110.02 / µs


											sequential write (4KB)
							  ╔══════════════════════════════════════════════════╗
				 tokio        ╢██████████████████████████████████████████████████╟ 66.49
				 fusio/tokio  ╢█████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 28.243
				 fusio/monoio ╢███████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 25.609
							  ╠══════════════════════════════════════════════════╣
							  0                                                  66.49 / µs
											  (lower is better)
			</pre>
			<p class="mt-[1rem]">
				In the 4KB random read test with zero compute load, native Tokio is 44 times slower than the
				fastest fusio/tokio implementation. The primary bottleneck is the overhead of synchronizing
				between the I/O-issuing thread and the thread-pool workers, as well as the additional seek
				system calls. Using pread helps sidestep these extra system calls. On the other hand, monoio
				(which leverages io_uring) achieves read/write efficiency close to what you’d get with
				pwrite and read.
			</p>
			<p class="mt-[1rem]">
				In the compute workload scenarios, we also introduced Apache Opendal for further comparison.
				Opendal is a popular Rust data access layer that supports a wide range of backends and usage
				patterns. In the parquet_opendal implementation, it uses spawn_blocking + pwrite/read as the
				I/O API under the hood.
			</p>
			<pre class="mt-[1rem] text-[0.75rem]">
											  random read (parquet)
								╔══════════════════════════════════════════════════╗
				 fusio/monoio   ╢██████████████████████████████████████████████████╟ 6.3717
				 opendal/tokio  ╢██████████████████████████████████████████░░░░░░░░╟ 5.3488
				 tokio          ╢█████████████████████████████░░░░░░░░░░░░░░░░░░░░░╟ 3.7275
				 fusio/tokio    ╢███████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 2.4724
								╠══════════════════════════════════════════════════╣
								0                                                  6.3717 / ms


											sequential write (parquet)
								╔══════════════════════════════════════════════════╗
				 opendal/tokio  ╢██████████████████████████████████████████████████╟ 4.0996
				 fusio/monoio   ╢█████████████████████████████░░░░░░░░░░░░░░░░░░░░░╟ 2.367
				 tokio          ╢████████████████████████████░░░░░░░░░░░░░░░░░░░░░░╟ 2.3348
				 fusio/tokio    ╢███████████████████████████░░░░░░░░░░░░░░░░░░░░░░░╟ 2.1974
								╠══════════════════════════════════════════════════╣
								0                                                  4.0996 / ms
			</pre>
			<p class="mt-[1rem]">
				According to the result of Opendal, user-space position control combined with pwrite isn’t
				ideal for sequential writes.
			</p>
			<p class="mt-[1rem]">
				Meanwhile, monoio shows less-than-optimal random read performance under load compared to
				no-load tests. The main reason is that while Parquet itself does not bind to any specific
				async runtime, the default runtimes used internally (by Parquet and Parquet’s data access
				APIs) typically employ work-stealing. Work-stealing requires async tasks to be thread-safe.
				However, most Rust async runtimes based on io_uring (including monoio) aren’t work-stealing,
				and thus incur extra synchronization overhead. This overhead undermines monoio’s
				thread-per-core advantage. If you’re curious about the details, check out blog:
				<a href="https://without.boats/blog/thread-per-core/" class="underline">Thread-per-core</a>.
			</p>
			<p class="mt-[1rem]">
				Also, io_uring’s ring-buffer design for submitting and completing I/O events nudges async
				runtimes toward batch submission and batched completion-handling, which can improve
				throughput at the expense of latency. Under higher concurrency and I/O pressure, io_uring
				often shines in terms of throughput, though its latency performance may suffer slightly in
				comparison.
			</p>
			<p class="mt-[1rem]">
				What do you think? If you have additional thoughts or suggestions regarding this benchmark,
				we’d love to hear them! Feel free to join us on <a
					href="https://discord.gg/j27XVFVmJM"
					class="underline">Tonbo’s Discord</a
				>
				and share your insights.
			</p>
			<p class="mt-[1rem]">Benchmark environment details:</p>
			<pre class="mt-[1rem] text-[0.75rem]">
	> uname -r
	Linux Kernel version 6.1.119-129.201.amzn2023.x86_64

	> cat /etc/os-release
	NAME="Amazon Linux"
	VERSION="2023"
	ID="amzn"
	ID_LIKE="fedora"
	VERSION_ID="2023"
	PLATFORM_ID="platform:al2023"
	PRETTY_NAME="Amazon Linux 2023.6.20241212"
	ANSI_COLOR="0;33"
	CPE_NAME="cpe:2.3:o:amazon:amazon_linux:2023"
	HOME_URL="https://aws.amazon.com/linux/amazon-linux-2023/"
	DOCUMENTATION_URL="https://docs.aws.amazon.com/linux/"
	SUPPORT_URL="https://aws.amazon.com/premiumsupport/"
	BUG_REPORT_URL="https://github.com/amazonlinux/amazon-linux-2023"
	VENDOR_NAME="AWS"
	VENDOR_URL="https://aws.amazon.com/"
	SUPPORT_END="2028-03-15"

	> cargo -V
	cargo 1.85.1 (d73d2caf9 2024-12-31)
			</pre>
		</article>
	</div>
</div>
