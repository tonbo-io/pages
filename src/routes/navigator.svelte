<script>
	import Tonbo from './tonbo.svelte';
	import XLogo from '$lib/images/x-logo.png';
	import DiscordLogo from '$lib/images/discord-logo.png';
	import GitHubLogo from '$lib/images/github-logo.svg';
</script>

<nav class={$$props.class}>
	<div class="tonbo-navigation">
		<div class="mt-[68px] relative w-full">
			<div
				class="absolute bottom-0 md:bottom-[52px] z-10 flex order-last right-[10px] bg-background-dark"
			>
				<a href="/blogs">
					<div type="button" class="nav-button">Blogs</div>
				</a>
				<a href="/about">
					<div type="button" class="nav-button">About</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo">
					<div type="button" class="nav-button-social group">
						<img src={GitHubLogo} alt="GitHub Logo" class="nav-button-icon" />
						<span class="hidden sm:block">GitHub</span>
					</div>
				</a>
				<a href="https://discord.gg/j27XVFVmJM">
					<div type="button" class="nav-button-social group">
						<img src={DiscordLogo} alt="Discord Logo" class="nav-button-icon" />
						<span class="hidden sm:block">Discord</span>
					</div>
				</a>
				<a href="https://x.com/tonboio">
					<div type="button" class="nav-button-social group">
						<img src={XLogo} alt="X Logo" class="nav-button-icon-x" />
						<span class="hidden sm:block">X</span>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div
		class="w-fit z-10 h-[45px] border-l-[1rem] border-r-[1rem] border-background-dark bg-background-dark selection:bg-background-light selection:text-background-dark relative mt-[10px]"
	>
		<a href="/"><Tonbo /></a>
	</div>
</nav>
