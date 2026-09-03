<script>
	import PageHeader from '../header.svelte';
</script>

<svelte:head>
	<title>Security &amp; Abuse · Tonbo</title>
	<meta
		name="description"
		content="How to report security vulnerabilities and abuse involving Tonbo services."
	/>
</svelte:head>

<div class="min-h-screen bg-background-light text-black font-code">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px] lg:w-[1198px] m-auto pt-12">
			<PageHeader
				title="Security & Abuse"
				subtitle="Report vulnerabilities or misuse involving Tonbo-operated domains and services."
			/>
		</div>

		<main class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-10 m-auto">
			<article class="apply-selection security-contact">
				<h1>Security and abuse contact</h1>
				<p>
					Tonbo IO Inc. operates <a href="https://tonbo.io">tonbo.io</a>, tonbo.sh, and Tonbo-hosted
					subdomains.
				</p>

				<h2>Report abuse</h2>
				<p>
					Report suspected phishing, malware, credential theft, spam, unauthorized access, or other
					misuse to <a href="mailto:contact@tonbo.io">contact@tonbo.io</a>.
				</p>
				<p>
					Include the affected hostname or URL, the time observed, a description of the issue, and
					any evidence that can be shared safely. Do not send passwords, private keys, or other live
					credentials.
				</p>

				<h2>Report a vulnerability</h2>
				<p>
					Send security vulnerabilities affecting Tonbo software or services to
					<a href="mailto:contact@tonbo.io">contact@tonbo.io</a>. Please provide enough detail to
					reproduce and assess the issue, and avoid accessing or modifying data that does not belong
					to you.
				</p>
			</article>
		</main>
	</div>
</div>

<style>
	.security-contact h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.security-contact h2 {
		border-top: 1px dashed black;
		font-size: 1.25rem;
		margin-top: 2rem;
		padding-top: 1rem;
	}

	.security-contact p {
		line-height: 1.7;
		margin-top: 1rem;
	}

	.security-contact a {
		text-decoration: underline;
	}
</style>
