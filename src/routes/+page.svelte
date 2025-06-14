<script>
	import '../styles/home.css';

	import { onMount, onDestroy } from 'svelte';

	import Dragonfly from './dragonfly.svelte';
	// import FusioIcon from '../../static/fusio_icon.svg';
	import GitHubLogo from '$lib/images/github-logo.svg';
	// import BenchmarkChart from './benchmark-chart.svelte';

	// let y;
	// let stackHeader;
	// let stackTitleHeight;

	// let pinned = false;

	// let scrollList;

	// $: {
	// 	if (typeof document !== 'undefined') {
	// 		if (pinned && y >= stackTitleHeight) {
	// 			pinned = true;
	// 			// document.body.style.overflow = 'hidden';
	// 		} else {
	// 			if (y >= stackTitleHeight) {
	// 				pinned = true;
	// 			}
	// 			// document.body.style.overflow = '';
	// 		}
	// 	}
	// }

	// onMount(() => {
	// 	const rect = stackHeader.getBoundingClientRect();
	// 	const offsetTop = rect.top + window.scrollY;
	// 	stackTitleHeight = offsetTop;
	// });

	// function handleGlobalWheel(event) {
	// 	if (scrollList && pinned) {
	// 		scrollList.scrollTop += event.deltaY;
	// 		console.log('scrollList.scrollTop', scrollList.scrollTop);
	// 		if (scrollList.scrollTop == 0) {
	// 			pinned = false;
	// 		}
	// 		event.preventDefault(); // 防止页面滚动
	// 	}
	// }

	// onMount(() => {
	// 	window.addEventListener('wheel', handleGlobalWheel, { passive: false });
	// });

	// onDestroy(() => {
	// 	window.removeEventListener('wheel', handleGlobalWheel);
	// });
</script>

