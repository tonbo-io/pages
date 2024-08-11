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
	<div class="order-last flex pr-8 z-10">
		<a href="/blog/introducing-tonbo">
			<div
				type="button"
				class="border border-background-light text-font-light h-8 bg-background-dark flex items-center justify-center hover:bg-background-light hover:text-background-dark cursor-pointer relative select-none"
			>
				&nbsp;Blog&nbsp;
			</div>
		</a>
		<!-- <div
			type="button"
			class="border border-background-light text-font-light h-8 bg-background-dark flex items-center justify-center hover:bg-background-light hover:text-background-dark cursor-pointer relative select-none"
		>
			&nbsp;About&nbsp;
		</div> -->
		<a href="https://github.com/tonbo-io/tonbo">
			<div
				type="button"
				class="border border-background-light text-font-light h-8 bg-background-dark flex items-center justify-center group hover:bg-background-light hover:text-background-dark cursor-pointer relative select-none"
			>
				&nbsp;
				<img src={GitHubLogo} alt="GitHub Logo" class="w-5 group-hover:invert" />
				&nbsp;GitHub&nbsp;
			</div>
		</a>
		<a href="https://discord.com/invite/8jm9WMfX">
			<div
				type="button"
				class="border border-background-light text-font-light h-8 bg-background-dark flex items-center justify-center group hover:bg-background-light hover:text-background-dark cursor-pointer relative select-none"
			>
				&nbsp;
				<img src={DiscordLogo} alt="Discord Logo" class="w-5 group-hover:invert" />
				&nbsp;Discord&nbsp;
			</div>
		</a>
		<a href="https://x.com/tonboio">
			<div
				type="button"
				class="border border-background-light text-font-light h-8 bg-background-dark flex items-center justify-center group hover:bg-background-light hover:text-background-dark cursor-pointer relative select-none"
			>
				&nbsp;
				<img src={XLogo} alt="X Logo" class="h-4 w-auto group-hover:invert" />
				&nbsp;X&nbsp;
			</div>
		</a>
	</div>
</nav>
