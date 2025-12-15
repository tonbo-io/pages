<script>
	import PageHeader from '../header.svelte';
	import 'highlight.js/styles/atom-one-dark.css';

	const posts = [
		{
			title: 'Introducing Aisle: a pushdown Parquet scanner',
			slug: 'introducing-aisle',
			desc: "We are excited to introduce Aisle: a lightweight Parquet query library that delivers efficient predicate pushdown for reading Parquet files. Aisle's binary size is only about one-fifth of the DataFusion Parquet datasource, making it compact and easy to embed.",
			date: '2025/05/29',
			isNew: true,
			image: '/blog-images/filter-pushdown.png'
		},
		{
			title: 'Exploring better async Rust disk I/O',
			slug: 'exploring-better-async-rust-disk-io',
			desc: "Rust's asynchronous disk I/O efficiency is critically important to us because we're building a database called Tonbo in async Rust—a tiered-storage database that uses memory, disk, and object storage layers on top of the Parquet format. However, as many in the community have observed, async Rust's disk I/O is not always ideal, largely because fully asynchronous file I/O APIs are still relatively new on most mainstream operating systems.",
			date: '2025/03/24'
		},
		{
			title: 'Threads with WebAssembly',
			slug: 'threads-with-webassembly',
			desc: 'Multi-threading is a cornerstone of modern programming, enabling applications to handle multiple tasks simultaneously. While web browsers support concurrency through the Web Workers API, WebAssembly (Wasm) still lacks built-in thread support. Currently, threading in Wasm is part of an active proposal in Phase 4 (standardizing the feature), as detailed in the WebAssembly specificcation.',
			date: '2024/12/27'
		},
		{
			title: 'Async Rust is not safe with io_uring',
			slug: 'async-rust-is-not-safe-with-io-uring',
			desc: 'Barbara had a lot of experience developing web services with async Rust. One day, she read a blog about io_uring, which described it as the next-generation async I/O interface for Linux. Interested, Barbara decided to try it out in her sidecar web service...',
			date: '2024/10/30'
		},
		{
			title: 'Introducing Tonbo',
			slug: 'introducing-tonbo',
			desc: 'We\'re excited to announce that Tonbo is now open source in its preview version! Tonbo is an embedded persistent database written in Rust. It provides essential KV-like methods: insert, filter, and range scan, making it a foundation for data-intensive applications, including other types of databases. It also supports type-safe structured data storage. For Rust developers, we offer an ORM-like macro for ease of use...',
			date: '2024/08/14'
		}
	];
</script>

<div class="bg-background-light font-code min-h-screen">
	<div
		class="w-full sm:w-[600px] min-[836px]:w-[768px] md:w-[1000px] lg:w-[1200px] m-auto px-4 sm:px-0 md:border-x md:border-b border-black"
	>
		<!-- header -->
		<div class="flex m-auto w-full top-0 pt-12 pb-12">
			<PageHeader title="Tonbo’s Blogs" />
		</div>

		<div class="border-t border-black">
			{#each posts as post, i}
				{#if i === 0}
					<!-- Featured Post -->
					<div
						class="border-b border-black p-6 md:p-12 flex flex-col md:flex-row gap-8 bg-[#E4E6D9]"
					>
						<div class="flex-1 flex flex-col justify-center">
							<div>
								{#if post.isNew}
									<span
										class="bg-[#FF6B4A] text-white px-2 py-0.5 text-xs font-bold inline-block mb-4 w-fit"
										>NEW</span
									>
								{/if}
								<a
									href="/blog/{post.slug}"
									class="hover:underline decoration-1 underline-offset-4 block"
								>
									<h2 class="text-2xl font-code mb-2 leading-tight">{post.title}</h2>
								</a>
								<p class="text-sm text-tonbo-gray mb-4">by Tzu Gwo • 4 minute read</p>
								<p class="text-base leading-relaxed mb-4 text-background-dark max-w-[95%]">
									{post.desc}
								</p>
								<p class="text-xs text-tonbo-gray">{post.date}</p>
							</div>
						</div>
						{#if post.image}
							<div class="flex-1 flex flex-col gap-4">
								<div
									class="aspect-[16/9] w-full bg-background-dark overflow-hidden border border-black"
								>
									<img src={post.image} alt={post.title} class="w-full h-full object-cover" />
								</div>
								<a
									href="/blog/{post.slug}"
									class="text-sm underline decoration-1 underline-offset-4 hover:font-code"
									>Read more →</a
								>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Regular Post -->
					<div
						class="border-b border-black py-6 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 bg-[#E4E6D9] hover:bg-[#D8DBC9] transition-colors"
					>
						<div class="flex flex-col justify-center">
							<a
								href="/blog/{post.slug}"
								class="hover:underline decoration-1 underline-offset-4 block"
							>
								<h2 class="text-2xl font-code mb-2 leading-tight">{post.title}</h2>
							</a>
							<p class="text-sm text-tonbo-gray mb-2">by Tzu Gwo • 4 minute read</p>
							<p class="text-xs text-tonbo-gray ">{post.date}</p>
						</div>
						<div class="flex flex-col justify-between">
							<p class="text-base leading-relaxed mb-6 text-background-dark">
								{post.desc}
							</p>
							<a
								href="/blog/{post.slug}"
								class="text-sm underline decoration-1 underline-offset-4 hover:font-code"
								>Read more →</a
							>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
