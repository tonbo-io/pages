<script>
	import '../app.css';
	import Navigator from './navigator.svelte';
	import HomeNavigator from './home-navigator.svelte';
	import { page } from '$app/stores';
</script>

<div class=" bg-background-dark">
	{#if $page.url.pathname === '/'}
		<HomeNavigator
			class="font-code px-8 py-10 h-[183px] lg:h-[103px] md:h-[103px] w-full sm:w-[600px] md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark pt-[2rem] pb-[2rem] flex-col sm:flex-row relative"
		/>
	{:else}
		<Navigator
			class="font-code px-8 w-full h-[151px] sm:w-[600px] md:h-[116px] md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark pt-[2rem] pb-[2rem] flex-col sm:flex-row relative"
		/>
	{/if}
</div>

<slot />

<div class="bg-[#E7F1BE] w-full h-full flex items-center justify-center">
	<div
		class="bg-[#E7F1BE] w-[340px] md:w-[1000px] lg:w-[1100px] mx-10 text-center text-background-dark border-t border-dashed border-background-dark pt-6 py-4 mt-20 font-code"
	>
		© Copyright 2024-, Tonbo IO.
	</div>
</div>
