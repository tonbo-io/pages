<script>
	import Dragonfly from './dragonfly.svelte';
	export let title = '';
</script>

<div
	class="m-auto flex w-full bg-[#222623] h-[78px] items-center justify-center font-code relative"
>
	<div class="absolute mr-2 pointer-events-none left-[-60px] top-[-97px]">
		<Dragonfly verticalScale="0.8" overallScale={0.25} />
	</div>
	<h2 class="text-3xl text-white sm:text-5xl font-code">{title}</h2>
</div>
