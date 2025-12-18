<script>
	import PageHeader from '../../header.svelte';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-background-light font-code selection:bg-background-dark selection:text-background-light">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px] lg:w-[1198px] m-auto pt-12">
			<PageHeader title="Product Engineer" />
		</div>

		<div class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-6 min-h-full m-auto">
			<!-- <div class="apply-selection">
				<h1
					class="py-4 my-4 text-2xl border-b-2 border-black border-dashed sm:border-b-0 md:text-xl"
				>
					Product Engineer
				</h1>
			</div> -->

			<div class="job-description mt-8">
				<!-- <p class="mb-6">
					We're looking for a versatile product engineer to help us build Tonbo — a next-generation
					local-first data platform.
				</p> -->

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What You'll Do
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Build full-stack features from scratch, including data analysis and visualization
							services
						</li>
						<li>
							Collaborate with the database team to design and implement SDKs in TypeScript and
							Python
						</li>
						<li>Develop clean, maintainable, and well-documented implementations</li>
						<li>Take ownership of everything related to UI/UX</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What We're Looking For
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Proficiency in at least one modern frontend framework: Next.js/React, Vue, or Svelte
						</li>
						<li>Hands-on experience with D3.js for building interactive data visualizations</li>
						<li>
							Familiarity with ORMs such as Drizzle or Prisma, or an understanding of how they work
						</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						Nice to Have
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>Experience with WebAssembly</li>
						<li>Rust programming skills</li>
						<li>Have built and shipped an AI agent</li>
					</ul>
				</div>

				<!-- <div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What We Value
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							<span class="font-bold">Curiosity:</span> You're excited by new technology, open-minded,
							and plugged into developer communities
						</li>
						<li>
							<span class="font-bold">Speed:</span> You move fast, learn fast, and can quickly evaluate
							and deliver solutions
						</li>
						<li>
							<span class="font-bold">Teamwork:</span> You communicate clearly, take initiative, and
							collaborate closely with others to grow together
						</li>
					</ul>
				</div> -->

				<div
					class="apply-section mt-12 mb-8 p-6 border-2 border-black bg-background-dark text-[#E7F1BE]"
				>
					<h2 class="text-xl font-bold mb-4">How to Apply</h2>
					<p class="mb-4">
						Interested in joining our team? Please send your resume and a brief introduction to <a
							href="mailto:hiring@tonbo.io"
							class="underline hover:text-white">hiring@tonbo.io</a
						>.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
