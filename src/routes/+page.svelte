<script>
	import Dragonfly from './dragonfly.svelte';
	import BenchmarkChart from './benchmark-chart.svelte';
</script>

<svelte:head>
	<title>Tonbo - an extensible embedded database using Arrow.</title>
</svelte:head>

<!-- PART 1 -->
<div
	class="w-full px-10 bg-background-dark selection:bg-background-light selection:text-background-dark font-code"
>
	<div
		class="w-full md:w-[1200px] md:p-0 p-3.5 pb-10 mx-auto bg-background-dark border-x-2 border-b-2 border-background-light md:h-[550px]"
	>
		<div class="relative">
			<div
				class="hidden border-b-[1px] md:block border-background-light text-background-light px-10"
			>
				<div class="md:w-[16.5rem] md:text-[1.5rem] -mr-[4rem] md:leading-[1.5rem] pb-6">
					Tonbo incurrs minimal cost to insert and scan structured data.
				</div>
			</div>
			<div
				class="border-2 text-5xl border-background-light w-[93%] sm:w-[44%] md:w-[588px] md:h-[361px] text-[#FFFDEC] p-[32px] pb-[48px] pr-2 leading-tight mt-10 mb-12 md:pt-9 md:pl-[104px] md:pr-20 md:absolute md:top-0 md:right-[226px] bg-background-dark"
			>
				A portable embedded database using Arrow.
			</div>
		</div>

		<div class="relative md:h-[449px]">
			<div
				class="flex flex-col md:flex-row w-[100px] md:w-[320px] md:justify-between shrink-0 mr-4 md:mr-0 md:absolute md:right-[226px] md:bottom-0"
			>
				<a href="https://docs.rs/tonbo/latest/tonbo/">
					<div
						class="relative flex items-center justify-center w-full p-2 mb-4 text-base text-white border-2 cursor-pointer select-none border-background-light hover:bg-background-light hover:text-background-dark md:w-[149px]"
					>
						Read Docs
					</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo/tree/main/examples">
					<div
						class="p-2 border-2 border-background-light flex items-center justify-center hover:bg-background-light text-background-dark cursor-pointer relative text-base bg-[#EF6A21] select-none md:w-[149px]"
					>
						Example
					</div>
				</a>
			</div>
			<div
				class="w-fit h-fit mt-[-130px] absolute right-14 md:absolute bottom-0 md:left-[240px] md:top-[260px]"
			>
				<Dragonfly verticalScale="1" overallScale={1} />
			</div>
		</div>
	</div>

	<div
		class="w-full p-[28px] md:w-[1200px] h-[64px] mx-auto bg-background-dark border-x-2 border-background-light"
	></div>
</div>

<div
	class="p-10 bg-background-light selection:bg-background-dark selection:text-background-light font-code"
>
	<div class="relative flex flex-col min-h-screen mx-auto w-full md:w-[1200px]">
		<!-- PART 2 -->
		<div class="mt-5 mb-20 md:columns-2">
			<div class="flex flex-col border border-background-dark">
				<div
					class="bg-background-dark h-[3.5rem] text-font-light flex items-center justify-center text-[1.5rem] selection:bg-background-light selection:text-background-dark"
				>
					Benchmark: range performance
				</div>
				<BenchmarkChart />
			</div>
			<article class="md:h-[23rem] mt-5 flex flex-col justify-center md:ml-[4rem] md:mr-[2rem]">
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
				class="border-b md:border-r md:border-b-0 border-dashed border-background-dark mx-[2rem] md:mx-1 py-5 my-2.5 md:my-0 flex-1 md:px-4"
			>
				<p class="mb-4 text-lg font-medium leading-normal text-center">Vendor lock-in free</p>
				<p class="text-base leading-normal">
					Tonbo is built as a thin wrapper over Arrow schema and Parquet format, which means you are
					able to use many analytic tools to can fully benefit from the Arrow ecosystem.
				</p>
			</article>
			<article
				class="border-dashed md:border-b-0 border-b md:border-r border-background-dark mx-[2rem] md:mx-1 py-5 my-2.5 flex-1 md:px-4"
			>
				<p class="mb-4 text-lg font-medium leading-normal text-center">
					Combine agility of KV and convinient of structured
				</p>
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
			<article class="mx-[2rem] md:mx-1 py-5 my-2.5 flex-1 md:px-4">
				<p class="mb-4 text-lg font-medium leading-normal text-center">
					From many sources to many targets
				</p>
				<p class="text-base leading-normal">
					As an embedded database, Tonbo supports customizing runtime and file system, and also it
					is designed for running on kinds of target platforms, we will complete official support
					WASM / OPFS, Python asyncio and object storages in Sep 2024.
				</p>
			</article>
		</div>
	</div>
</div>
