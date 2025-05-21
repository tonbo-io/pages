<script>
	import Markdown from '$lib/components/Markdown.svelte';
</script>

<Markdown
	content={`
# Aisle: A fine pushdown parquet scanner

Today, we're excited to introduce Aisle, our high-performance Parquet file reader that implements
page-level predicate pushdown. This technological advancement significantly reduces I/O operations
and memory usage for analytical queries, especially for selective queries on large datasets.

## Predicate Pushdown
**Predicate** pushdown *is* a query optimization technique used in database. It filters data in advance
to reduce the data passed to the parent node. The following figure describes how predicate pushdown works.
`}
/>

<div class="w-full max-w-full overflow-x-auto">
	<pre
		class="inline-block p-4 font-mono text-xs whitespace-pre sm:text-sm md:text-base min-w-max leading-[1.3">

                    a &gt 30 AND b &lt 50
┌───────────────────────┐      ┌────────────────────────┐
│ ┏━━━━━┓┏━━━━━┓┏━━━━━┓ │      │  ┌ ─ ─ ┐┌ ─ ─ ┐┌ ─ ─ ┐ │
│ ┃  1  ┃┃  9  ┃┃  3  ┃ │      │  │  1  ││  9  ││  3  │ │
│ ┗━━━━━┛┗━━━━━┛┗━━━━━┛ │      │  └ ─ ─ ┘└ ─ ─ ┘└ ─ ─ ┘ │
│ ┏━━━━━┓┏━━━━━┓┏━━━━━┓ │      │  ┌ ─ ─ ┐┌ ─ ─ ┐┌ ─ ─ ┐ │
│ ┃  20 ┃┃  32 ┃┃  24 ┃ │      │  │  20 ││  32 ││  24 │ │
│ ┗━━━━━┛┗━━━━━┛┗━━━━━┛ │      │  └ ─ ─ ┘└ ─ ─ ┘└ ─ ─ ┘ │
│ ┏━━━━━┓┏━━━━━┓┏━━━━━┓ │━━━━━━▶  ┏━━━━━┓┏━━━━━┓┏━━━━━┓ │
│ ┃  50 ┃┃  47 ┃┃  37 ┃ │      │  ┃  50 ┃┃  47 ┃┃  37 ┃ │
│ ┗━━━━━┛┗━━━━━┛┗━━━━━┛ │      │  ┗━━━━━┛┗━━━━━┛┗━━━━━┛ │
│ ┏━━━━━┓┏━━━━━┓┏━━━━━┓ │      │  ┌ ─ ─ ┐┌ ─ ─ ┐┌ ─ ─ ┐ │
│ ┃ 100 ┃┃  99 ┃┃  89 ┃ │      │  │ 100 ││  99 ││  89 │ │
│ ┗━━━━━┛┗━━━━━┛┗━━━━━┛ │      │  └ ─ ─ ┘└ ─ ─ ┘└ ─ ─ ┘ │
└───────────────────────┘      └────────────────────────┘

