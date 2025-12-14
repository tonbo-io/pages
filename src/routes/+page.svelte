<script>
	import '../styles/home.css';

	import { onMount, onDestroy } from 'svelte';

	import Dragonfly from './dragonfly.svelte';
	import TonboBox from './tonbo-box.svelte';
	import Testimonials from './testimonials.svelte';
	import Fly from './fly.svelte'

	// Toast state
	let showToast = false;
	let toastMessage = '';

	function copyToClipboard(text) {
		navigator.clipboard.writeText(text).then(() => {
			toastMessage = 'Copied to clipboard!';
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 2000);
		});
	}

</script>

<svelte:head>
	<title>Tonbo</title>
	<meta
		name="description"
		content="Tonbo is an in-process database for serverless online data analytics, building on Apache Arrow & Parquet."
	/>
	<meta
		name="keywords"
		content="database, object storage, Apache Arrow, Apache Parquet, serverless, real-time analytics, embedded database, edge computing, data processing, data analytics, Tonbo"
	/>
	<meta name="author" content="Tonbo" />
	<meta property="og:title" content="Tonbo" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tonbo.io" />
	<link rel="canonical" href="https://tonbo.io" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "Tonbo",
			"description": "Tonbo is an in-process database for serverless online data analytics, building on Apache Arrow & Parquet.",
			"applicationCategory": "Database",
			"operatingSystem": "Cross-platform"
		}
	</script>
</svelte:head>

