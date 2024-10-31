<script>
	import '../styles/home.css';

	import Dragonfly from './dragonfly.svelte';
	import BenchmarkChart from './benchmark-chart.svelte';
</script>

<svelte:head>
	<title>Tonbo - an extensible embedded database supports object storage.</title>
</svelte:head>

<!-- PART 1 -->
<div class="px-4 apply-container-base xs:px-10 apply-selection font-code">
	<div
		class="apply-container-base apply-container-responsive md:p-0 p-3.5 pb-10 border-x-2 border-b-2 border-background-light md:min-h-[620px]"
	>
		<div class="relative">
			<div
				class="hidden border-b-[1px] md:block border-background-light text-background-light px-10"
			>
				<div class="md:w-[16.5rem] md:text-[1rem] -mr-[4rem] md:leading-[1.5rem] pb-6">
					Tonbo, an embedded database, supports data storage on local disks and S3 for querying
					anywhere with Apache Arrow and Parquet.
				</div>
			</div>
			<div
				class="border-2 text-5xl border-background-light w-[93%] sm:w-[456px] lg:w-[588px] lg:min-h-[361px] md:w-[488px] md:min-h-[361px] text-font-light p-[32px] pb-[48px] pr-2 leading-tight mt-10 mb-12 md:pt-9 md:pl-[104px] md:pr-20 md:absolute md:top-0 md:right-[126px] lg:right-[226px] bg-background-dark"
			>
				The simplest path to shared data storage.
			</div>
		</div>

		<div class="relative md:h-[449px]">
			<div
				class="flex flex-col md:flex-row w-[100px] md:w-[320px] md:justify-between shrink-0 mr-4 md:mr-0 md:absolute lg:right-[226px] md:right-[126px] md:bottom-0"
			>
				<a href="https://docs.rs/tonbo/latest/tonbo/" target="_blank">
					<div
						class="apply-button-base apply-border relative mb-4 text-font-light hover:bg-background-light hover:text-background-dark md:w-[149px]"
					>
						Read Docs
					</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo/tree/main/examples" target="_blank">
					<div
						class="apply-button-base apply-border relative hover:bg-background-light text-background-dark bg-[#EF6A21] md:w-[149px]"
					>
						Example
					</div>
				</a>
			</div>
			<div
				class="w-fit h-fit mt-[-130px] absolute right-0 md:absolute top-[-5px] xs:bottom-[-22px] sm:right-20 md:left-[240px] md:top-[260px]"
			>
				<Dragonfly class="text-[14px] sm:text-[16px] md:text-[17px]" />
			</div>
		</div>
	</div>

	<div
		class=" p-[42px] apply-container-responsive h-[64px] apply-container-base border-x-2 border-background-light"
	></div>
</div>

<div
	class="p-4 xs:px-10 bg-background-light selection:bg-background-dark selection:text-background-light font-code"
>
	<div class="relative flex flex-col w-full min-h-screen mx-auto apply-container-responsive">
		<div class="bg-[#EF6A21] min-h-[4rem] flex items-center justify-center">
			<a
				class="font-code text-[1.5rem] text-font-light underline"
				href="https://github.com/tonbo-io/tonbo/releases/tag/0.2.0"
			>
				New Version is comming! Tonbo supports storage on S3 and Python binding.
			</a>
		</div>
		<!-- PART 2 -->
		<div class="max-w-[1194px] mt-5 mb-5 md:columns-2 mx-auto w-full">
			<div class="flex flex-col border border-background-dark">
				<div
					class="bg-background-dark h-[3.5rem] text-font-light flex items-center justify-center text-[1.5rem] selection:bg-background-light selection:text-background-dark"
				>
					Benchmark: range performance
				</div>
				<BenchmarkChart />
			</div>
			<article
				class="md:h-[23rem] mt-5 flex flex-col justify-center md:ml-[4rem] md:mr-[2rem] p-[20px]"
			>
				<p class="text-[1.5rem] mb-[1rem] font-semibold text-center md:text-left">
					2.2x faster than RocksDB
				</p>
				<p class="text-[1rem]">
					Because of Tonbo's native support for structured data zero-copy loading and projection
					pushing down, Tonbo is 2.2x faster than RocksDB.
				</p>
				<p>
					We’re just getting started with commonly used async executors and file system
					implementations, there’s still plenty of room for further optimizations.
				</p>
			</article>
		</div>

		<!-- PART 3 -->
		<div
			class="bg-background-dark h-14 text-font-light flex items-center justify-center text-base sm:text-[1.5rem] selection:bg-background-light selection:text-background-dark max-w-[1194px] mx-auto w-full"
		>
			Just Arrow, Structured, Portable
		</div>

		<div class="flex flex-col md:flex-row border border-background-dark max-w-[1194px] mx-auto">
			<article
				class="border-b border-dashed apply-article-base md:border-r md:border-b-0 border-background-dark"
			>
				<p class="apply-heading">Vendor lock-in free</p>
				<p class="text-base leading-normal">
					Tonbo is built as a thin wrapper over Arrow schema and Parquet format, which means you are
					able to use many analytic tools to can fully benefit from the Arrow ecosystem.
				</p>
			</article>
			<article
				class="border-b border-dashed apply-article-base md:border-b-0 md:border-r border-background-dark"
			>
				<p class="apply-heading">Combine agility of KV and convinient of structured</p>
				<p class="text-base leading-normal">
					Thanks to Rust lifetime, type system and asynchronous, Tonbo allows user to save each
					overhead as need with safety: raw data reference, compile-time declared schema, and so on.
					And push-down support makes it convenient to query structured data:
					<a
						href="https://github.com/tonbo-io/tonbo/blob/main/examples/datafusion.rs"
						class="underline"
						target="_blank"
					>
						just about several minutes coding to be integrated into SQL engine for example.
					</a>
				</p>
			</article>
			<article class="apply-article-base">
				<p class="apply-heading">From many sources to many targets</p>
				<p class="text-base leading-normal">
					As an embedded database, Tonbo supports customizing runtime and file system, and also it
					is designed for running on kinds of target platforms, we will complete official support
					WASM / OPFS, Python asyncio and object storages in Sep 2024.
				</p>
			</article>
		</div>
	</div>
</div>
