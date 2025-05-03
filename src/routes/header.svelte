<script>
	import Dragonfly from './dragonfly.svelte';
	export let title = '';
</script>

<div class="tonbo-header apply-selection-light">
	<div class="absolute mb-3 pointer-events-none left-2 xs:absolute xs:left-4 sm:static sm:mr-10">
		<Dragonfly class="text-[4px]" />
	</div>
	<h2 class="text-3xl text-white sm:text-5xl font-code">{title}</h2>
</div>
