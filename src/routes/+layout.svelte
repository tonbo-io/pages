<script>
	import '../app.css';
	import '../styles/layout.css';
	import Navigator from './navigator.svelte';
	import HomeNavigator from './home-navigator.svelte';
	import { page } from '$app/stores';
</script>

<div class=" bg-background-dark">
	{#if $page.url.pathname === '/'}
		<HomeNavigator class="apply-navigator-base apply-navigator-responsive apply-home-navigator" />
	{:else}
		<Navigator class="apply-navigator-base apply-navigator-responsive apply-regular-navigator" />
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
