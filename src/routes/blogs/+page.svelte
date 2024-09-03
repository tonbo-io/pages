<script>
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class=" min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto border-x-2 border-b-2 border-black"
	>
		<div class="flex m-auto w-full md:min-w-[998px] lg:min-w-[1198px] top-0 pt-12">
			<PageHeader title="Tonbo’s Blogs" />
		</div>
		<div class="md:w-[914px] md:px-0 px-2 sm:px-0 sm:w-[600px] py-6 min-h-full m-auto">
			<div class="px-8 md:px-12 py-4 border-black border-[1px] md:border-2">
				<h1 class="mb-4 text-2xl">Movable tree CRDTs and Loro's implementation</h1>
				<div class="flex flex-col md:flex-row">
					<img
						class="mb-6 md:mr-4"
						src="https://i.makeagif.com/media/1-16-2015/Oaghjm.gif"
						alt=""
					/>
					<div>
						<p>
							This article introduces the implementation difficulties and challenges of Movable Tree
							CRDTs when collaboration, and how Loro implements it and sorts child nodes. The
							algorithm has high performance and can be used in production. <a
								class="underline"
								href="/blog/introducing-tonbo">Read more →</a
							>
						</p>
						<p class="text-[#6A6B54] mt-4 text-xs">2024/07/18</p>
					</div>
				</div>
			</div>
		</div>

		<div class="md:w-[914px] md:px-0 px-2 sm:px-0 sm:w-[600px] py-6 min-h-full m-auto">
			<div class="px-8 md:px-12 py-4 border-black border-[1px] md:border-2">
				<h1 class="mb-4 text-2xl">Movable tree CRDTs and Loro's implementation</h1>
				<div class="flex flex-col md:flex-row">
					<div>
						<p>
							This article introduces the implementation difficulties and challenges of Movable Tree
							CRDTs when collaboration, and how Loro implements it and sorts child nodes. The
							algorithm has high performance and can be used in production. <a
								class="underline"
								href="/blog/introducing-tonbo">Read more →</a
							>
						</p>
						<p class="text-[#6A6B54] mt-4 text-xs">2024/07/18</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
