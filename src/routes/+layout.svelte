<script>
	import '../app.css';
	import '../styles/layout.css';
	import '../styles/home.css';
	import HomeNavigator from './home-navigator.svelte';
	import { page } from '$app/stores';
</script>

<div class="bg-background-dark">
	<!-- Top Banner -->
	{#if $page.url.pathname === '/'}
		<div
			class="w-full bg-tonbo-red text-background-light font-code text-center py-4 text-base apply-selection"
		>
			<a href="/blog/introducing-tonbo" class="underline">Introducing New Tonbo - Read our blog!</a>
		</div>
	{/if}

	<!-- {#if $page.url.pathname === '/'} -->
	<HomeNavigator
		class="apply-navigator-base apply-navigator-responsive apply-home-navigator font-code"
	/>
	<!-- {:else}
		<Navigator
			class="apply-navigator-base apply-navigator-responsive apply-regular-navigator font-code"
		/>
	{/if} -->
</div>

<slot />

<div class="tonbo-footer apply-selection pt-[6rem]">
	<div class="tonbo-footer-content">© Copyright 2024-, Tonbo IO Inc.</div>
</div>
