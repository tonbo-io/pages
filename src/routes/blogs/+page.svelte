<script>
	import '../../styles/blogs.css';
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class="min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto border-x-2 border-b-2 border-black"
	>
		<!-- header -->
		<div class="flex m-auto w-full md:min-w-[998px] lg:min-w-[1198px] top-0 pt-12">
			<PageHeader title="Tonbo’s Blogs" />
		</div>

		<!-- <div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/introducing-tonbo"
					><h1 class="mb-4 text-2xl underline">Intorucing Tonbo</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<img
						class="mb-6 md:mr-4"
						src="https://i.makeagif.com/media/1-16-2015/Oaghjm.gif"
						alt=""
					/>
					<div>
						<p>
							We’re excited to announce that Tonbo is now open source in its preview version! Tonbo
							is an embedded persistent database written in Rust. It provides essential KV-like
							methods: insert, filter, and range scan, making it a foundation for data-intensive
							applications, including other types of databases. It also supports type-safe
							structured data storage. For Rust developers, we offer an ORM-like macro for ease of
							use...<a class="underline" href="/blog/introducing-tonbo">Read more →</a>
						</p>
						<p class="text-[#6A6B54] mt-4 text-xs">2024/08/14</p>
					</div>
				</div>
			</div>
		</div> -->

		<div class="apply-blog-base">
			<div class="apply-blog-block">
				<a href="/blog/introducing-tonbo"
					><h1 class="mb-4 text-4xl underline">Intorucing Tonbo</h1></a
				>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							We’re excited to announce that Tonbo is now open source in its preview version! Tonbo
							is an embedded persistent database written in Rust. It provides essential KV-like
							methods: insert, filter, and range scan, making it a foundation for data-intensive
							applications, including other types of databases. It also supports type-safe
							structured data storage. For Rust developers, we offer an ORM-like macro for ease of
							use... <a class="underline" href="/blog/introducing-tonbo">Read more →</a>
						</p>
						<p class="text-[#6A6B54] mt-4 text-xs">2024/08/14</p>
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
							service...  <a class="underline" href="/blog/async-rust-is-not-safe-with-io-uring"
								>Read more →</a
							>
						</p>
						<p class="text-[#6A6B54] mt-4 text-xs">2024/08/14</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