<!-- <svelte:window bind:scrollY={y} /> -->

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
				class="hidden border-b-[2px] md:block border-background-light text-background-light px-10"
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
					<a href="https://tonbo-io.github.io/tonbo/">
						<div
							class="apply-button-base apply-border hover-tonbo md:w-[149px] md:mr-4 text-background-light"
						>
							Read docs
						</div>
					</a>
					<a href="https://github.com/tonbo-io/tonbo/tree/main/examples">
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
				<a href="https://tonbo-io.github.io/tonbo/">
					<div class="apply-button-base apply-border relative mb-4 text-font-light hover-tonbo">
						Read docs
					</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo/tree/main/examples">
					<div
						class="text-[1rem] apply-button-base apply-border relative hover-tonbo text-background-dark bg-tonbo-red"
					>
						Example
					</div>
				</a>
			</div>
			<div class="w-fit h-fit absolute right-0 md:hidden bottom-0 sm:right-20">
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
		<!-- <div class="max-w-[1194px] mt-5 mb-5 md:columns-2 mx-auto w-full">
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
		</div> -->

		<!-- <div class="max-w-[1194px] mt-[2rem] mb-[6rem] mx-auto w-full flex flex-col md:flex-row gap-8">
			<article
				class="md:basis-1/3 flex flex-col justify-center p-[4rem] bg-background-dark text-background-light apply-selection-light"
			>
				<h1 class="font-medium text-[1.2rem] mb-[1.2rem]">Component-based</h1>
				<p class="text-[1rem] mb-[1rem]">
					We offer features component by component, you do not need to use all of them, and you can
					combine them to build your own data intensive application.
				</p>
				<p>
					We're just getting started with commonly used async executors and file system
					implementations, there's still plenty of room for further optimizations.
				</p>
			</article>
			<div class="border border-background-dark md:basis-2/3">
				<div class="benchmark-header">Tonbo's Stack</div>

				<div class="p-2"> -->
		<!-- <div class="mb-1 flex items-center justify-center text-[1rem] w-[49.334%] gap-1"> -->
		<!-- <button
							class="h-[3rem] flex-1 flex items-center justify-center border border-dashed border-background-dark bg-tonbo-orange text-background-light hover-tonbo-dark"
						>
							(observability storage)
						</button> -->
		<!-- <div
							class="h-[2rem] flex-1 flex items-center justify-center border border-dashed border-background-dark bg-tonbo-orange"
						>
							(vector indexing/retrieval)
						</div> -->
		<!-- </div> -->
		<!-- <div class="mb-1 flex items-center justify-center text-[1rem] w-[49.334%] gap-1">
						<button
							class="basis-2/3 h-[3rem] flex border border-dashed border-background-dark items-center justify-center bg-tonbo-orange text-background-light hover-tonbo-dark"
						>
							(serverless analytics)
						</button>
						<button
							class="basis-1/3 h-[3rem] flex border border-dashed border-background-dark items-center justify-center text-background-dark"
						>
							Postgres FDW
						</button>
					</div> -->
		<!-- <div class="grid grid-cols-12 gap-1 mb-1"> -->
		<!-- <button
							class="text-[1rem] hover-tonbo-dark col-span-1 flex items-center justify-center border border-dashed border-background-dark [writing-mode:vertical-lr] bg-tonbo-orange text-background-light"
						>
							(stateful service)
						</button> -->
		<!-- <div class="col-span-12">
							<div class="flex flex-col justify-center mb-1">
								<div class="flex flex-row justify-start mt-auto gap-1 w-[66.6667%]">
									<a
										class="hover-tonbo-dark bg-tonbo-red basis-1/2 text-[0.8rem] h-[3rem] text-center text-background-light mt-auto border border-background-dark flex items-center justify-center"
										href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
									>
										Python / JavaScript binding
									</a> -->
		<!-- <a
										class="hover-tonbo-dark bg-tonbo-red basis-1/3 text-[1rem] h-[3rem] text-center border border-background-dark text-background-light mt-auto flex items-center justify-center"
										href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
									>
										Javascript SDK
									</a> -->
		<!-- <a
										class="hover-tonbo-dark bg-tonbo-red basis-1/2 text-[1rem] h-[3rem] text-center border border-background-dark text-background-light mt-auto flex items-center justify-center"
										href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
									>
										TonboLite
									</a>
								</div>
							</div>
							<a
								class="hover-tonbo-dark border border-background-dark h-[6rem] flex flex-col justify-between bg-tonbo-red"
								href="https://github.com/tonbo-io/tonbo"
							>
								<div
									class="flex flex-row items-start border-b border-dashed border-background-light text-[1rem]"
								> -->
		<!-- <a
										class="z-1 hover-tonbo-dark bg-tonbo-red basis-2/3 h-[3rem] text-center text-background-light border-r border-dashed border-background-light flex items-center justify-center"
										href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
										style="z-index: 1;"
									>
										Dynamic Schema
									</a>
									<button
										class="z-1 hover-tonbo-dark bg-tonbo-red basis-1/3 h-[3rem] text-center text-background-light flex items-center justify-center"
									>
										Compile-time Schema
									</button> -->
		<!-- </div>
								<p
									class="text-center text-background-light flex-grow flex items-center justify-center"
								>
									Tonbo
								</p>
								<div class="flex flex-row justify-center text-[1rem] gap-1 m-1"> -->
		<!-- <div
										class="flex-1 text-center text-background-light mt-auto flex items-center justify-center flex-col"
									>
										<div class="flex-1 flex w-full">
											<a
												class="h-[3rem] hover-tonbo-dark bg-tonbo-red flex-1 flex flex-col items-center justify-center w-full border border-b-0 border-dashed border-background-light bg-tonbo-orange"
												href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
											>
												Fusio-manifest
											</a>
											<div class="flex-1"></div>
										</div>
										<a
											class="h-[3rem] hover-tonbo-dark bg-tonbo-red flex-1 flex flex-col items-center justify-center w-full border border-dashed border-background-light"
											href="https://github.com/tonbo-io/fusio/tree/main/fusio-log"
										>
											Fusio-log
										</a>
									</div>
									<button
										class="hover-tonbo-dark bg-tonbo-red flex-1 h-[3rem] text-center text-background-light mt-auto border border-dashed border-background-light flex items-center justify-center"
									>
										LSM-Tree
									</button> -->
		<!-- </div>
							</a>
						</div>
					</div>
					<div class="flex flex-row text-[1rem] gap-1 mb-1">
						<a
							class="hover-tonbo-dark border border-background-dark h-[3rem] flex flex-col justify-center bg-tonbo-red basis-2/3"
							href="https://github.com/tonbo-io/fusio"
						>
							<p class="text-center text-background-light mt-auto">Fusio</p>
							<div
								class="text-[1rem] text-center text-background-light mt-auto border-t border-dashed border-background-light columns-3"
							>
								<div class="border-r border-dashed border-background-light">Native FS</div>
								<div class="border-r border-dashed border-background-light">HTTP</div>
								<div class="border-dashed border-background-light">OPFS</div>
							</div>
						</a>
						<div
							class="basis-1/3 border border-dashed border-background-dark text-center h-[3rem] flex-1 flex items-center justify-center"
						>
							Apache Arrow
						</div>
					</div>
					<div class="flex flex-row border-background-dark gap-1 text-[1rem]">
						<div class="basis-2/3 gap-1 flex flex-col">
							<div
								class="basis-2/3 border border-dashed border-background-dark h-[2rem] flex-1 flex items-center justify-center"
							>
								Apache Parquet
							</div>
							<div
								class="border border border-dashed border-background-dark h-[2rem] flex flex-col items-center justify-center"
							>
								AWS S3 / Disk
							</div>
						</div>
						<div
							class="text-[1rem] basis-1/3 border border-dashed border-background-dark flex items-center justify-center"
						>
							Native / Browser / AWS Lambda
						</div>
					</div>
				</div>
			</div>
		</div> -->

		<div
			class="benchmark-header lg:max-w-[1194px] md:max-w-[996px] sm:max-w-[600px] mx-auto w-full mt-[2rem] text-center text-background-light"
		>
			Tonbo's Stack
		</div>
		<div
			class="mx-auto lg:max-w-[1194px] md:max-w-[996px] sm:max-w-[600px] flex flex-col-reverse md:flex-row mb-[6rem] mt-[3rem] md:pl-[2rem] md:pr-[2rem] gap-[2rem]"
		>
			<div class="flex-1 flex flex-col gap-4">
				<div class="flex-1 flex gap-2">
					<div
						class="max-w-[2.5rem] flex-1 flex items-center justify-center [writing-mode:vertical-lr] bg-background-dark text-background-light p-[0.75rem]"
					>
						APIs
					</div>
					<a
						class="basis-3/4 p-[1rem] border-2 border-background-dark text-[1.5rem] hover-tonbo-dark"
						href="https://github.com/tonbo-io/tonbolite"
					>
						TonboLite ->
						<p class="text-[1rem] mt-[0.75rem]">
							is a WASM compatible SQLite extension that allows users to create tables which
							supports analytical processing directly in SQLite.
						</p>
					</a>
					<a
						class="basis-1/4 flex flex-col items-center justify-center border-2 border-background-dark p-2 text-[1.5rem] hover-tonbo-dark"
						href="https://github.com/tonbo-io/tonbo/tree/main/bindings"
					>
						JS/Py Bindings
						<p class="text-left w-full">-></p>
					</a>
				</div>
				<div class="flex-1 flex gap-2">
					<a
						class="flex-1 p-[1rem] border-2 border-background-dark text-[1.5rem] hover-tonbo-dark"
						href="https://github.com/tonbo-io/tonbo"
					>
						Tonbo ->
						<p class="text-[1rem] mt-[0.75rem]">
							is an in-process, persistent database offering fast KV-like methods for conveniently
							writing and scanning type-safe structured data.
						</p>
					</a>
					<div
						class="max-w-[2.5rem] flex-1 flex items-center justify-center [writing-mode:vertical-lr] bg-background-dark text-background-light p-[0.75rem]"
					>
						Storage Engine
					</div>
				</div>
				<div class="flex-1 flex gap-2">
					<div
						class="max-w-[2.5rem] flex-1 flex items-center justify-center [writing-mode:vertical-lr] bg-background-dark text-background-light p-[0.75rem]"
					>
						I/O
					</div>
					<a
						class="flex-1 p-[1rem] border-2 border-background-dark text-[1.5rem] basis-1/2 hover-tonbo-dark"
						href="https://github.com/tonbo-io/fusio"
					>
						<div class="fusio-icon-wrapper flex items-center gap-2">
							<img
								src="/fusio-icon.svg"
								alt="Fusio Icon"
								class="w-[6rem] transition-all duration-200"
							/>
							<p>-></p>
						</div>

						<p class="text-[1rem] mt-[0.75rem]">
							provides read/write operations to multiple storages (disk, AWS S3) on top of both
							epoll-based and io_uring-based runtimes.
						</p>
					</a>
				</div>
			</div>
			<div
				class="md:min-w-[532px] flex-1 flex flex-col text-[0.75rem] items-center justify-center scale-75 md:scale-100"
			>
				<div class="flex-1 flex w-full md:pl-[2rem] md:mt-[4rem]">
					<div class="flex-1 flex flex-col">
						<div
							class="flex items-center justify-center absolute w-fit min-w-[6rem] mt-[-10px] ml-[30px] sm:ml-[120px] md:ml-[90px] h-fit p-[0.5rem] bg-background-dark text-background-light"
						>
							APIs
						</div>
						<div
							class="flex items-center justify-center absolute w-fit min-w-[6rem] h-fit p-[0.5rem] mt-[155px] sm:ml-[85px] ml-[-10px] md:ml-[40px] bg-background-dark text-background-light z-40"
						>
							I/O
						</div>
						<div
							class="flex items-center justify-center absolute w-fit min-w-[6rem] h-fit p-[0.5rem] mt-[205px] ml-[10px] sm:ml-[110px] md:ml-[60px] bg-background-dark text-background-light z-20"
						>
							Data format
						</div>
					</div>
					<div class="flex-1 relative mt-[2rem]">
						<div class="flex items-center justify-center">
							<div
								class="absolute flex items-center justify-center ml-[3rem] w-[5rem] h-[2rem] bg-tonbo-red z-[60] mt-[-0.25rem]"
							></div>
							<div
								class="absolute flex items-center justify-center ml-[-3rem] w-[5rem] h-[2rem] bg-tonbo-red z-[60] mt-[1.25rem]"
							></div>
						</div>
						<div class="flex items-center justify-center">
							<div
								class="w-[12rem] h-[10rem] border-[6px] border-background-dark bg-background-light z-50 mt-[-4rem]"
								style="transform: rotateX(75deg) rotateZ(45deg);"
							/>
						</div>
						<div class="flex items-center justify-center">
							<div
								class="flex items-center justify-center w-[8rem] h-[5rem] bg-tonbo-red z-40 mt-[-5rem] mb-[2rem] text-background-light"
							>
								Tonbo
							</div>
						</div>
						<div class="flex items-center justify-center">
							<div
								class="absolute flex items-center justify-center ml-[3rem] w-[5rem] h-[1.5rem] z-[30] mt-[-0.5rem] border-2 border-dashed border-background-dark"
								style="background: linear-gradient(0deg, rgba(34, 38, 35, 0.10) 0%, rgba(34, 38, 35, 0.10) 100%), #E7F1BE;"
							></div>
							<div
								class="absolute flex items-center justify-center ml-[-3rem] w-[5rem] h-[2rem] mt-[1rem] bg-tonbo-red z-[30]"
							></div>
						</div>
						<div class="flex items-center justify-center mt-[-7rem]">
							<div
								class="w-[12rem] h-[10rem] border-[6px] border-background-dark bg-background-light z-30"
								style="transform: rotateX(75deg) rotateZ(45deg);"
							/>
						</div>

						<div
							class="absolute flex items-center justify-center ml-[4rem] w-[5rem] h-[2rem] mt-[-0.5rem] border-2 border-dashed border-background-dark z-[20]"
							style="background: linear-gradient(0deg, rgba(34, 38, 35, 0.10) 0%, rgba(34, 38, 35, 0.10) 100%), #E7F1BE;"
						></div>

						<div class="flex items-center justify-center mt-[-7rem]">
							<div
								class="w-[12rem] h-[10rem] border-[6px] border-background-dark bg-background-light z-20"
								style="transform: rotateX(75deg) rotateZ(45deg);"
							/>
						</div>

						<div class="flex items-center justify-center">
							<div
								class="absolute flex items-center justify-center ml-[-3rem] w-[5rem] h-[2rem] z-[10] mt-[2rem] border-2 border-dashed border-background-dark"
								style="background: linear-gradient(0deg, rgba(34, 38, 35, 0.10) 0%, rgba(34, 38, 35, 0.10) 100%), #E7F1BE;"
							></div>
							<div
								class="absolute flex items-center justify-center ml-[3rem] w-[5rem] h-[5rem] z-[9] mt-[-2.5rem] border-2 border-dashed border-background-dark"
								style="background: linear-gradient(0deg, rgba(34, 38, 35, 0.10) 0%, rgba(34, 38, 35, 0.10) 100%), #E7F1BE;"
							></div>
						</div>

						<div class="flex items-center justify-center mt-[-4rem] ml-[-3rem]">
							<div
								class="w-[12rem] h-[5.7rem] border-[6px] border-background-dark bg-background-light z-10"
								style="transform: rotateX(75deg) rotateZ(45deg);"
							/>
						</div>
						<div class="flex items-center justify-center mt-[-5rem]">
							<div
								class="w-[12rem] h-[10rem] border-[6px] border-background-dark bg-background-light"
								style="transform: rotateX(75deg) rotateZ(45deg);"
							/>
						</div>
						<div class="flex-1 flex flex-col items-center justify-center">
							<p class="flex-1 mb-[2rem] text-[0.8rem] text-center w-[16rem]">
								We deliver a stack to build serverless data-intensive applications.
							</p>
							<a
								class="border-2 border-tonbo-red p-[0.5rem] w-[8rem] hover:bg-tonbo-red hover:text-background-light text-center max-h-[3rem] mx-auto flex items-center justify-center text-[1rem]"
								href="/blog/introducing-tonbo"
							>
								Read more ->
							</a>
						</div>
					</div>
					<div class="flex-1 flex flex-col">
						<div
							class="mt-[75px] ml-[15px] absolute flex items-center justify-center flex-1 min-w-[6rem] h-fit w-fit bg-background-dark text-background-light z-30 p-[0.5rem]"
						>
							Storage Engine
						</div>
						<div
							class="mt-[260px] ml-[-8px] absolute flex items-center justify-center flex-1 min-w-[8rem] h-fit w-fit bg-background-dark text-background-light z-30 p-[0.5rem]"
						>
							Runtime / Storage
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- PART 3 -->
		<div
			class="benchmark-header lg:max-w-[1194px] md:max-w-[996px] sm:max-w-[600px] mx-auto w-full text-center text-background-light"
		>
			Just Parquet, Compatibility, Optional Schema
		</div>

		<div class="feature-section">
			<article class="feature-article">
				<p class="apply-heading">Vendor lock-in free</p>
				<p class="text-base">
					Tonbo is built on Arrow/Parquet, enabling you to leverage a wide range of analytics tools
					and fully benefit from the Arrow ecosystem.
				</p>
			</article>
			<p class="md:w-[1px] md:[writing-mode:vertical-lr] flex items-center justify-center">
				— — — — —
			</p>

			<article class="feature-article-last">
				<p class="apply-heading">S3-compatible</p>
				<p class="text-base">
					Tonbo supports customizable runtimes and file systems. You can run it on Linux, AWS
					Lambda, browsers (WASM-based), and other environments, using local disks, AWS S3, and
					various storage backends.
				</p>
			</article>
			<p class="md:w-[1px] md:[writing-mode:vertical-lr] flex items-center justify-center">
				— — — — —
			</p>
			<article class="feature-article">
				<p class="apply-heading">Compile-time safety</p>
				<p class="text-base">
					Thanks to Rust's lifetime and type system, Tonbo ensures minimal overhead with safety:
					zero-copy operations, compile-time declared schemas, and more.
				</p>
			</article>
		</div>
	</div>
</div>

<style>
	.fusio-icon-wrapper img {
		filter: none;
		transition: filter 0.3s ease;
	}
	.fusio-icon-wrapper:hover img,
	a:hover .fusio-icon-wrapper img {
		filter: invert(1);
	}
</style>
