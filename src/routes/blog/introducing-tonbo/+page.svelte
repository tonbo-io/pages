<script>
	import { CodeBlock } from 'svhighlight';

	import 'highlight.js/styles/atom-one-dark.css';
	import Structured from './structured.svelte';
	import Aschronous from './aschronous.svelte';

	let code = `
#[tonbo_record]
pub struct User {
    #[primary_key]
    name: String,
    email: Option<String>,
    age: u8,
}
`;
</script>

<div
	class="w-[75rem] mx-auto border-t border-l border-r border-background-light pb-[3rem] mt-[3rem]"
></div>
<div
	class="min-w-[75rem] min-h-screen bg-background-light selection:bg-background-dark selection:text-background-light font-code flex flex-col justify-between pb-[4rem]"
>
	<article
		class="w-[75rem] mx-auto relative flex flex-col pl-[12rem] pr-[12rem] border-l border-r border-b border-background-dark text-background-dark leading-[1.618] pb-[4rem]"
	>
		<h1 class="text-[1.5rem] font-medium mt-[2rem]">Intoducing Tonbo</h1>
		<p class="text-[0.75rem] mb-[1rem]">August 14, 2024 by Tzu Gwo</p>
		<p>
			We’re excited to announce that <a href="https://github.com/tonbo-io/tonbo" class="underline"
				>Tonbo</a
			> is now open source in its preview version! Tonbo is an embedded persistent database written in
			Rust. It provides essential KV-like methods: insert, filter, and range scan, making it a foundation
			for data-intensive applications, including other types of databases. It also supports type-safe
			structured data storage. For Rust developers, we offer an ORM-like macro for ease of use:
		</p>
		<CodeBlock
			language="rust"
			{code}
			showHeader={false}
			showLineNumbers={true}
			background="bg-background-dark"
			codeTextClasses="font-code text-background-light text-[0.8rem]"
			lineNumberTextClasses="font-code text-background-light"
			rounded="rounded-none"
		/>
		<p />
		<p class="mt-[2rem]">
			Tonbo enables fast and convenient querying over type-safe structured data. For example,
			integrating a query engine takes just a few hours of coding: <a
				href="https://github.com/tonbo-io/tonbo/blob/main/examples/datafusion.rs"
				class="underline">datafusion example</a
			>
			(official support for DataFusion will be included in the next release). In our preliminary benchmarks,
			Tonbo outperforms RocksDB by 2.2x in data scan scenarios, even though it's still in its early stages.
			If you’re interested in Tonbo, please star the project on GitHub, follow us on
			<a href="https://x.com/tonboio" class="underline">Twitter</a>, or join the conversation on
			<a href="https://discord.gg/xa2KyKV5" class="underline">Discord</a>.
		</p>
		<h2 class="text-[1.2rem] font-medium mt-[1.2rem]">Why We Built Tonbo?</h2>
		<p>
			Analytical tools in the <a href="https://arrow.apache.org/" class="underline">Apache Arrow</a>
			(such as
			<a href="https://github.com/apache/arrow-datafusion" class="underline"
				>Apache Arrow DataFusion</a
			> ecosystems provide an nice foundation for data processing. They get a great balance between scalability,
			development efficiency, and execution performance, allowing developers to build efficient data
			analysis applications within days using DataFusion.
		</p>
		<p class="mt-[1rem]">
			However, most tools are focus on the read path of databases. Every data-intensive application
			using DataFusion ends up spending significant time developing its own write path
			implementation. What if we could have a write path implementation as agile and performant as
			DataFusion?
		</p>
		<p class="mt-[1rem]">
			That’s the primary design goal of Tonbo: to serve as an embedded database offering a highly
			scalable data storage engine for the Arrow ecosystem. Additionally, Tonbo also has a long-term
			goal: <b class="font-medium"
				>provide offline-first distributed data storage capabilities, support rapid and flexible
				data storage across various environments—from embedded Linux and browsers to servers—and
				integrating with multiple storage systems such as file systems, OPFS, and S3.</b
			>
		</p>
		<pre class="text-background-dark leading-[1.3]">

			╔═tonbo═════════════════════════════════════════════════════╗
			║                                                           ║
			║    ┌─────────client memory─┐  ┌─────────client memory─┐   ║
			║    │ ┏━━━━━━━━━━━━┓        │  │ ┏━━━━━━━━━━━━┓        │   ║
			║    │ ┃  memtable  ┃        │  │ ┃  memtable  ┃        │   ║
			║    │ ┗━━━━┳━━━━━━━┛        │  │ ┗━━━━┳━━━━━━━┛        │   ║
			║    │ ┏━━━━▼━━━━━━━┓        │  │ ┏━━━━▼━━━━━━━┓        │   ║
			║    │ ┃  memtable  ┃        │  │ ┃  memtable  ┃        │   ║
			║    │ ┗━━━━┳━━━━━━━┛        │  │ ┗━━━━┳━━━━━━━┛        │   ║
			║    │ ┏━━━━▼━━━━━━━┓        │  │ ┏━━━━▼━━━━━━━┓        │   ║
			║    │ ┃  memtable  ┃        │  │ ┃  memtable  ┃        │   ║
			║    │ ┗━━━━┳━━━━━━━┛        │  │ ┗━━━━┳━━━━━━━┛        │   ║
			║    └──────╂────────────────┘  └──────╂────────────────┘   ║
			║    ┌──────╂─client storage─┐  ┌──────╂─client storage─┐   ║
			║    │ ┏━━━━▼━━━━┓           │  │ ┏━━━━▼━━━━┓           │   ║
			║    │ ┃ parquet ┃           │  │ ┃ parquet ┃           │   ║
			║    │ ┗━━━━┳━━━━┛           │  │ ┗━━━━┳━━━━┛           │   ║
			║    └──────╂────────────────┘  └──────╂────────────────┘   ║
			║           ┣━━━━━━━━━━━━━━━━━━━━━━━━━━┛                    ║
			║    ┌──────╂────────────────────────────────server ssd─┐   ║
			║    │      ┣━━━━━━━━━━━┓                               │   ║
			║    │ ┏━━━━▼━━━━┓ ┏━━━━▼━━━━┓                          │   ║
			║    │ ┃ parquet ┃ ┃ parquet ┃                          │   ║
			║    │ ┗━━━━┳━━━━┛ ┗━━━━┳━━━━┛                          │   ║
			║    └──────╂───────────╂───────────────────────────────┘   ║
			║    ┌──────╂───────────╂────────object storage service─┐   ║
			║    │      ┣━━━━━━━━━━━╋━━━━━━━━━━━┳━━━━━━━━━━━┓       │   ║
			║    │ ┏━━━━▼━━━━┓ ┏━━━━▼━━━━┓ ┏━━━━▼━━━━┓ ┏━━━━▼━━━━┓  │   ║
			║    │ ┃ parquet ┃ ┃ parquet ┃ ┃ parquet ┃ ┃ parquet ┃  │   ║
			║    │ ┗━━━━━━━━━┛ ┗━━━━━━━━━┛ ┗━━━━━━━━━┛ ┗━━━━━━━━━┛  │   ║
			║    └──────────────────────────────────────────────────┘   ║
			║                                                           ║
			╚═══════════════════════════════════════════════════════════╝
		</pre>
		<h2 class="text-[1.2rem] font-medium mt-[1.2rem]">How is Tonbo Designed?</h2>
		<h3 class="text-[1.1rem] font-medium mt-[1.1rem]">LSM Tree</h3>
		<p>
			Tonbo is built on the <a
				href="https://en.wikipedia.org/wiki/Log-structured_merge-tree"
				class="underline">LSM Tree</a
			>
			architecture. Typically, databases use either
			<a href="https://tikv.org/deep-dive/key-value-engine/b-tree-vs-lsm/" class="underline"
				>Log-Structured Merge (LSM) trees or B+ trees</a
			>. The primary advantage of LSM trees is that all foreground writes are performed in memory,
			while background writes are sequential, resulting in very high write throughput.
		</p>

		<p>
			LSM trees also have minimal file system requirements: they only need a file system that
			supports append-only operations to achieve high-performance data insertion and updates. This
			makes Tonbo suitable for a wide range of devices, from flash storage to SSDs. By offloading
			tasks like data clean-up and compaction to the background, LSM trees streamline the read/write
			process and reduce the load on the frontend.
		</p>
		<h3 class="text-[1.1rem] font-medium mt-[1.1rem]">Type-Safe Structured Storage</h3>
		<p>
			As mentioned earlier, Tonbo extends beyond a traditional KV database to support reading and
			writing structured data. This capability is achieved by faithfully translating user-defined
			data structures into Arrow schemas. Tonbo leverages the features provided by Arrow/Parquet to
			support pushdown operations like limit, project, and filter:
		</p>
		<Structured />
		<p class="mt-[2rem]">
			This means that Tonbo can precisely scan the data specified by the use, and skipping
			irrelevant data, leading to potentially more than tenfold improvements in querying efficiency
			when used appropriately. Additionally, according to compile-time type hint, Tonbo can
			transmute bytes read from files into user-defined data types free. In many data-intensive
			applications, serialization overhead can account for 30% to 50% of the total load.
		</p>
		<h3 class="text-[1.1rem] font-medium mt-[1.1rem]">Asynchronous</h3>
		<p>Tonbo fully supports asychronous methods:</p>
		<Aschronous />
		<p class="mt-[2rem]">
			Using asynchronous interfaces not only increases the efficiency of concurrent operations, but
			also allows Tonbo to provide concurrent access on resource-constrained devices, such as
			browsers, mobile apps, and embedded Linux systems. The LSM Tree architecture, as mentioned in
			previous sections, requires background tasks for garbage collection and compaction newly
			written data, which can be challenging to implement in browsers since they cannot easily start
			background tasks. By leveraging WASM and async Rust interfaces, we can build a complete
			asynchronous task chain from OPFS to the JavaScript scheduler. In our upcoming blog posts, we
			will describe in detail how we achieve this—bear witness!
		</p>
		<pre class="text-background-dark leading-[1.3]">

						╔═Web APP══════════════════════╗
						║                              ║
						║ ┏━JS microtasks━━━━━━━━━━━━┓ ║
						║ ┃                          ┃ ║
						║ ┃ ┏╍WASM binding╍╍╍╍╍╍╍╍╍┓ ┃ ║
						║ ┃ ┇                      ┇ ┃ ║
						║ ┃ ┇ ┏━Tonbo async API━━┓ ┇ ┃ ║
						║ ┃ ┇ ┃                  ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┏╍WASM binding╍┓ ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┇              ┇ ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┇   ┏━━━━━━┓   ┇ ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┇   ┃ OPFS ┃   ┇ ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┇   ┗━━━━━━┛   ┇ ┃ ┇ ┃ ║
						║ ┃ ┇ ┃ ┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛ ┃ ┇ ┃ ║
						║ ┃ ┇ ┗━━━━━━━━━━━━━━━━━━┛ ┇ ┃ ║
						║ ┃ ┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┅┛ ┃ ║
						║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
						╚══════════════════════════════╝
		</pre>
		<h2 class="text-[1.2rem] font-medium mt-[1.2rem]">Futures and Promises</h2>
		<p>As we prepare for our next release, we plan to introduce several new features:</p>
		<pre
			class="font-code text-background-dark">	• Runtime Schema Declaration: Basic support for JavaScript (WASM) and Python.</pre>
		<pre
			class="font-code text-background-dark">	• S3 Integration: Implementation of tiered LSM Trees based on this integration.</pre>
		<p class="mt-[1rem]">
			We will soon offer a unified solution for both self-hosted and cloud environments, enabling
			the creation of offline-first storage and backup services on any remote storage platform.
			Designs and implementations are only valuable with real-world usage and feedback. If you
			believe our work could benefit you, please reach out directly. We’re excited to collaborate
			and provide any assistance we can.
		</p>
	</article>
</div>
