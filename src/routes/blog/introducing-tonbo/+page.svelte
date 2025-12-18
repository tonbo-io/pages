<svelte:head>
	<title>Introducing Tonbo</title>
	<meta name="description" content="Tonbo is an open source embedded database library for building serverless, data intensive applications." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Introducing Tonbo" />
	<meta name="twitter:description" content="Tonbo is an open source embedded database library for building serverless, data intensive applications." />
	<meta name="twitter:image" content="https://pub-82daae30822c4a238642e8abc3c568a6.r2.dev/twitter%20card%20-%20introducing%20tonbo.png" />
	<meta property="og:title" content="Introducing Tonbo" />
	<meta property="og:description" content="Tonbo is an open source embedded database library for building serverless, data intensive applications." />
	<meta property="og:image" content="https://pub-82daae30822c4a238642e8abc3c568a6.r2.dev/twitter%20card%20-%20introducing%20tonbo.png" />
	<meta property="og:type" content="article" />
</svelte:head>

<script>
	import Markdown from '$lib/components/Markdown.svelte';

	const content = `
# Introducing Tonbo

> We've bumped up the open-source Tonbo to the next version 0.4.0! It is now available on [crates.io](https://crates.io/crates/tonbo/0.4.0-a0).

Tonbo is an open source embedded database library for building serverless, data intensive applications. It lets you embed data processing and analytics wherever they make sense, inside a Postgres extension, a client application, a lambda function, or even a browser page, without running or operating a separate database service.

Tonbo can also persist data in object storage such as S3. This makes it possible to scale to zero, start up quickly, scale storage almost without limits, and safely share data across many short lived instances.

Tonbo is a unified, merge-tree-style storage layer that sits behind stateless compute. It combines local disk and object storage, and lets you define rich schemas so your data can live remotely while your compute quickly scales to zero and cold-starts.

## Why are we doing this?

Future workloads, especially AI agents driven ones, are far more dynamic than traditional request response systems. A single user prompt can turn into hundreds of tool calls and model inferences. This is exactly the shape serverless compute was designed for. Supporting this kind of execution means we need to rethink the data layer, not just the compute layer.

Serverless computing has pushed pay as you go execution to its logical extreme. Compute cost now scales almost linearly with traffic. But for data intensive applications, this promise often breaks down due to the data usually still lives in a long running database service. Connection limits, write hot spots, backups, upgrades, sharding, and cross region replication quickly pull you back into operations work. That gap is where the serverless experience starts to feel inconsistent, and Tonbo is our attempt to close it.

## What makes Tonbo different?

 Tonbo is often compared with other embedded databases like SQLite or DuckDB.  But Tonbo was not designed to solve the embedded use case alone. There are several fundamental differences:

1. ### **Tonbo treats object storage as a first class backend**

    Data can live in S3 while instances start and stop on demand, without depending on a permanently running database service. This matches how serverless systems actually work.

2. ### **Tonbo makes concurrent reads and writes predictable on shared storage**

    Object storage does not provide database style coordination by default. To make concurrent reads and writes predictable, we built [fusio-manifest](https://docs.rs/fusio-manifest/0.4.3/fusio_manifest/)  on top of conditional PUTs in object storage, urning critical metadata updates into coordinated atomic steps. This allows us to address concurrency control and read-write consistency on object storage, and enables multiple independent instances to safely share the same underlying data.

3. ### **Optimizing for analytics, not classic OLTP**

    Tonbo is built mainly for workloads like log analytics, observability, and online analysis. It uses layered Parquet as the storage format and [Arrow](https://github.com/tonbo-io/typed-arrow) as the in memory data format. This fits analytical access patterns well and allows data to be reused directly by the wider analytics ecosystem, instead of being locked into a single system: what is commonly referred to as “no vendor lock-in”


Also, Tonbo implements some totally new insight:

1. ### **Treating versioning and time travel as core features**

    In many systems, history is an afterthought. In Tonbo, versioned data and fast time travel are built in from the start. This makes auditing, debugging, experiments, and version aware queries much easier, without adding extra pipelines or operational complexity.

2. ### **Providing portable and efficient async IO**

    As a database library, Tonbo needs to run in many environments, from local disks to remote object storage, that means Tonbo is totally async. That is why we built [fusio](https://github.com/tonbo-io/fusio), a lightweight IO layer that supports random reads and sequential writes across multiple backends, and works with different async runtimes.

3. ### **API-centered Query abstractions designed for serverless control flow**

    In serverless systems, a library style database often fits better than a SQL endpoint. Tonbo is therefore API first rather than SQL first. APIs make it easier to express execution intent, integrate with application logic, and still leave plenty of room for execution layer optimizations.


For more features, please check them out: https://github.com/tonbo-io/tonbo
`;
</script>

<Markdown {content} />
