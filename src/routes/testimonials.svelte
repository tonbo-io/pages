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
<div class="testimonials-container hidden sm:block">
	<div class="testimonials-wrapper">
		<div class="testimonials-track">
			{#each testimonials as item}
				<div class="testimonial-card">
					<div class="testimonial-header">
						<span class="testimonial-name">{item.name}</span>
						<span class="testimonial-handle">{item.handle}</span>
					</div>
					<p class="testimonial-content">{item.content}</p>
				</div>
			{/each}
			<!-- Duplicate for seamless loop -->
			{#each testimonials as item}
				<div class="testimonial-card">
					<div class="testimonial-header">
						<span class="testimonial-name">{item.name}</span>
						<span class="testimonial-handle">{item.handle}</span>
					</div>
					<p class="testimonial-content">{item.content}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Mobile: 2x2 Grid, no scroll -->
<div class="sm:hidden px-4 py-6">
	<div class="grid grid-cols-2 gap-3">
		{#each testimonials.slice(0, 4) as item}
			<div class="testimonial-card-mobile">
				<div class="testimonial-header-mobile">
					<span class="testimonial-name">{item.name}</span>
					<span class="testimonial-handle">{item.handle}</span>
				</div>
				<p class="testimonial-content-mobile">{item.content}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Container */
	.testimonials-container {
		overflow: hidden;
		padding: 2rem 0;
	}

	.testimonials-wrapper {
		position: relative;
		width: 100%;
	}

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

	/* Desktop Card */
	.testimonial-card {
		flex-shrink: 0;
		min-width: 320px;
		max-width: 350px;
		padding: 1.5rem 1.5rem;
		border-top: 1px solid #1f251a;
		border-bottom: 1px solid #1f251a;
		background: #e4e6d9;
	}

	.testimonial-header {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.75rem;
	}

	.testimonial-name {
		font-weight: 500;
		font-size: 1rem;
		color: #1f251a;
	}

	.testimonial-handle {
		font-size: 0.85rem;
		color: #6a6b54;
	}

	.testimonial-content {
		font-size: 0.9rem;
		line-height: 1.5;
		color: #1f251a;
	}

	/* Mobile Card */
	.testimonial-card-mobile {
		padding: 1rem;
		border-top: 1px solid #1f251a;
		border-bottom: 1px solid #1f251a;
		background: #e4e6d9;
	}

	.testimonial-header-mobile {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.5rem;
	}

	.testimonial-content-mobile {
		font-size: 0.75rem;
		line-height: 1.4;
		color: #1f251a;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
