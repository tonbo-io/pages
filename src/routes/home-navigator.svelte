<script>
	import Tonbo from './tonbo.svelte';
	import XLogo from '$lib/images/x-logo.png';
	import DiscordLogo from '$lib/images/discord-logo.png';
	import GitHubLogo from '$lib/images/github-logo.svg';
</script>

<nav class={$$props.class}>
	<div
		class="absolute w-[calc(100%-2rem)] xs:w-[calc(100%-5rem)] sm:w-[600px] md:w-[1000px] lg:w-[1200px] border-2 md:border-b-0 border-[#e7f1be] left-1/2 transform -translate-x-1/2 top-[55px] md:bottom-0"
	>
		<div class="text-[#E7F1BE] md:hidden mt-[40px] mx-6">
			Tonbo incurs minimal cost to insert and scan structured data via Apache Arrow.
		</div>
		<div class="mt-[36px] relative w-full">
			<div
				class="absolute bottom-[-17px] md:bottom-[20px] z-10 flex order-last right-[10px] bg-background-dark"
			>
				<a href="/blogs">
					<div
						type="button"
						class="relative flex items-center justify-center h-8 px-1.5 mx-1 border cursor-pointer select-none sm:px-4 border-background-light text-font-light bg-background-dark hover:bg-background-light hover:text-background-dark"
					>
						Blogs
					</div>
				</a>
				<a href="/about">
					<div
						type="button"
						class="relative flex items-center justify-center h-8 px-1.5 mx-1 border cursor-pointer select-none sm:px-4 border-background-light text-font-light bg-background-dark hover:bg-background-light hover:text-background-dark"
					>
						About
					</div>
				</a>
				<a href="https://github.com/tonbo-io/tonbo">
					<div
						type="button"
						class="relative flex items-center justify-center h-8 px-2 mx-1 border cursor-pointer select-none sm:px-4 border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
					>
						<img
							src={GitHubLogo}
							alt="GitHub Logo"
							class="max-w-[26px] sm:w-8 sm:mr-2 group-hover:invert"
						/>
						<span class="hidden sm:block">GitHub</span>
					</div>
				</a>
				<a href="https://discord.com/invite/8jm9WMfX">
					<div
						type="button"
						class="relative flex items-center justify-center h-8 px-2 mx-1 border cursor-pointer select-none sm:px-4 border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
					>
						<img
							src={DiscordLogo}
							alt="Discord Logo"
							class="max-w-[26px] sm:w-8 sm:mr-2 group-hover:invert"
						/>
						<span class="hidden sm:block">Discord</span>
					</div>
				</a>
				<a href="https://x.com/tonboio">
					<div
						type="button"
						class="relative flex items-center justify-center h-8 px-2 mx-1 border cursor-pointer select-none sm:px-4 border-background-light text-font-light bg-background-dark group hover:bg-background-light hover:text-background-dark"
					>
						<img src={XLogo} alt="X Logo" class="max-w-[20px] sm:w-8 sm:mr-2 group-hover:invert" />
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
