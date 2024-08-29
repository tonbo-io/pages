<script>
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE]">
	<div
		class="min-h-screen h-fit mt-[103px] sm:pt-10 sm:w-[800px] md:w-[1000px] lg:w-[1200px] m-auto border-x-2 border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-[798px] md:w-[998px] lg:w-[1198px] m-auto">
			<PageHeader title="About Tonbo" />
		</div>

		<div class="sm:w-[600px] md:w-[816px] px-12 py-6 min-h-full m-auto">
			<div>
				<h1
					class="py-4 my-4 text-2xl border-b-2 border-black border-dashed sm:border-b-0 md:text-xl"
				>
					About <span class="sm:hidden">Tonbo</span>
				</h1>
				<p class="mt-[16px]">
					Tonbo IO was conceived during my time in ByteDance, 2022. I have observed that existing
					data processing infrastructure often requires transferring data to centralized vendors for
					storage and analysis, limiting true data ownership. Tonbo IO addresses this challenge by
					offering an edge-first embedded database that supports data storage and analysis from
					local devices to shared storage services, all in open-source formats.
				</p>

				<div class="mt-4 sm:w-fit">
					<h1 class="py-4 text-2xl border-t-2 border-black border-dashed md:text-xl">Contacts</h1>
					<div class="pb-6 border-b-2 border-black border-dashed sm:pr-20 sm:w-content">
						<p>Tzu Gwo: guozixing@tonbo.io</p>
						<p>Zeren Li: lizeren@tonbo.io</p>
					</div>
				</div>
				<h1 class="py-4 text-2xl border-dashed md:text-xl">Credits</h1>
				<div>
					<ul class="list-disc list-inside">
						<li>
							Apache Arrow / Parquet: open-source data / file formats supports storing data to
							numerous storage services, it help us avoiding vendor lock-in.
						</li>
						<li>
							RocksDB: a state-of-art embedded database, RocksDB inspires Tonbo on building a high
							performance columnar database on LSM Tree.
						</li>
						<li>
							mini-lsm: an educational project implementing LSM Trees in Rust. The exploration of
							Rust's type system and efficient LSM Tree implementation in this project inspired the
							abstract type design in Tonbo.
						</li>
						<li>
							sled: an embedded database written in Rust, its API and modular project structure
							design impact us.
						</li>
						<li>
							redb: an embedded key-value store in Rust, Tonbo built early stage benchmarks upon its
							cases.
						</li>
						<p>
							Also thanks to all of Tonbo's community contributors, their support and dedication
							make this project possible. And thanks to @Cream Tang, who designed the web and the
							logo.
						</p>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- <div
		class="m-auto h-[4rem] flex items-center justify-center text-center text-background-dark border-dashed border-background-dark mt-[6rem] mx-4 border-t-2 w-[1200px] sm:w-[800px] md:w-[1000px] lg:w-[1200px]"
	>
		© Copyright 2024-, Tonbo IO.
	</div> -->

	<div
		class="m-auto h-[4rem] border-t-2 w-[480px] sm:w-[800px] md:w-[1000px] lg:w-[1200px] text-center flex items-center justify-center border-dashed border-background-dark mt-60"
	>
		© Copyright 2024-, Tonbo IO.
	</div>
</div>
