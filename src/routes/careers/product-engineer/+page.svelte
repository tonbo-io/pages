<script>
	import PageHeader from '../../header.svelte';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div
	class="bg-background-light font-code selection:bg-background-dark selection:text-background-light"
>
	<div class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto">
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
				<div class="section mb-8">
					<p class="text-sm text-gray-600 mb-2">Location: Remote</p>
					<p class="text-sm text-gray-600 mb-6">
						Role Type: Full-time, Early Engineer, Product-Focused
					</p>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What You'll Do
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Build product-facing components across our stack — develop the CLI tools and
							TypeScript SDK interfaces that form the core developer experience
						</li>
						<li>
							Translate low-level infra into usable product abstractions — work closely with
							database and platform engineers to turn low-level Rust-based data infrastructure into
							clean, understandable APIs and workflows
						</li>
						<li>
							Design and implement developer workflows end-to-end — from onboarding to debugging and
							inspection, own the parts of the product that make Tonbo intuitive in real-world
							applications
						</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What We're Looking For
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Strong product-oriented full-stack skills — experience building modern applications
							(React/Next.js or similar) and shaping user-facing product flows
						</li>
						<li>
							Enjoy building tools for developers — comfortable writing SDKs, libraries, CLI tools,
							or internal devtools, or curious about how such systems work under the hood
						</li>
						<li>
							Strong abstraction & product thinking — able to take complex systems and design
							simplified, intuitive user experiences on top of them
						</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						Nice to Have
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>Experience with modern TypeScript infra (e.g., Drizzle, Convex, Electric)</li>
						<li>Built an AI agent or used frameworks like LangChain, LangGraph, or AutoGen</li>
						<li>Exposure to devtools, observability tooling, or runtime systems</li>
						<li>Familiarity with backend concepts (database basics, caching, snapshotting)</li>
						<li>Open-source contributions or community engagement</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						Who Will Thrive in This Role
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>You enjoy turning technical capabilities into clean, usable product interfaces</li>
						<li>You like shaping early product and engineering culture</li>
						<li>You're comfortable in a fast-moving, highly collaborative environment</li>
						<li>You prefer ownership over narrow specialization</li>
					</ul>
				</div>

				<div
					class="apply-section mt-12 mb-8 p-6 border-2 border-black bg-background-dark text-background-light"
				>
					<h2 class="text-xl font-bold mb-4">How to Apply</h2>
					<p class="mb-4">
						Send a short introduction and links (GitHub, projects, blog posts) to: <a
							href="mailto:hiring@tonbo.io"
							class="underline hover:text-white">hiring@tonbo.io</a
						>
					</p>
					<p class="text-sm opacity-80">We review every application carefully.</p>
				</div>
			</div>
		</div>
	</div>
</div>
