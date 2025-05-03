<script>
	import '../app.css';
	import '../styles/layout.css';
	import '../styles/tonbo.css';
	import Navigator from './navigator.svelte';
	import HomeNavigator from './home-navigator.svelte';
	import { page } from '$app/stores';
</script>

<div class="bg-background-dark">
	{#if $page.url.pathname === '/'}
		<HomeNavigator
			class="apply-navigator-base apply-navigator-responsive apply-home-navigator font-code"
		/>
	{:else}
		<Navigator
			class="apply-navigator-base apply-navigator-responsive apply-regular-navigator font-code"
		/>
	{/if}
</div>

<slot />

<div class="tonbo-footer apply-selection">
	<div class="tonbo-footer-content">© Copyright 2024-, Tonbo IO Inc.</div>
</div>
