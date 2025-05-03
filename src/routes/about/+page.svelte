<script>
	import PageHeader from '../header.svelte';

	import 'highlight.js/styles/atom-one-dark.css';
</script>

<div class="bg-[#E7F1BE] font-code">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px]lg:w-[1198px] m-auto pt-12">
			<PageHeader title="About Tonbo" />
		</div>

		<div class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-6 min-h-full m-auto">
			<div class="apply-selection">
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
						<p>
							<a href="https://x.com/yochowgwo" class="underline">@Tzu Gwo: </a>
							<a class="underline" href="mailto: tzu@tonbo.io">tzu@tonbo.io</a>
						</p>
						<p><a href="https://x.com/CreamQ" class="underline">@Cream Tang</a></p>
						<p>
							Rui-wen Cheng:
							<a class="underline" href="mailto: lizeren@tonbo.io"> chengruiwen@tonbo.io</a>
						</p>
					</div>
				</div>
				<h1 class="py-4 text-2xl border-dashed md:text-xl">Credits</h1>
				<div>
					<ul class="list-disc list-inside">
						<li>
							<a href="https://arrow.apache.org/" class="underline">Apache Arrow</a>
							/
							<a href="https://parquet.apache.org/" class="underline">Parquet</a>: open-source data
							/ file formats supports storing data to numerous storage services, it help us avoiding
							vendor lock-in.
						</li>
						<li>
							<a href="https://github.com/facebook/rocksdb" class="underline">RocksDB</a>: a
							state-of-art embedded database, RocksDB inspires Tonbo on building a high performance
							columnar database on LSM Tree.
						</li>
						<li>
							<a href="https://github.com/skyzh/mini-lsm" class="underline">mini-lsm</a>: an
							educational project implementing LSM Trees in Rust. The exploration of Rust's type
							system and efficient LSM Tree implementation in this project inspired the abstract
							type design in Tonbo.
						</li>
						<li>
							<a href="https://github.com/spacejam/sled" class="underline">sled</a>: an embedded
							database written in Rust, its API and modular project structure design impact us.
						</li>
						<li>
							<a href="https://github.com/cberner/redb" class="underline">redb</a>: an embedded
							key-value store in Rust, Tonbo built early stage benchmarks upon its cases.
						</li>
						<p class="mt-4">
							Also thanks to all of Tonbo's <a
								href="https://github.com/tonbo-io/tonbo/graphs/contributors"
								class="underline">community contributors</a
							>, their support and dedication make this project possible. And thanks to
						</p>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
