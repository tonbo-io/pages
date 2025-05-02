<script>
	import '../../app.css';
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class="min-h-screen h-fit w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<article
			class="w-full sm:w-[600px] md:w-[800px] mx-auto relative flex flex-col text-background-dark px-10 leading-[1.618] pb-[4rem] md:border-x-0 border-background-dark sm:px-0"
		>
			<slot />
		</article>
	</div>
</div>

<style lang="postcss">
	:global(.blog-content) {
		@apply mt-10;
	}

	:global(.blog-content h1) {
		@apply text-[2.5rem] font-medium;
	}

	:global(.blog-content h2) {
		@apply text-[1.2rem] font-medium mt-[1.2rem];
	}

	:global(.blog-content h3) {
		@apply text-[1rem] font-medium mt-[1rem];
	}

	:global(.blog-content p) {
		@apply mt-[1rem];
	}

	:global(.blog-content a) {
		@apply underline;
	}

	:global(.blog-content ul) {
		@apply pl-8 list-disc;
	}

	:global(.blog-content ol) {
		@apply pl-8 list-decimal;
	}

	:global(.blog-content li) {
		@apply pl-2;
	}

	:global(.blog-content code) {
		@apply px-1 rounded font-code bg-background-dark text-background-light;
	}

	:global(.blog-content pre) {
		@apply p-4 rounded overflow-x-auto font-code text-sm bg-background-dark text-background-light;
	}

	:global(.blog-content pre code) {
		@apply bg-transparent p-0 text-background-light;
	}

	:global(.blog-content blockquote) {
		@apply border-l-4 pl-4 italic;
	}

	:global(.blog-content ::selection) {
		@apply bg-background-dark text-background-light;
	}
</style>
