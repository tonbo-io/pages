<script>
	import Markdown from '$lib/components/Markdown.svelte';
</script>

<Markdown
	content={`
# Introducing Aisle
May 29, 2025 by [Tzu Gwo](mailto:tzu@tonbo.io)

We are excited to introduce [Aisle](https://github.com/tonbo-io/aisle): a lightweight Parquet query library that delivers efficient predicate pushdown for reading Parquet files. Aisle's binary size is only about one-fifth of the DataFusion Parquet datasource, making it compact and easy to embed.

Unlike using standard Parquet bindings, Aisle provides a set of low-level, non-SQL APIs that let users describe exactly what data ranges they want to query. Based on these descriptions, Aisle uses only the metadata inside the Parquet file to quickly skip over irrelevant data, speeding up queries through a technique known as **pushdown**.

In our benchmarks, Aisle delivers a 2x to 10x speedup over plain Parquet Rust bindings, especially when there is a lot of data to filter—the more data you can skip, the more effective Aisle becomes.

## Aisle Performance

Aisle's predicate filtering provides significant performance benefits, especially for selective queries on large datasets. We designed [a series of benchmarks](https://github.com/tonbo-io/aisle/blob/main/docs/images/equivalent_query_ordered.png) to test Aisle's performance, and the results show that predicate pushdown brings a clear improvement over traditional methods. Below is an example of reading a 1.3GB sorted Parquet file.
\`\`\`
                                     range query with ordered data
                     ╔═══════════════════════════════════════════════════════════════════════════╗
parquet              ╢███████████████████████████████████████████████████████████████████████████╟ 740.0068
Parquet + Page index ╢██████████████████████████████████████████████████████████████████████░░░░░╟ 691.7279
Aisle                ╢███████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 307.3197
Aisle + Page index   ╢█████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 287.6667
                     ╠═══════════════════════════════════════════════════════════════════════════╣
                     0                                                                           740.0068

                                    equivalent query with ordered data
                     ╔═══════════════════════════════════════════════════════════════════════════╗
parquet              ╢███████████████████████████████████████████████████████████████████████████╟ 652.1447
Parquet + Page index ╢██████████████████████████████████████████████████████████████████████░░░░░╟ 611.5472
Aisle                ╢█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 5.5786
Aisle + Page index   ╢░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟ 2.717
                     ╠═══════════════════════════════════════════════════════════════════════════╣
                     0                                                                           652.1447
                                            (lower is better)
\`\`\`

## Predicate Pushdown

When working with large datasets, one of the keys to efficient querying is to avoid reading unnecessary data. This is the core idea behind **predicate pushdown**: by applying filters early in the data reading process, the system can skip over irrelevant data and significantly reduce I/O and memory usage.

Parquet's columnar format and rich metadata—such as min/max values and null counts—make predicate pushdown possible. Aisle leverages this metadata to quickly determine, before touching any actual data, whether a row group or data page contains relevant results. This allows Aisle to skip entire data blocks and minimize wasted I/O.

DataFusion's Parquet datasource already supports pushdown (which they call *pruning*). For more details, see [Parquet Pruning in DataFusion: Read Only What Matters](https://datafusion.apache.org/blog/2025/03/20/parquet-pruning/). DataFusion achieves pushdown through its SQL query optimizer. Because SQL is highly expressive, its optimizer needs to handle nested and complex \`WHERE\` clauses, recursively optimizing each expression—making predicate pushdown in a SQL engine relatively complex.

## How Aisle Works

Unlike a SQL query engine, Tonbo—as a key-value database—focuses only on two core operations: **point get** and **range scan**. This means we don't need to handle complex, nested expressions; instead, we only support straightforward conditions like range comparisons and literal equality.

Tonbo's goal is becoming a "headless" analytics engine, by leaving complex SQL optimization and expression parsing to the upstream database, Tonbo can keep its architecture lightweight and efficient, focusing resources on storage and high-performance I/O. This not only simplifies the system but also makes Tonbo easy to integrate with other database systems, offering "plug-and-play" analytics storage and significantly improving analytical query performance.

In addition to predicate pushdown, if the target column is sorted (as indicated by Parquet metadata), Aisle can take advantage of ordering to stop scanning early—once it encounters data greater than the upper bound, it can immediately terminate the scan, further boosting efficiency.

### Directly Built on Top of parquet-rs

Aisle is designed to provide all its features using only the APIs from the \`parquet-rs\` library, while keeping things simple and focused. The Parquet Rust SDK offers two main high-level APIs for skipping unnecessary data during reads:

**1. RowSelection:**

\`\`\`rust
let selectors = vec![
    RowSelector::skip(5),
    RowSelector::select(5),
    RowSelector::select(5),
    RowSelector::skip(5),
];

// Creating a selection will combine adjacent selectors
let selection: RowSelection = selectors.into();
\`\`\`

\`RowSelection\` offers a basic interface for specifying which rows should be skipped or selected, starting from the beginning of the file. If all rows in a data page are skipped, \`parquet-rs\` can use the page index to skip the entire page and reduce I/O. However, \`RowSelection\` is limited to these basic skip/select operations and does not provide built-in support for advanced filtering logic. If you want to use it directly, you'll still need to implement the predicate pushdown process yourself to determine exactly which rows to skip or select.

**2. RowFilter:**

\`\`\`rust
// Closure that evaluates "b > 0"
let predicate = |batch: RecordBatch| {
   let scalar_0 = Int64Array::new_scalar(0);
   let column = batch.column(0).as_primitive::<Int64Type>();
   // call the gt kernel to compute which returns a BooleanArray
   gt(column, &scalar_0)
};
// Create ArrowPredicateFn that can be passed to RowFilter
let arrow_predicate: impl RowFilter = ArrowPredicateFn::new(..., predicate);
\`\`\`

\`RowFilter\` is built with a closure and allows for richer filtering conditions. However, the closure operates on \`Arrow RecordBatch\` structures that are already read into memory from Parquet files. While \`RowFilter\` is convenient and enables precise row-level filtering, it cannot push the filter down to the lowest level I/O operation. Since reducing I/O is the main goal of predicate pushdown, the efficiency gains from using \`RowFilter\` are limited.

Aisle provides an API that is as expressive as \`RowFilter\` but delivers the pushdown efficiency of \`RowSelection\`. By allowing users to describe the range of data they need (for example, values greater than or less than a certain number in a column), Aisle leverages Parquet metadata to generate \`RowSelection\` for skipping I/O and also builds the precise matching needed for row filtering. You can find more details and API examples in the current [Aisle README](https://github.com/tonbo-io/aisle#readme).

## What's Next
Aisle is still in the early experimental stage, and the API may change as we continue to improve it. We'd love to hear your feedback and ideas to help shape the project. If you're building data-intensive applications that read directly from Parquet files, we'd be excited to connect with you. Join our discussion on Discord: https://discord.gg/j27XVFVmJM

`}
/>
