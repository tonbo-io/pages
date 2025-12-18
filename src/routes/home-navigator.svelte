<script>
	import Tonbo from './tonbo.svelte';
	import XLogo from '$lib/images/x-logo.png';
	import DiscordLogo from '$lib/images/discord-logo.png';
	import GitHubLogo from '$lib/images/github-logo.svg';
	import TabListIcon from '$lib/images/tablist.png';
	import CloseIcon from '$lib/images/close.png';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="{$$props.class}">
	<div class="w-full flex flex-row items-center justify-between gap-4">
		<!-- Logo -->
		<a href="/">
			<Tonbo inverted={true} />
		</a>

		<!-- Desktop Links -->
		<div class="hidden sm:flex items-center flex-wrap justify-center">
			<a href="/blogs">
				<div type="button" class="nav-button">Blogs</div>
			</a>
			<a href="https://docs.rs/tonbo/0.4.0-a0/tonbo/">
				<div type="button" class="nav-button">Docs</div>
			</a>
			<a href="/careers">
				<div type="button" class="nav-button">Careers</div>
			</a>
			<a href="https://github.com/tonbo-io/tonbo">
				<div type="button" class="nav-button-social group">
					<img src={GitHubLogo} alt="GitHub Logo" class="nav-button-icon" />
					<span class="hidden md:block">GitHub</span>
				</div>
			</a>
			<a href="https://discord.gg/j27XVFVmJM">
				<div type="button" class="nav-button-social group">
					<img src={DiscordLogo} alt="Discord Logo" class="nav-button-icon" />
					<span class="hidden md:block">Discord</span>
				</div>
			</a>
			<a href="https://x.com/tonboio">
				<div type="button" class="nav-button-social group">
					<img src={XLogo} alt="X Logo" class="nav-button-icon-x" />
					<span class="hidden md:block">X</span>
				</div>
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="sm:hidden text-background-light"
			on:click={toggleMenu}
		>
			<img src={TabListIcon} alt="Menu" class="h-7 w-7" />
		</button>
	</div>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div class="fixed inset-0 z-50 bg-background-dark px-4 py-2 flex flex-col">
			<div class="w-full flex justify-between items-center pb-2 border-b border-background-light">
				<a href="/" on:click={toggleMenu}>
					<Tonbo inverted={true} />
				</a>
				<button
					class="text-background-light"
					on:click={toggleMenu}
				>
					<img src={CloseIcon} alt="Close Menu" class="h-7 w-7" />
				</button>
			</div>

			<div class="flex flex-col items-center mt-10 space-y-6 text-background-light text-xl">
				<a href="/blogs" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					Blogs
				</a>
				<a href="https://docs.rs/tonbo/0.4.0-a0/tonbo/" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					Docs
				</a>
				<a href="/careers" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					Careers
				</a>
				<a href="https://github.com/tonbo-io/tonbo" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					GitHub
				</a>
				<a href="https://discord.gg/j27XVFVmJM" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					Discord
				</a>
				<a href="https://x.com/tonboio" class="w-auto px-4 text-center pb-2 border-b border-background-light" on:click={toggleMenu}>
					X
				</a>
			</div>
		</div>
	{/if}
</nav>
