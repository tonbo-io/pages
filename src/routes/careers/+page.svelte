<script>
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px] lg:w-[1198px] m-auto pt-12">
			<PageHeader title="Careers" />
		</div>

		<div class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-6 min-h-full m-auto">
			<div class="apply-selection">
				<!-- <h1
					class="py-4 my-4 text-2xl border-b-2 border-black border-dashed sm:border-b-0 md:text-xl"
				>
					Careers
				</h1> -->
				<p class="mb-4">
					We’re Tonbo IO Inc., founded in Fall 2023. We believe real-time analytics has never been
					more valuable or accessible for agile and creative teams — yet the data infrastructure
					they need is still missing. We’re not building just one product, but a full data stack
					that makes it easy to build data-intensive functions — flexible and scales to zero.
				</p>
				<p class="mb-4">
					You can check out our open-source work here: <a
						href="https://github.com/tonbo-io"
						class="underline hover:text-tonbo-red">https://github.com/tonbo-io</a
					>. We’re working hard to turn these ideas into products that deliver out-of-the-box value.
				</p>
				<p>We are looking for:</p>
				<ul class="list-disc pl-6">
					<li>are excited by new trends in data processing</li>
					<li>can quickly evaluate potential solutions, break down tasks, and deliver value</li>
					<li>communicate clearly and collaborate closely with others</li>
				</ul>
				<p class="mt-4">
					If you are interested in any of the positions, please send an email to
					<a href="mailto:hiring@tonbo.io" class="underline hover:text-tonbo-red">hiring@tonbo.io</a
					>.
				</p>
			</div>

			<div class="job-listings mt-8">
				<a href="/careers/product-engineer" class="block">
					<div
						class="job-card p-6 mb-6 border-2 border-black bg-background-light text-black hover:bg-background-dark hover:text-[#E7F1BE]"
					>
						<h2 class="text-xl font-bold mb-2">Product Engineer</h2>
						<p class="mb-4">
							Build intuitive data / visualization services on top of our open-source analytics
							engine with our database engineers.
						</p>
						<div class="flex flex-wrap gap-2 mb-4">
							<span class="px-2 py-1 bg-[#E7F1BE] text-black text-sm border border-black"
								>Full-time</span
							>
							<span class="px-2 py-1 bg-[#E7F1BE] text-black text-sm border border-black"
								>Remote</span
							>
						</div>
					</div>
				</a>

				<a href="/careers/database-engineer" class="block">
					<div
						class="job-card p-6 mb-6 border-2 border-black bg-background-light text-black hover:bg-background-dark hover:text-[#E7F1BE]"
					>
						<h2 class="text-xl font-bold mb-2">Database Engineer</h2>
						<p class="mb-4">
							Work on our open-source analytics stack and help turn it into a serverless, real-time
							analytics database service with our product engineers.
						</p>
						<div class="flex flex-wrap gap-2 mb-4">
							<span class="px-2 py-1 bg-[#E7F1BE] text-black text-sm border border-black"
								>Full-time</span
							>
							<span class="px-2 py-1 bg-[#E7F1BE] text-black text-sm border border-black"
								>Remote</span
							>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
