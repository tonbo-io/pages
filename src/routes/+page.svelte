<script>
	import '../styles/tonbo.css';

	import Dragonfly from './dragonfly.svelte';
	import BenchmarkChart from './benchmark-chart.svelte';
</script>

<svelte:head>
	<title
		>Tonbo - Extensible In-Process Database with Object Storage Support | Apache Arrow & Parquet</title
	>
	<meta
		name="description"
		content="Tonbo is an extensible in-process database supporting object storage with Apache Arrow and Parquet. Get 2.2x faster performance than RocksDB with structured data support."
	/>
	<meta
		name="keywords"
		content="in-process database, object storage, Apache Arrow, Parquet, RocksDB alternative, embedded database, structured data"
	/>
	<meta name="author" content="Tonbo" />
	<meta
		property="og:title"
		content="Tonbo - Extensible In-Process Database with Object Storage Support"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tonbo.io" />
	<link rel="canonical" href="https://tonbo.io" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "Tonbo",
			"description": "An extensible in-process database supporting data storage on local disks and S3 with Apache Arrow and Parquet",
			"applicationCategory": "Database",
			"operatingSystem": "Cross-platform",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			}
		}
	</script>
</svelte:head>

<!-- PART 1 -->
<div class="responsive-container apply-selection font-code bg-background-dark">
	<div
		class="apply-container-base apply-container-responsive md:p-0 p-3.5 pb-10 border-l-2 border-r-2 border-background-light md:min-h-[620px]"
	>
		<div class="relative apply-selection-light">
			<div
				class="hidden border-b-[1px] md:block border-background-light text-background-light px-10"
			>
				<div class="md:w-[16.5rem] md:text-[1rem] -mr-[4rem] md:leading-[1.5rem] pb-12">
					An in-process database, supports data storage on local disks and S3 with Apache Arrow and
					Parquet in native or browsers.
				</div>
			</div>
			<div
				class="border-2 text-5xl border-background-light w-[93%] sm:w-[456px] lg:w-[538px] lg:min-h-[361px] md:w-[488px] md:min-h-[361px] text-font-light p-[32px] pb-[48px] pr-2 leading-tight mt-10 mb-12 md:pt-[4rem] md:pl-[6rem] md:pr-[6rem] md:absolute md:top-0 md:right-[126px] lg:right-[226px] bg-background-dark"
			>
				<p>Simple path</p>
				<p>to shared data storage.</p>
			</div>
		</div>

		<div class="relative md:h-[400px]">
			<!-- Desktop layout (flex container with items aligned at the bottom) -->
			<div class="hidden md:flex md:items-end md:absolute md:bottom-0 md:left-0 md:right-0">
				<div class="flex-grow-0 md:ml-[240px]">
					<Dragonfly class="text-[17px]" />
				</div>
				<div class="flex-grow"></div>
				<div class="flex md:w-[320px] md:justify-between lg:mr-[226px] md:mr-[126px]">
					<a href="https://tonbo-io.github.io/tonbo/" target="_blank">
						<div
							class="apply-button-base apply-border text-font-light hover-tonbo md:w-[149px] md:mr-4"
						>
							Read Docs
						</div>
					</a>
					<a href="https://github.com/tonbo-io/tonbo/tree/main/examples" target="_blank">
						<div
							class="apply-button-base apply-border hover-tonbo text-background-dark bg-tonbo-red md:w-[149px]"
						>
							Example
						</div>
					</a>
				</div>
			</div>

			<!-- Mobile layout (keep as is) -->
			<div class="md:hidden flex flex-col w-[100px] shrink-0 mr-4">
				<a href="https://tonbo-io.github.io/tonbo/" target="_blank">
					<div
						class="text-[1rem] apply-button-base apply-border relative mb-4 text-font-light hover-tonbo"
					>
						Read Docs
					</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo/tree/main/examples" target="_blank">
					<div
						class="text-[1rem] apply-button-base apply-border relative hover-tonbo text-background-dark bg-tonbo-red"
					>
						Example
					</div>
				</a>
			</div>
			<div
				class="w-fit h-fit mt-[-130px] absolute right-0 md:hidden top-[-5px] xs:bottom-[-22px] sm:right-20"
			>
				<Dragonfly class="text-[14px] sm:text-[16px]" />
			</div>
		</div>
	</div>

	<div
		class="p-[42px] apply-container-responsive h-[64px] apply-container-base border-t-2 border-l-2 border-r-2 border-background-light"
	></div>
</div>

<div class="p-4 xs:px-10 bg-background-light apply-selection font-code">
	<div class="relative flex flex-col w-full min-h-screen mx-auto apply-container-responsive">
		<!-- PART 2 -->
		<div class="max-w-[1194px] mt-5 mb-5 md:columns-2 mx-auto w-full">
			<div class="flex flex-col border border-background-dark">
				<div class="benchmark-header">Benchmark: range performance</div>
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
					We're just getting started with commonly used async executors and file system
					implementations, there's still plenty of room for further optimizations.
				</p>
			</article>
		</div>

		<!-- PART 3 -->
		<div class="benchmark-header max-w-[1194px] mx-auto w-full">
			Just Arrow, Structured, Portable
		</div>

		<div class="feature-section">
			<article class="feature-article">
				<p class="apply-heading">Vendor lock-in free</p>
				<p class="text-base leading-normal">
					Tonbo is built as a thin wrapper over Arrow schema and Parquet format, which means you are
					able to use many analytic tools to can fully benefit from the Arrow ecosystem.
				</p>
			</article>
			<article class="feature-article">
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
			<article class="feature-article">
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
