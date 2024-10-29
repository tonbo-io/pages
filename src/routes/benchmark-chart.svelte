<script>
	const data = [
		{ name: 'Tonbo', value: 1666, percentage: 43.4, bar: '█████████▓▒' },
		{ name: 'RocksDB', value: 3689, percentage: 96.1, bar: '██████████████████████▓▒' },
		{ name: 'Sled', value: 3837, percentage: 100, bar: '███████████████████████▓▒' }
	];
</script>

<div class="chart-container">
	{#each data as item}
		<div class="chart-row">
			<div class="chart-label">{item.name}</div>
			<div class="chart-bar">
				<div class="chart-bar-fill" style="width: {item.percentage}%;">{item.bar}</div>
			</div>
			<div class="chart-value">{item.value}ms</div>
		</div>
	{/each}
	<div class="flex justify-between mb-4">
		<p>(lower is better)</p>
		<p>Latency (pct99)</p>
	</div>
	<div>
		<p>CPU: AMD EPYC 7H12</p>
		<p>RAM: 64GB DDR4 2933MHz * 8</p>
		<p>DISK: SamSung 970 EVO Plus 4TB</p>
	</div>
</div>

<style>
	.chart-container {
		font-family: monospace;
		font-size: 14px;
		line-height: 1.5;
		color: #333;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		box-sizing: border-box;
	}
	.chart-row {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.chart-label {
		width: 80px;
		min-width: 80px;
		text-align: right;
		padding-right: 10px;
	}
	.chart-bar {
		flex: 1;
		min-width: 100px;
		height: 1.2em;
		position: relative;
		overflow: hidden;
	}
	.chart-bar-fill {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		color: #000;
		overflow: hidden;
		white-space: nowrap;
	}
	.chart-value {
		width: 60px;
		min-width: 60px;
		padding-left: 10px;
	}
	@media (max-width: 600px) {
		.chart-container {
			font-size: 12px;
		}
		.chart-label {
			width: 60px;
			min-width: 60px;
		}
	}
</style>
