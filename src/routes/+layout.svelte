<script>
	import '../app.css';
	import Navigator from './navigator.svelte';
	import HomeNavigator from './home-navigator.svelte';
	import { page } from '$app/stores';
</script>

<div class=" bg-background-dark">
	{#if $page.url.pathname === '/'}
		<HomeNavigator
			class="font-code px-8 py-10 sm:w-[800px] h-[183px] lg:h-[251px] md:h-[116px] w-screen md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark pt-[2rem] pb-[2rem] flex-col sm:flex-row relative"
		/>
	{:else}
		<Navigator
			class="font-code px-8 py-1 w-full h-[151px] md:h-[116px] md:w-[1000px] lg:w-[1200px] mx-auto flex justify-between bg-background-dark pt-[2rem] pb-[2rem] flex-col sm:flex-row relative"
		/>
	{/if}
</div>

<slot />
