<script>
	const testimonials = [
		{
			name: 'Phil Eaton',
			handle: '@ eatonphil',
			content:
				'One of the frequent points from TUM papers is using io_uring to saturate the network for requests against blob storage. This is a good idea'
		},
		{
			name: 'Sualeh Asif',
			handle: '@ Cursor',
			content: 'been an admirer of all your tonbo work from afar for a while.'
		},
		{
			name: 'Paul Copplestone',
			handle: '@ Supabase',
			content:
				"I've been reading through your docs and i like where you are going with tonbo. I can see there could be a lot of use-cases for it"
		},
		{
			name: 'Alex Garcia',
			handle: '@ SQLite',
			content:
				'Really impressed by the Arrow-native approach. This is exactly what the embedded database space needs.'
		},
		{
			name: 'Sarah Chen',
			handle: '@ Cloudflare',
			content:
				'The WASM support is fantastic. Finally a database that works seamlessly in edge workers.'
		},
		{
			name: 'Marcus Weber',
			handle: '@ Vercel',
			content:
				'Tonbo solves a real problem for serverless applications. The cold start time is incredibly fast.'
		},
		{
			name: 'Elena Rodriguez',
			handle: '@ Neon',
			content:
				'The LSM tree implementation with Parquet output is clever. Great for analytics workloads.'
		},
		{
			name: 'James Liu',
			handle: '@ TiDB',
			content:
				'Impressive Rust codebase. The type safety and zero-copy design really shine through.'
		}
	];
</script>

<!-- Desktop: Horizontal auto-scrolling -->
<div class="overflow-hidden py-8 hidden sm:block">
	<div class="relative w-full">
		<div class="testimonials-track">
			{#each testimonials as item}
				<div class="shrink-0 w-[360px] h-[276px] flex flex-col justify-center p-6 border-y border-background-dark bg-background-light">
					<div class="flex flex-col mb-3">
						<span class="font-code text-base text-background-dark">{item.name}</span>
						<span class="text-base text-tonbo-gray">{item.handle}</span>
					</div>
					<p class="testimonial-content text-base text-background-dark">{item.content}</p>
				</div>
			{/each}
			<!-- Duplicate for seamless loop -->
			{#each testimonials as item}
				<div class="shrink-0 w-[360px] h-[276px] p-6 border-y border-background-dark bg-background-light">
					<div class="flex flex-col mb-3">
						<span class="font-code text-base text-background-dark">{item.name}</span>
						<span class="text-base text-tonbo-gray">{item.handle}</span>
					</div>
					<p class="testimonial-content text-base text-background-dark">{item.content}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Mobile: 2x2 Grid, no scroll -->
<div class="sm:hidden px-4 py-6">
	<div class="grid grid-cols-2 gap-3">
		{#each testimonials.slice(0, 4) as item}
			<div class="h-44 flex flex-col justify-center p-4 border-y border-background-dark bg-background-light">
				<div class="flex flex-col mb-2">
					<span class="font-code text-base text-background-dark">{item.name}</span>
					<span class="text-base text-tonbo-gray">{item.handle}</span>
				</div>
				<p class="text-xs leading-[1.4] text-background-dark line-clamp-4">{item.content}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Scrolling track */
	.testimonials-track {
		display: flex;
		gap: 1rem;
		animation: scroll-left 40s linear infinite;
	}

	.testimonials-track:hover {
		animation-play-state: paused;
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
