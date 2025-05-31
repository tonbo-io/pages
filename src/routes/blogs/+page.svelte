<script>
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-background-light font-code">
	<div
		class="min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto border-x-2 border-b-2 border-black"
	>
		<!-- header -->
		<div class="flex m-auto w-full md:min-w-[998px] lg:min-w-[1198px] top-0 pt-12">
			<PageHeader title="Tonbo's Blogs" />
		</div>

		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/introducing-aisle"
					><h1 class="mb-4 text-4xl underline">Introducing Aisle: a pushdown Parquet scanner</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							We are excited to introduce Aisle: a lightweight Parquet query library that delivers
							efficient predicate pushdown for reading Parquet files. Aisle's binary size is only
							about one-fifth of the DataFusion Parquet datasource, making it compact and easy to
							embed. ... <a class="underline" href="/blog/introducing-aisle">Read more →</a>
						</p>
						<p class="text-tonbo-gray mt-4 text-xs">2025/05/29</p>
					</div>
				</div>
			</div>
		</div>
		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/exploring-better-async-rust-disk-io"
					><h1 class="mb-4 text-4xl underline">Exploring better async Rust disk I/O</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							Rust's asynchronous disk I/O efficiency is critically important to us because we're
							building a database called Tonbo in async Rust—a tiered-storage database that uses
							memory, disk, and object storage layers on top of the Parquet format. However, as many
							in the community have observed, async Rust's disk I/O is not always ideal, largely
							because fully asynchronous file I/O APIs are still relatively new on most mainstream
							operating systems. ... <a
								class="underline"
								href="/blog/exploring-better-async-rust-disk-io">Read more →</a
							>
						</p>
						<p class="text-tonbo-gray mt-4 text-xs">2025/03/24</p>
					</div>
				</div>
			</div>
		</div>

		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/threads-with-webassembly"
					><h1 class="mb-4 text-4xl underline">Threads with WebAssembly</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							Multi-threading is a cornerstone of modern programming, enabling applications to
							handle multiple tasks simultaneously. While web browsers support concurrency through
							the Web Workers API, WebAssembly (Wasm) still lacks built-in thread support.
							Currently, threading in Wasm is part of an active proposal in Phase 4 (standardizing
							the feature), as detailed in the WebAssembly specificcation. ... <a
								class="underline"
								href="/blog/threads-with-webassembly">Read more →</a
							>
						</p>
						<p class="text-tonbo-gray mt-4 text-xs">2024/12/27</p>
					</div>
				</div>
			</div>
		</div>

		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/async-rust-is-not-safe-with-io-uring"
					><h1 class="mb-4 text-4xl underline">Async Rust is not safe with io_uring</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							Barbara had a lot of experience developing web services with async Rust. One day, she
							read a blog about io_uring, which described it as the next-generation async I/O
							interface for Linux. Interested, Barbara decided to try it out in her sidecar web
							service... <a class="underline" href="/blog/async-rust-is-not-safe-with-io-uring"
								>Read more →</a
							>
						</p>
						<p class="text-tonbo-gray mt-4 text-xs">2024/10/30</p>
					</div>
				</div>
			</div>
		</div>

		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/introducing-tonbo"
					><h1 class="mb-4 text-4xl underline">Introducing Tonbo</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							We're excited to announce that Tonbo is now open source in its preview version! Tonbo
							is an embedded persistent database written in Rust. It provides essential KV-like
							methods: insert, filter, and range scan, making it a foundation for data-intensive
							applications, including other types of databases. It also supports type-safe
							structured data storage. For Rust developers, we offer an ORM-like macro for ease of
							use... <a class="underline" href="/blog/introducing-tonbo">Read more →</a>
						</p>
						<p class="text-tonbo-gray mt-4 text-xs">2024/08/14</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.apply-blog-base {
		@apply md:w-[914px] md:px-0 px-2 sm:px-0 sm:w-[600px] py-6 min-h-full m-auto;
	}

	.apply-blog-block {
		@apply px-8 md:px-12 py-4 border-black border-[1px] md:border-2;
	}
</style>
