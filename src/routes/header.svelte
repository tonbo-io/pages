<script>
	import Dragonfly from './dragonfly.svelte';
	export let title = '';
</script>

<div class="m-auto flex w-full bg-[#222623] h-[78px] items-center justify-center font-code">
	<div class="mr-2 pointer-events-none">
		<Dragonfly verticalScale="0.8" overallScale={0.25} />
	</div>
	<h2 class="text-3xl sm:text-5xl text-white indent-[-60px] font-code">{title}</h2>
</div>
