<script>
	import '../app.css';
	import Navigator from './navigator.svelte';
</script>

<div class="bg-background-dark font-code">
	<Navigator
		class="1200px sm:w-[800px] md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark -mb-[6.5rem] pt-[2rem] pb-[2rem]"
	/>
</div>

<slot />
