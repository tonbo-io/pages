<script>
	import PageHeader from '../../header.svelte';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE] font-code selection:bg-background-dark selection:text-background-light">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px] lg:w-[1198px] m-auto pt-12">
			<PageHeader title="Database Engineer" />
		</div>

		<div class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-6 min-h-full m-auto">
			<!-- <div class="apply-selection">
				<h1
					class="py-4 my-4 text-2xl border-b-2 border-black border-dashed sm:border-b-0 md:text-xl"
				>
					Database Engineer
				</h1>
			</div> -->

			<div class="job-description mt-8">
				<!-- <p class="mb-6">
					We're building Tonbo — an embedded key-value store designed for analytics, powered by
					Apache Arrow and optimized for real-time workloads on modern storage. We're looking for a
					low-level systems engineer to join us in building its core.
				</p> -->

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What You'll Do
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Design and develop Tonbo, our open-source embedded KV database, along with other
							related components
						</li>
						<li>
							Build a serverless, real-time analytics database on top of Tonbo and object storage
							systems
						</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What We're Looking For
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							Proficient in Rust or C++, with the ability to write high-performance,
							production-ready code
						</li>
						<li>
							Strong intuition for performance — you can quickly estimate the cost of each line of
							code
						</li>
						<li>
							Skilled at leveraging type systems to design robust and well-constrained program
							architectures
						</li>
						<li>
							Experience profiling and tuning code using metrics, flamegraphs, and other performance
							tools
						</li>
					</ul>
				</div>

				<div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						Nice to Have
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>Familiarity with the internals of open-source databases like RocksDB</li>
						<li>Experience building or contributing to data-intensive systems</li>
					</ul>
				</div>

				<!-- <div class="section mb-8">
					<h2 class="text-xl font-bold mb-4 border-b border-black border-dashed pb-2">
						What We Value
					</h2>
					<ul class="list-disc pl-6 space-y-2">
						<li>
							<span class="font-bold">Curiosity:</span> You stay on top of new technologies and actively
							engage with open-source communities
						</li>
						<li>
							<span class="font-bold">Velocity:</span> You can quickly break down and evaluate tasks,
							and efficiently adapt to new paradigms
						</li>
						<li>
							<span class="font-bold">Teamwork:</span> You communicate clearly, take initiative, and
							help others grow with you
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
