<script>
	import Dragonfly from './dragonfly.svelte';
	export let title = '';
	export let subtitle = '';
	export let showLinks = false;
</script>

<div class="tonbo-header apply-selection-light !h-auto flex-col gap-4 py-8">
	<div class="flex items-center justify-center relative w-full">
		<h2 class="text-3xl text-background-dark font-code mr-10 text-center">{title}</h2>
		<div class="mb-3 pointer-events-none ">
			<Dragonfly class="text-[4px]" />
		</div>
	</div>

	<p class="text-center text-background-dark font-code max-w-2xl px-4 text-sm md:text-base">
		{subtitle}
	</p>

	<div class="flex justify-center gap-6 font-code flex-wrap py-4">
		<a
			href="https://discord.gg/tonbo"
			class="text-background-dark font-medium md:text-tonbo-gray md:font-normal text-base underline decoration-solid underline-offset-auto md:hover:text-background-dark md:hover:font-medium transition-all mr-12"
		>
			&lt; Join Discord &gt;
		</a>
		<a
			href="mailto:contact@tonbo.io"
			class="text-background-dark font-medium md:text-tonbo-gray md:font-normal text-base underline decoration-solid underline-offset-auto md:hover:text-background-dark md:hover:font-medium transition-all"
		>
			&lt; Share use case &gt;
		</a>
	</div>
</div>
