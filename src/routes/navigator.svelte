<script>
	import Tonbo from './tonbo.svelte';
	import XLogo from '$lib/images/x-logo.png';
	import DiscordLogo from '$lib/images/discord-logo.png';
	import GitHubLogo from '$lib/images/github-logo.svg';
</script>

<nav class={$$props.class}>
	<div
		class="z-10 border-l-[2rem] border-r-[1rem] border-background-dark selection:bg-background-light selection:text-background-dark"
	>
		<a href="/"><Tonbo /></a>
	</div>
	<div class="z-10 flex order-last pr-8">
		<a href="/blog/introducing-tonbo">
			<div
				type="button"
				class="relative flex items-center justify-center h-8 px-2 px-4 mx-2 border cursor-pointer select-none border-background-light text-font-light bg-background-dark hover:bg-background-light hover:text-background-dark"
			>
				Blogs
			</div>
		</a>
		<a href="/about">
			<div
				type="button"
				class="relative flex items-center justify-center h-8 px-4 mx-2 border cursor-pointer select-none border-background-light text-font-light bg-background-dark hover:bg-background-light hover:text-background-dark"
			>
				About
			</div>
		</a>
		<a href="https://github.com/tonbo-io/tonbo">
			<div
				type="button"
				class="relative flex items-center justify-center h-8 px-4 mx-2 border cursor-pointer select-none border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
			>
				<img src={GitHubLogo} alt="GitHub Logo" class="w-6 mr-2 group-hover:invert" />
				GitHub
			</div>
		</a>
		<a href="https://discord.com/invite/8jm9WMfX">
			<div
				type="button"
				class="relative flex items-center justify-center h-8 px-4 mx-2 border cursor-pointer select-none border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
			>
				<img src={DiscordLogo} alt="Discord Logo" class="w-6 mr-2 group-hover:invert" />
				Discord
			</div>
		</a>
		<a href="https://x.com/tonboio">
			<div
				type="button"
				class="relative flex items-center justify-center h-8 px-4 mx-2 border cursor-pointer select-none border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
			>
				<img src={XLogo} alt="X Logo" class="w-auto h-4 mr-2 group-hover:invert" />
				X
			</div>
		</a>
	</div>
</nav>