predicate pushdown
┌───────┐        ┌───────┐        ┌───────┐        ┌───────┐        ┌───────┐
│┏━━━━━┓│        │┌ ─ ─ ┐│        │       │        │       │        │       │
│┃  1  ┃│        ││  1  ││        │       │        │       │        │       │
│┗━━━━━┛│        │└ ─ ─ ┘│        │       │        │       │        │       │
│┏━━━━━┓│        │┌ ─ ─ ┐│        │       │        │       │        │       │
│┃  20 ┃│ a &gt 30 ││  20 ││ load b │       │ b &lt 50 │       │ load c │       │
│┗━━━━━┛│━━━━━━━▶│└ ─ ─ ┘│━━━━━━━▶│       │━━━━━━━▶│       │━━━━━━━▶│       │
│┏━━━━━┓│        │┏━━━━━┓│        │┏━━━━━┓│        │┏━━━━━┓│        │┏━━━━━┓│
│┃  50 ┃│        │┃  50 ┃│        │┃  47 ┃│        │┃  47 ┃│        │┃  37 ┃│
│┗━━━━━┛│        │┗━━━━━┛│        │┗━━━━━┛│        │┗━━━━━┛│        │┗━━━━━┛│
│┏━━━━━┓│        │┏━━━━━┓│        │┏━━━━━┓│        │┌ ─ ─ ┐│        │       │
│┃ 100 ┃│        │┃ 100 ┃│        │┃  99 ┃│        ││  99 ││        │       │
│┗━━━━━┛│        │┗━━━━━┛│        │┗━━━━━┛│        │└ ─ ─ ┘│        │       │
└───────┘        └───────┘        └───────┘        └───────┘        └───────┘
</pre>
</div>
<Markdown
	content={`
- The upper one loads all rows and applies filter to each row. This approach may load too much unnecessary data.
- The lower one only loads columns that are included by predicates and then apply filters. After filtering, only load all data that matches. This approach greatly reduces I/O and improves performance and this is what Parquer has done for us.

Parquet uses predicate pushdown techniques to optimise query performance, but there are still a lot of things to do to get the best performance. Parquet provide \`RowSelection\` to determin which rows to be loaded and which rows not to be loaded. So we can get better performance if we can tell parquet reader not to load those rows that we don't want. But how do we know which rows should be selected before knowing the actual data?


As mentioned in the [Querying Parquet with Millisecond Latency](https://arrow.apache.org/blog/2022/12/26/querying-parquet-with-millisecond-latency/), we can use the statistics stored in the footer to skip data before loading the data. For example, If we know the max/min values of row groups, we can apply filters on the row groups and skip the whole row groups before loading them.

Fortunately, Parquet will write statistics(row group statistics, [page index](https://github.com/apache/parquet-format/blob/master/PageIndex.md)) in the [Parquet metadata](https://parquet.apache.org/docs/file-format/metadata/). By utilizing these statistics, we can skip unnecessary data more effectively without loading the actual data.

The following figure describes what we have done to implement an efficient parquet reader.

![filter pushdown](/blog-images/filter-pushdown.png)

First, we load metadata from parquet file, and read the row group statistics. Row group statistics may contains max/min values of all column chunks in the row group. If we can get the max/min values successfully, then we can apply filters to them. As you can see, the row group 2 does not match our filters, so we can skip this row group.

After that, we read the [page index](https://github.com/apache/parquet-format/blob/master/PageIndex.md) in the row groups 1 and apply filters on them. Like row group statistics, page index alos contains max/min values for each page. So we can know which pages don't meet the filters and skip them.


## Performance Results
Aisle's predicate filtering approach provides significant performance benefits, especially for selective queries on large datasets. We designed sets of benchmark scenarios to test the performance of Aisle. The result shows considerable improvement when using predicate pushdown compared to traditional approaches. Here is the result of reading 1.3GB parquet file with ordered data.

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

Please see [here](https://github.com/tonbo-io/aisle/blob/main/docs/benchmark.md) for more benchmark results.

## Why Aisle
There are many projects that implement predicate pushdown, but they require closer integration with a query engine such as Datafusion. It is too complex to integrate but it is too redundant to implement by ourselves, too.

Aisle focuses on predicate pushdown and provides similar API to the [\`ParquetRecordBatchStreamBuilder\`](https://docs.rs/parquet/latest/parquet/arrow/async_reader/type.ParquetRecordBatchStreamBuilder.html) so that we can easily migrate and don't need to implement it by ourselves anymore.

## When to Use Aisle
Aisle provides the most benefit in the following scenarios:
1. **Selective Queries**: The more selective your predicates, the greater the benefit from Aisle.
2. **Sorted or Partially Sorted Data**: When data has good locality within pages, page statistics become more effective.
3. **I/O-Constrained Environments**: When I/O is your bottleneck, reducing the amount of data read provides substantial benefits.
4. **Large Parquet Files**: The larger the files, the more important efficient filtering becomes.

## Futures

While Aisle already provides significant benefits, we're continuing to improve it in several ways:
1. Support for More Predicate Types: Currently, we support basic comparison operators (>, >=, <, <=). We are planning to add more operations and complex predicates.
2. Multi-Column Predicates: Enhance support for predicates that involve multiple columns.
3. Performance Optimizations: Continue refining our implementation for even better performance.

## References
- [Querying Parquet with Millisecond Latency](https://arrow.apache.org/blog/2022/12/26/querying-parquet-with-millisecond-latency/)
- [Parquet Pruning in DataFusion: Read Only What Matters](https://datafusion.apache.org/blog/2025/03/20/parquet-pruning/)
- [Efficient Filter Pushdown in Parquet](https://datafusion.apache.org/blog/2025/03/21/parquet-pushdown/)
`}
/>

<style>
</style>
