<script>
	import Dragonfly from './dragonfly.svelte';
</script>

<svelte:head>
	<title>Tonbo - an extensible embedded database using Arrow.</title>
</svelte:head>

<div
	class="bg-background-dark min-w-[75rem] pt-12 flex selection:bg-background-light selection:text-background-dark font-code"
>
	<div
		class="w-[75rem] mx-auto border-l border-r relative border-background-light flex flex-col pb-[6rem]"
	>
		<div class="mt-[3rem] text-font-light border-b border-background-light flex">
			<article
				class="w-[16.5rem] ml-[2rem] text-background-light text-[1.5rem] -mr-[4rem] leading-[1.5rem]"
			>
				<p>
					Tonbo incurs minimal cost for inserting and scanning structured data via Apache Arrow.
				</p>
			</article>
			<div class="w-[46rem] h-[33rem] mb-[3rem] flex flex-col justify-between">
				<div class="flex justify-end mt-[4rem] -mb-[20rem]">
					<div
						class="w-[36rem] h-[22rem] border text-[3.5rem] border-background-light flex items-center justify-center"
					>
						<div
							class="w-[26rem] leading-[4.5rem] h-[19.75rem] flex items-center justify-center mb-[1rem] ml-[1rem]"
						>
							A portable embedded database using Arrow.
						</div>
					</div>
				</div>

				<div class="z-10 flex items-end justify-between">
					<Dragonfly />
					<div class="flex">
						<a href="https://docs.rs/tonbo/latest/tonbo/">
							<div
								class="px-6 py-2 border-2 border-background-light flex items-center justify-center hover:bg-background-light hover:text-background-dark cursor-pointer relative text-[1.5rem] mr-[2rem] select-none"
							>
								Read Docs
							</div>
						</a>
						<a href="https://github.com/tonbo-io/tonbo/tree/main/examples">
							<div
								class="px-6 py-2 border-2 border-background-light flex items-center justify-center hover:bg-background-light text-background-dark cursor-pointer relative text-[1.5rem] bg-[#EF6A21] select-none"
							>
								Example
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div
	class=" bg-background-light selection:bg-background-dark selection:text-background-light font-code"
>
	<div class="relative flex flex-col min-h-screen mx-auto w-full sm:w-[640px] md:w-[1200px]">
		<div class="mt-5 mb-10 md:columns-2">
			<div class="border border-background-dark flex flex-col h-[23rem]">
				<div
					class="bg-background-dark h-[3.5rem] text-font-light flex items-center justify-center text-[1.5rem] selection:bg-background-light selection:text-background-dark"
				>
					Benchmark: range performance
				</div>
				<pre
					class="font-code ml-[2rem] mr-[2rem] mt-[1.5rem] leading-[1.3rem] text-background-dark">
<code class="font-meium">Random range read with column projection:</code>
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║      Tonbo | █████████▓▒                          |  1666ms   ║
║    RocksDB | ██████████████████████▓▒             |  3689ms   ║
║       Sled | ███████████████████████▓▒            |  3837ms   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
(lower is better)                                 Latency (pct99)
				</pre>
				<pre class="ml-[2rem] font-code text-[0.75rem]">
CPU: AMD EPYC 7H12
RAM: 64GB DDR4 2933MHz * 8
DISK: SamSung 970 EVO Plus 4TB
				</pre>
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

		<div class="flex flex-col sm:flex-row border border-background-dark max-w-[1194px] mx-auto">
			<article
				class="border-b sm:border-r sm:border-b-0 border-dashed border-background-dark mx-[2rem] sm:mx-1 py-5 my-2.5 sm:my-0 flex-1 sm:px-4"
			>
				<p class="mb-4 text-base font-medium leading-normal text-center">Vendor lock-in free</p>
				<p class="text-base leading-normal">
					Tonbo is built as a thin wrapper over Arrow schema and Parquet format, which means you are
					able to use many analytic tools to can fully benefit from the Arrow ecosystem.
				</p>
			</article>
			<article
				class="border-dashed sm:border-b-0 border-b sm:border-r border-background-dark mx-[2rem] sm:mx-1 py-5 my-2.5 flex-1 sm:px-4"
			>
				<p class="mb-4 text-base font-medium leading-normal text-center">
					Combine agility of KV and convinient of structured
				</p>
				<p class="text-base leading-normal">
					Thanks to Rust lifetime, type system and asynchronous, Tonbo allows user to save each
					overhead as need with safety: raw data reference, compile-time declared schema, and so on.
					And push-down support makes it convenient to query structured data:
					<a
						href="https://github.com/tonbo-io/tonbo/blob/main/examples/datafusion.rs"
						class="underline"
					>
						just about several minutes coding to be integrated into SQL engine for example.
					</a>
				</p>
			</article>
			<article class="mx-[2rem] sm:mx-1 py-5 my-2.5 flex-1 sm:px-4">
				<p class="mb-4 text-base font-medium leading-normal text-center">
					From many sources to many targets
				</p>
				<p class="text-base leading-normal">
					As an embedded database, Tonbo supports customizing runtime and file system, and also it
					is designed for running on kinds of target platforms, we will complete official support
					WASM / OPFS, Python asyncio and object storages in Sep 2024.
				</p>
			</article>
		</div>

		<div
			class="h-[4rem] flex items-center justify-center text-center text-background-dark border-t border-dashed border-background-dark mt-[6rem] mx-10"
		>
			© Copyright 2024-, Tonbo IO.
		</div>
	</div>
</div>
