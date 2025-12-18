<script>
	import Markdown from '$lib/components/Markdown.svelte';
	import { CodeBlock } from 'svhighlight';
	import 'highlight.js/styles/atom-one-dark.css';

	const rustCode = `
#[tonbo_record]
pub struct User {
    #[primary_key]
    name: String,
    email: Option<String>,
    age: u8,
}
`;

	const structuredCode = `
let lower = "Alice".into();
let upper = "Bob".into();
let mut scan = txn
    .scan((Bound::Included(&name), Bound::Excluded(&upper)))
    .await
     // just project first column, skip others when reading from db files
    .projection(vec![1])
    // only need one row
    .limit(1)
    .take()
    .await.unwrap();
`;

	const asyncCode = `
db.insert(User {
    name: "Alice".into(),
    email: Some("alice@gmail.com".into()),
    age: 22,
})
.await.unwrap();

let name = "Alice".into();
let user = txn
    .get(
        &name,
        Projection::All,
    )
    .await.unwrap();
`;

	const content = `
# Introducing Tonbo

August 14, 2024 by Tzu Gwo

We're excited to announce that [Tonbo](https://github.com/tonbo-io/tonbo) is now open source in its preview version! Tonbo is an embedded persistent database written in Rust. It provides essential KV-like methods: \`insert\`, \`filter\`, and \`range scan\`, making it a foundation for data-intensive applications, including other types of databases. It also supports type-safe structured data storage. For Rust developers, we offer an ORM-like macro for ease of use:
`;
</script>

<Markdown {content} />

<CodeBlock
	language="rust"
	code={rustCode}
	showHeader={false}
	showLineNumbers={true}
	background="bg-background-dark"
	codeTextClasses="font-code text-background-light text-[0.8rem]"
	lineNumberTextClasses="font-code text-background-light"
	rounded="rounded-none"
/>

<Markdown
	content={`
Tonbo enables fast and convenient querying over type-safe structured data. For example, integrating a query engine takes just a few hours of coding: [datafusion example](https://github.com/tonbo-io/tonbo/blob/main/examples/datafusion.rs) (official support for DataFusion will be included in the next release). In our preliminary benchmarks, Tonbo outperforms RocksDB by 2.2x in data scan scenarios, even though it's still in its early stages. If you're interested in Tonbo, please star the project on GitHub, follow us on [Twitter](https://x.com/tonboio), or join the conversation on [Discord](https://discord.gg/xa2KyKV5).

## Why We Built Tonbo?

Analytical tools in the [Apache Arrow](https://arrow.apache.org/) ecosystem (such as [Apache Arrow DataFusion](https://github.com/apache/arrow-datafusion)) provide a nice foundation for data processing. They get a great balance between scalability, development efficiency, and execution performance, allowing developers to build efficient data analysis applications within days using DataFusion.

However, most tools focus on the read path of databases. Every data-intensive application using DataFusion ends up spending significant time developing its own write path implementation. What if we could have a write path implementation as agile and performant as DataFusion?

That's the primary design goal of Tonbo: to serve as an embedded database offering a highly scalable data storage engine for the Arrow ecosystem. Additionally, Tonbo also has a long-term goal: **provide offline-first distributed data storage capabilities, support rapid and flexible data storage across various environments—from embedded Linux and browsers to servers—and integrate with multiple storage systems such as file systems, OPFS, and S3.**
`}
/>

<div class="w-full max-w-full overflow-x-auto">
	<pre
		class="inline-block p-4 font-mono text-xs whitespace-pre sm:text-sm md:text-base min-w-max leading-[1.3">

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
</div>

<Markdown
	content={`
## How is Tonbo Designed?

### LSM Tree

Tonbo is built on the [LSM Tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree) architecture. Typically, databases use either [Log-Structured Merge (LSM) trees or B+ trees](https://tikv.org/deep-dive/key-value-engine/b-tree-vs-lsm/). The primary advantage of LSM trees is that all foreground writes are performed in memory, while background writes are sequential, resulting in very high write throughput.

LSM trees also have minimal file system requirements: they only need a file system that supports append-only operations to achieve high-performance data insertion and updates. This makes Tonbo suitable for a wide range of devices, from flash storage to SSDs. By offloading tasks like data clean-up and compaction to the background, LSM trees streamline the read/write process and reduce the load on the frontend.

### Type-Safe Structured Storage

As mentioned earlier, Tonbo extends beyond a traditional KV database to support reading and writing structured data. This capability is achieved by faithfully translating user-defined data structures into Arrow schemas. Tonbo leverages the features provided by Arrow/Parquet to support pushdown operations like \`limit\`, \`project\`, and \`filter\`:
`}
/>

<CodeBlock
	language="rust"
	code={structuredCode}
	showHeader={false}
	showLineNumbers={true}
	background="bg-background-dark"
	codeTextClasses="font-code text-background-light text-[0.8rem]"
	lineNumberTextClasses="font-code text-background-light"
	rounded="rounded-none"
/>

<Markdown
	content={`
This means that Tonbo can precisely scan the data specified by the user, skipping irrelevant data, leading to potentially more than tenfold improvements in querying efficiency when used appropriately. Additionally, according to compile-time type hints, Tonbo can transmute bytes read from files into user-defined data types for free. In many data-intensive applications, serialization overhead can account for 30% to 50% of the total load.

### Asynchronous

Tonbo fully supports asynchronous methods:
`}
/>

<CodeBlock
	language="rust"
	code={asyncCode}
	showHeader={false}
	showLineNumbers={true}
	background="bg-background-dark"
	codeTextClasses="font-code text-background-light text-[0.8rem]"
	lineNumberTextClasses="font-code text-background-light"
	rounded="rounded-none"
/>

<Markdown
	content={`
Using asynchronous interfaces not only increases the efficiency of concurrent operations, but also allows Tonbo to provide concurrent access on resource-constrained devices, such as browsers, mobile apps, and embedded Linux systems. The LSM Tree architecture, as mentioned in previous sections, requires background tasks for garbage collection and compaction of newly written data, which can be challenging to implement in browsers since they cannot easily start background tasks. By leveraging WASM and async Rust interfaces, we can build a complete asynchronous task chain from OPFS to the JavaScript scheduler. In our upcoming blog posts, we will describe in detail how we achieve this—bear witness!
`}
/>

<div class="w-full max-w-full overflow-x-auto">
	<pre
		class="inline-block p-4 font-mono text-xs whitespace-pre sm:text-sm md:text-base min-w-max leading-[1.3">

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
</div>

<Markdown
	content={`
## Futures and Promises

As we prepare for our next release, we plan to introduce several new features:

- **Runtime Schema Declaration**: Basic support for JavaScript (WASM) and Python.
- **S3 Integration**: Implementation of tiered LSM Trees based on this integration.

We will soon offer a unified solution for both self-hosted and cloud environments, enabling the creation of offline-first storage and backup services on any remote storage platform. Designs and implementations are only valuable with real-world usage and feedback. If you believe our work could benefit you, please reach out directly. We're excited to collaborate and provide any assistance we can.
`}
/>