<!-- PART 1 -->
<div class="responsive-container apply-selection font-code bg-background-dark">
	<div class="apply-container-base apply-container-responsive md:min-h-[620px] flex flex-col justify-center items-center border-t border-background-light pb-20">
		<!-- Main Grid Container (1280x623px 6x5 Grid) -->
		<div
			class="grid w-full max-w-[1280px] h-[608px] sm:h-[623px] max-h-[661px] px-2 sm:px-4 gap-y-2 gap-x-2 sm:gap-x-4 grid-rows-6 sm:grid-rows-5 grid-cols-6 self-stretch shrink-0"
		>
		<!-- REAL-TIME -->
			<div class="hidden sm:flex col-start-5 col-span-2 row-start-1 md:row-start-1 row-span-1 self-start justify-self-stretch justify-end pt-1 px-4">
				<span class="text-base flex flex-col items-start md:flex-row md:items-center text-background-light">
					<span class="flex">
						<span class="mr-[1em] min-[896px]:mr-[3em]">R</span>
						<span class="mr-[1em] min-[896px]:mr-[3em]">E</span>
						<span class="mr-[1em] min-[896px]:mr-[3em]">A</span>
						<span class="mr-[1em] min-[896px]:mr-[3em]">L</span>
						<span class="min-[896px]:mr-[3em]">-</span>
					</span>
					<span class="flex">
						<span class="mr-[1em] min-[896px]:mr-[3em]">T</span>
						<span class="mr-[1em] min-[896px]:mr-[3em]">I</span>
						<span class="mr-[1em] min-[896px]:mr-[3em]">M</span>
						<span>E</span>
					</span>
				</span>
			</div>
			<!-- Col 1 (Manifesto) -->
			<div class="hidden sm:flex col-start-1 col-span-1 row-start-1 md:row-start-2 row-span-1 justify-self-stretch flex-col text-background-light font-code text-sm self-start">
				<div class="mb-6">/MANIFESTO</div>
				<ul class="space-y-1">
					<li>→ Compute</li>
					<li>→ Workload</li>
					<li>→ Data</li>
					<li>→ Infrastructure</li>
					<li>→ Bridge</li>
					<li>→ Tonbo</li>
				</ul>
			</div>

			<div class="flex sm:hidden col-start-1 col-span-4 row-start-5 row-span-1 w-[345px] px-2 justify-center items-center gap-[10px] text-background-light font-code text-sm leading-relaxed self-start">
				<p>
					Tonbo is an embedded, Arrow-native database engine, shaped for short-lived, massively parallel compute: browser tabs, edge workers, and serverless functions
				</p>
			</div>

			<!-- Col 2 (Description) - Tablet/Desktop -->
			<div class="hidden sm:flex col-start-2 col-span-1 row-start-2 md:row-start-2 row-span-1 justify-self-stretch flex-col max-w-[180px] lg:max-w-[220px] text-background-light font-code text-sm leading-relaxed self-start">
				<p>
					Tonbo is an embedded,<br />
					Arrow-native database<br />
					engine, shaped for<br />
					short-lived, massively<br />
					parallel compute:<br />
					browser tabs, edge<br />
					workers, and serverless<br />
					functions
				</p>
			</div>
			
			<!-- Col 3 (Orange Circle) -->
			<div class="col-start-5 sm:col-start-3 col-span-1 row-start-2 sm:row-start-1 md:row-start-2 row-span-1 justify-self-end self-start sm:self-center z-10">
				<div class="w-[41px] h-[41px] sm:w-[54px] sm:h-[54px] rounded-full bg-tonbo-red z-20"></div>
			</div>

			<!-- Banner -->
			<div
				class="col-start-1 col-span-2 sm:col-start-4 sm:col-span-1 row-start-1 row-span-1 self-end justify-self-start inline-flex h-[20px] pl-[32px] sm:pl-[63px] justify-end items-center bg-tonbo-light text-background-dark font-code text-sm whitespace-nowrap"
			>
				*** Try tonbo 0.4 release examples ***
			</div>

			<!-- Box Wrapper -->
			<div class="col-start-1 sm:col-start-4 col-span-4 sm:col-span-3 row-start-2 row-span-3 self-stretch justify-self-start sm:justify-self-stretch md:justify-self-start relative z-0 h-[285px] w-[330px] sm:w-[347px] md:w-[465px] md:h-[285px] lg:w-[565px] lg:h-[362px]">
				<!-- ASCII shadow effect -->
				<div class="absolute top-2 left-2 sm:top-4 sm:left-4 w-full h-full pointer-events-none">
					<TonboBox /> 
				</div>

				<!-- Box -->
				<div
					class="border-2 border-background-light p-6 md:p-12 w-full h-full flex items-center justify-center bg-background-dark relative z-10"
				>
					<p class="text-3xl md:text-4xl lg:text-5xl text-tonbo-colortx tracking-tighter font-code leading-tight">
						A___portable__<br />
						embedded______<br />
						database_using<br />
						Arrow.
					</p>
				</div>
			</div>

			<!-- Row 3-4 (Left Side Empty / Spacers) -->
			<div class="hidden sm:flex col-start-3 col-span-1 row-start-4 md:row-start-3 row-span-1 w-[178px] self-end justify-self-stretch md:justify-self-start items-end pb-12">
				<!-- ASCII Art (Desktop) -->
				<pre class="text-background-light text-xs hidden lg:block">(.    ....*..>>>></pre>
				<pre class="text-background-light text-xs hidden sm:block lg:hidden">         (.
....*..>>>></pre>
			</div>

			<!-- Row 5 (Bottom Elements) -->
			<div class="col-start-6 sm:col-start-1 md:col-start-2 col-span-1 row-start-1 sm:row-start-4 row-span-1 self-start sm:self-end justify-self-stretch h-[50.667px] sm:h-auto md:h-[194.667px] aspect-[50.67/50.67] sm:aspect-[1/1] md:aspect-[194.67/194.67] flex items-end overflow-hidden">
				<!-- Fly -->
				<Dragonfly class="text-[17px] w-fit h-fit" />
			</div>
			
			<!-- Bottom Right Buttons -->
			<div class="contents sm:col-start-4 sm:col-span-3 sm:row-start-5 sm:row-span-1 sm:justify-self-stretch sm:flex sm:justify-between sm:items-center md:contents">
				<a
					href="https://github.com/tonbo-io/tonbo"
					class="col-start-3 col-span-2 row-start-6 row-span-1 self-center justify-self-start inline-flex items-center gap-[10px] bg-tonbo-red text-background-dark font-code text-lg hover:bg-tonbo-orange transition-colors sm:self-center md:col-start-4 md:col-span-1 md:row-start-5 md:row-span-1 md:justify-self-start"
				>
					&lt; GitHub &gt;
				</a>
				<a
					href="/blogs/introducing-tonbo"
					class="col-start-6 col-span-1 row-start-6 row-span-1 justify-self-end self-center w-[86px] h-[50px] flex justify-center items-center sm:w-auto sm:h-auto sm:inline sm:self-center text-tonbo-colortx underline font-code text-lg underline-offset-4 hover:text-tonbo-orange transition-colors md:col-start-5 md:col-span-1 md:row-start-5 md:row-span-1 md:justify-self-start"
				>
					Read Manifesto
				</a>
			</div>
			
		</div>
		<div class="text-[#666F63] font-code text-[12px] font-medium leading-normal overflow-hidden whitespace-nowrap w-full text-center">
			********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
		</div>
	</div>
</div>

<div class="p-4 xs:px-10 bg-background-light apply-selection font-code">
	<!-- Demo Section -->
	<div
		class="py-12 px-4 md:px-8 lg:max-w-[1194px] md:max-w-[996px] sm:max-w-[600px] mx-auto border-2 border-[#666F63]"
	>
		<!-- Desktop: Side by side -->
		<div class="hidden md:flex md:gap-8 lg:gap-12">
			<!-- Left: Info -->
			<div class="md:w-2/5 flex flex-col justify-start">
				<span
					class="inline-block bg-tonbo-red text-background-light px-3 py-1 text-sm font-code mb-4 w-fit"
				>
					Demo
				</span>
				<h2 class="text-2xl lg:text-3xl font-code text-background-dark mb-4">
					<span class="text-tonbo-gray">Screen 3</span> Demo Title Subtitle
				</h2>
				<p class="text-base text-tonbo-gray font-code mb-8">
					Open a typed table on S3, then run a predicate-pushdown scan, all from an embedded engine:
				</p>
				<button
					class="demo-copy-btn flex items-center gap-2 w-fit mb-4"
					on:click={() => copyToClipboard('cargo add tonbo@0.4.0-a0 tokio')}
				>
					<span>cargo add tonbo@0.4.0-a0 tokio</span>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</button>
				<a
					href="/blog"
					class="text-background-dark font-code underline underline-offset-4 hover:text-tonbo-red"
				>
					&gt; More Examples
				</a>
			</div>

			<!-- Right: Code block -->
			<div class="md:w-3/5">
				<div class="demo-code-block">
					<pre class="text-sm leading-relaxed"><code
							><span class="text-tonbo-gray">#[derive(Record)]</span>
<span class="text-yellow-500">struct</span> <span class="text-green-400">User</span> {'{'} 
    <span class="text-tonbo-gray">#[metadata(k = "tonbo.key", v = "true")]</span>
    <span class="text-tonbo-red">id</span>: String,
    <span class="text-tonbo-red">name</span>: String,
    <span class="text-tonbo-red">score</span>: Option&lt;i64&gt;,
{'}'}

<span class="text-tonbo-gray">// Open on S3</span>
<span class="text-purple-400">let</span> s3 = <span class="text-green-400">S3Spec</span>::new(<span
								class="text-tonbo-orange">"my-bucket"</span
							>, <span class="text-tonbo-orange">"data/users"</span>, <span class="text-green-400"
								>AwsCreds</span
							>::from_env()?);
<span class="text-purple-400">let</span> db = <span class="text-green-400">DbBuilder</span
							>::from_schema(User::schema())?
    .object_store(ObjectSpec::s3(s3))?.open().<span class="text-purple-400">await</span>?;

<span class="text-tonbo-gray">// Query</span>
<span class="text-purple-400">let</span> filter = <span class="text-green-400">Predicate</span
							>::gt(<span class="text-green-400">ColumnRef</span>::new(<span
								class="text-tonbo-orange">"score"</span
							>), <span class="text-green-400">ScalarValue</span>::from(80_i64));
<span class="text-purple-400">let</span> results = db.scan().filter(filter).collect().<span
								class="text-purple-400">await</span
							>?;</code
						></pre>
				</div>
			</div>
		</div>

		<!-- Mobile: Stacked layout -->
		<div class="md:hidden">
			<span
				class="inline-block bg-tonbo-red text-background-light px-3 py-1 text-sm font-code mb-4"
			>
				Demo
			</span>
			<h2 class="text-xl font-code text-background-dark mb-2">
				<span class="text-tonbo-gray">Screen 3</span> Demo Title Subtitle
			</h2>
			<p class="text-sm text-tonbo-gray font-code mb-4">
				Open a typed table on S3, then run a predicate-pushdown scan, all from an embedded engine:
			</p>
			<div class="flex items-center gap-4 mb-6">
				<button
					class="demo-copy-btn-mobile flex items-center gap-2"
					on:click={() => copyToClipboard('cargo add tonbo@0.4.0-a0 tokio')}
				>
					<span>cargo add tonbo@0.4.0-a0 tokio</span>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</button>
				<a href="/blog" class="text-background-dark font-code underline underline-offset-4 text-sm">
					&gt; More Examples
				</a>
			</div>
			<div class="demo-code-block-mobile">
				<pre class="text-xs leading-relaxed overflow-x-auto"><code
						><span class="text-tonbo-gray">#[derive(Record)]</span>
<span class="text-yellow-500">struct</span> <span class="text-green-400">User</span> {'{'} 
    <span class="text-tonbo-gray">#[metadata(k = "tonbo.key", v = "true")]</span>
    <span class="text-tonbo-red">id</span>: String,
    <span class="text-tonbo-red">name</span>: String,
    <span class="text-tonbo-red">score</span>: Option&lt;i64&gt;,
{'}'}

<span class="text-tonbo-gray">// Open on S3</span>
<span class="text-purple-400">let</span> s3 = <span class="text-green-400">S3Spec</span>::new(<span
							class="text-tonbo-orange">"my-bucket"</span
						>, <span class="text-tonbo-orange">"data/users"</span>, <span class="text-green-400"
							>AwsCreds</span
						>::from_env()?);
<span class="text-purple-400">let</span> db = <span class="text-green-400">DbBuilder</span
						>::from_schema(User::schema())?
    .object_store(ObjectSpec::s3(s3))?.open().<span class="text-purple-400">await</span>?;

<span class="text-tonbo-gray">// Query</span>
<span class="text-purple-400">let</span> filter = <span class="text-green-400">Predicate</span
						>::gt(<span class="text-green-400">ColumnRef</span>::new(<span class="text-tonbo-orange"
							>"score"</span
						>), <span class="text-green-400">ScalarValue</span>::from(80_i64));
<span class="text-purple-400">let</span> results = db.scan().filter(filter).collect().<span
							class="text-purple-400">await</span
						>?;</code
					></pre>
			</div>
		</div>
	</div>

	<!-- Stack Section -->
	<div class="py-12 px-4 md:px-8 lg:max-w-[1194px] md:max-w-[996px] sm:max-w-[600px] mx-auto">
		<!-- Mobile: Centered header -->
		<div class="md:hidden text-center mb-8">
			<span
				class="inline-block border-2 border-tonbo-red text-tonbo-red px-3 py-1 text-sm font-code mb-4"
			>
				Stack
			</span>
			<h2 class="text-2xl font-code text-background-dark italic mb-2">
				One engine,<br />multiple surfaces.
			</h2>
			<span
				class="inline-block bg-background-dark text-background-light px-4 py-2 text-sm font-code"
			>
				with No vendor lock-in
			</span>
		</div>

		<!-- Desktop: Side by side layout -->
		<div class="hidden md:flex md:gap-8 lg:gap-12">
			<!-- Left: Title area -->
			<div class="md:w-1/4 flex flex-col justify-start pt-4">
				<span
					class="inline-block border-2 border-tonbo-red text-tonbo-red px-3 py-1 text-sm font-code mb-4 w-fit"
				>
					Stack
				</span>
				<h2 class="text-2xl lg:text-3xl font-code text-background-dark italic mb-4">
					One engine,<br />multiple surfaces.
				</h2>
				<span
					class="inline-block bg-background-dark text-background-light px-4 py-2 text-sm font-code w-fit"
				>
					with No vendor lock-in
				</span>
			</div>

			<!-- Right: Cards grid -->
			<div class="md:w-3/4 grid grid-cols-3 gap-4">
				<!-- User Interface Column -->
				<div class="flex flex-col gap-4">
					<p class="text-sm font-code text-tonbo-gray">*User Interface</p>
					<a href="https://github.com/tonbo-io/tonbolite" class="stack-card h-28">
						<span class="stack-card-title">TonboLite →</span>
						<p class="stack-card-desc">SQLite interface of Tonbo</p>
					</a>
					<a href="https://github.com/tonbo-io/tonbo/tree/main/bindings" class="stack-card h-28">
						<span class="stack-card-title">Js/Py Bindings →</span>
						<p class="stack-card-desc">same engine in Node, Deno, browsers, and Python.</p>
					</a>
				</div>

				<!-- DataBase Column -->
				<div class="flex flex-col gap-4">
					<p class="text-sm font-code text-tonbo-gray">*DataBasea</p>
					<a href="https://github.com/tonbo-io/tonbo" class="stack-card h-full">
						<span class="stack-card-title">Tonbo →</span>
						<p class="stack-card-desc">
							Core Engine. Embedded, arrow-native engine for analytics over object storage.
						</p>
					</a>
				</div>

				<!-- I/O Column -->
				<div class="flex flex-col gap-4">
					<p class="text-sm font-code text-tonbo-gray">*I/O</p>
					<a href="https://github.com/tonbo-io/fusio" class="stack-card h-28">
						<span class="stack-card-title"
							>Fusio <img
								src="/fusio-icon.svg"
								alt="fusio"
								class="inline-block w-12 h-auto align-middle mx-1"
							/> →</span
						>
						<p class="stack-card-desc">unified async storage I/O (local, OPFS, io_uring, S3)</p>
					</a>
					<a href="https://github.com/tonbo-io/typed-arrow" class="stack-card h-28">
						<span class="stack-card-title">typed-arrow →</span>
						<p class="stack-card-desc">compile-time/runtime typed Arrow schemas for Rust.</p>
					</a>
				</div>
			</div>
		</div>

		<!-- Mobile: Cards grid -->
		<div class="md:hidden grid grid-cols-3 gap-3">
			<!-- User Interface Column -->
			<div class="flex flex-col gap-3">
				<p class="text-xs font-code text-tonbo-gray">User Interface</p>
				<a href="https://github.com/tonbo-io/tonbolite" class="stack-card-mobile">
					<span class="stack-card-title-mobile">TonboLite →</span>
					<p class="stack-card-desc-mobile">SQLite interface of Tonbo</p>
				</a>
				<a href="https://github.com/tonbo-io/tonbo/tree/main/bindings" class="stack-card-mobile">
					<span class="stack-card-title-mobile">Js/Py Bindings →</span>
					<p class="stack-card-desc-mobile">same engine in Node, Deno, browsers, and Python.</p>
				</a>
			</div>

			<!-- DataBase Column -->
			<div class="flex flex-col gap-3">
				<p class="text-xs font-code text-tonbo-gray">DataBasea</p>
				<a href="https://github.com/tonbo-io/tonbo" class="stack-card-mobile h-full">
					<span class="stack-card-title-mobile">Tonbo →</span>
					<p class="stack-card-desc-mobile">
						Core Engine. Embedded, arrow-native engine for analytics over object storage.
					</p>
				</a>
			</div>

			<!-- I/O Column -->
			<div class="flex flex-col gap-3">
				<p class="text-xs font-code text-tonbo-gray">I/O</p>
				<a href="https://github.com/tonbo-io/fusio" class="stack-card-mobile">
					<span class="stack-card-title-mobile">Fusio →</span>
					<p class="stack-card-desc-mobile">
						unified async storage I/O (local, OPFS, io_uring, S3)
					</p>
				</a>
				<a href="https://github.com/tonbo-io/typed-arrow" class="stack-card-mobile">
					<span class="stack-card-title-mobile">typed-arrow →</span>
					<p class="stack-card-desc-mobile">compile-time/runtime typed Arrow schemas for Rust.</p>
				</a>
			</div>
		</div>
	</div>

	<!-- Community Section -->
	<div class="py-12 px-4 text-center">
		<span class="inline-block bg-tonbo-red text-background-light px-4 py-1 text-sm font-code mb-4">
			Community
		</span>
		<h2 class="text-3xl md:text-4xl font-code text-background-dark mb-4">Got Fire in Community</h2>
		<p class="text-base md:text-lg text-tonbo-gray max-w-2xl mx-auto mb-8 font-code">
			Tonbo is sparking strong interest across the community.<br />
			And backed by Backed By Peak XV, Paul Copplestone and Xiaoxiao Fund.
		</p>
		<div class="flex justify-center gap-6 font-code">
			<a
				href="https://discord.gg/tonbo"
				class="border-2 border-background-dark px-6 py-2 hover:bg-background-dark hover:text-background-light transition-colors"
			>
				&lt; Join Discord &gt;
			</a>
			<a
				href="mailto:contact@tonbo.io"
				class="border-2 border-background-dark px-6 py-2 hover:bg-background-dark hover:text-background-light transition-colors"
			>
				&lt; Share use case &gt;
			</a>
		</div>
	</div>

	<!-- Testimonials Section -->
	<Testimonials />
</div>

<!-- Toast notification -->
{#if showToast}
	<div class="toast-notification">
		{toastMessage}
	</div>
{/if}

<style>
	.fusio-icon-wrapper img {
		filter: none;
		transition: filter 0.3s ease;
	}
	.fusio-icon-wrapper:hover img,
	a:hover .fusio-icon-wrapper img {
		filter: invert(1);
	}

	/* Toast */
	.toast-notification {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background: #1f251a;
		color: #fffdec;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-family: 'Iosevka Web', monospace;
		font-size: 0.875rem;
		z-index: 1000;
		animation: toast-fade-in 0.3s ease;
	}

	@keyframes toast-fade-in {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(1rem);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
