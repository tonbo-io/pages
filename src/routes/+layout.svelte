<script>
	import '../app.css';
	import Navigator from './navigator.svelte';
</script>

<div class=" bg-background-dark h-[151px] md:h-[116px] w-full">
	<Navigator
		class="font-code px-8 py-10 sm:w-[800px] h-[151px] md:h-[116px] w-screen md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark pt-[2rem] pb-[2rem] flex-col sm:flex-row relative"
	/>
</div>

<slot />
