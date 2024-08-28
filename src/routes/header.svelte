<script>
	import Dragonfly from './dragonfly.svelte';
	export let title = '';
</script>

<div
	class="hidden sm:w-[798px] md:w-[998px] lg:w-[1198px] m-auto sm:flex w-full bg-[#222623] h-[78px] items-center justify-center"
>
	<div class="mr-2">
		<Dragonfly verticalScale="0.8" overallScale={0.25} />
	</div>
	<h2 class="text-5xl text-white indent-[-40px]">{title}</h2>
</div>
