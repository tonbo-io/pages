<script>
	import PageHeader from '../header.svelte';
</script>

<svelte:head>
	<title>Privacy Policy · Tonbo</title>
	<meta
		name="description"
		content="How Tonbo collects, uses, stores, and protects personal information."
	/>
</svelte:head>

<div class="min-h-screen bg-background-light text-black font-code">
	<div
		class="min-h-screen h-fit sm:w-full md:w-[1000px] lg:w-[1200px] m-auto md:border-x-2 md:border-b-2 border-black"
	>
		<div class="hidden sm:flex sm:w-full md:w-[998px] lg:w-[1198px] m-auto pt-12">
			<PageHeader
				title="Privacy Policy"
				subtitle="How Tonbo handles personal information when you use our websites and services."
			/>
		</div>

		<main class="px-4 xs:px-10 sm:w-[600px] md:w-[800px] sm:px-0 py-10 m-auto">
			<article class="apply-selection privacy-policy">
				<h1>Tonbo Privacy Policy</h1>
				<p><strong>Effective date:</strong> August 18, 2026</p>

				<p>
					This Privacy Policy explains how Tonbo IO Inc. ("Tonbo," "we," "us," or "our") collects,
					uses, stores, and shares personal information when you visit
					<a href="https://tonbo.io">tonbo.io</a> or use Tonbo services.
				</p>

				<h2>Information we collect</h2>
				<ul>
					<li>
						<strong>Account information.</strong> When you sign in with Google or GitHub, we receive
						basic profile information authorized by you, such as your name, email address, profile image,
						provider account identifier, and authentication status.
					</li>
					<li>
						<strong>Service and billing information.</strong> We process project configuration, API credentials,
						service usage, prepaid credit activity, and transaction records needed to operate and bill
						for Tonbo services. Payment-card details are handled by our payment processor and are not
						stored by Tonbo.
					</li>
					<li>
						<strong>Technical information.</strong> We may collect IP address, browser and device information,
						request metadata, security events, diagnostics, and service logs.
					</li>
					<li>
						<strong>Communications.</strong> We collect information you send when you contact us for
						support or otherwise communicate with Tonbo.
					</li>
				</ul>

				<h2>Google user data</h2>
				<p>
					Tonbo requests only the Google scopes needed for sign-in: OpenID, email, and basic
					profile. We use this information to authenticate you, create and secure your Tonbo
					account, display your account identity, and provide account support. Tonbo does not
					request access to your Google Drive files, contacts, calendar, or Gmail content.
				</p>
				<p>
					We do not sell Google user data or use it for advertising. We do not transfer it to third
					parties except to provide or secure Tonbo, comply with law, or complete an action you
					request. Tonbo's use and transfer of information received from Google APIs follows the
					<a href="https://developers.google.com/terms/api-services-user-data-policy"
						>Google API Services User Data Policy</a
					>, including its Limited Use requirements.
				</p>

				<h2>How we use information</h2>
				<ul>
					<li>Provide, maintain, and improve Tonbo services.</li>
					<li>Authenticate users and protect accounts and infrastructure.</li>
					<li>Measure usage, administer prepaid credit, and process payments.</li>
					<li>Respond to support requests and send service-related communications.</li>
					<li>Detect abuse, investigate incidents, and comply with legal obligations.</li>
				</ul>

				<h2>How we share information</h2>
				<p>
					We share information only with service providers that help us operate Tonbo, such as cloud
					infrastructure, authentication, security, observability, and payment providers. These
					currently include Amazon Web Services, Cloudflare, Supabase, Stripe, Google, and GitHub,
					depending on the feature you use. We may also disclose information when required by law,
					to protect rights and safety, or as part of a corporate transaction. We do not sell
					personal information.
				</p>

				<h2>Retention and deletion</h2>
				<p>
					We retain personal information for as long as needed to provide Tonbo, meet legal and
					accounting obligations, resolve disputes, and protect the service. You may request account
					deletion by contacting us. We may retain limited records where required by law or for
					legitimate security and fraud-prevention purposes.
				</p>

				<h2>Security and international processing</h2>
				<p>
					We use administrative, technical, and organizational safeguards designed to protect
					personal information. No system is completely secure. Tonbo and its service providers may
					process information in the United States and other countries where they operate.
				</p>

				<h2>Your choices</h2>
				<p>
					You can review and update supported account information in Tonbo User Center. You can
					revoke Tonbo's Google access from your Google Account and disconnect supported identities
					from Tonbo. Depending on where you live, you may have additional rights to access,
					correct, delete, or restrict the use of your personal information.
				</p>

				<h2>Children</h2>
				<p>
					Tonbo is not directed to children under 13, and we do not knowingly collect their personal
					information.
				</p>

				<h2>Changes to this policy</h2>
				<p>
					We may update this policy as Tonbo changes. We will publish the revised policy here and
					update its effective date.
				</p>

				<h2>Contact</h2>
				<p>
					Questions or privacy requests may be sent to
					<a href="mailto:contact@tonbo.io">contact@tonbo.io</a>.
				</p>
			</article>
		</main>
	</div>
</div>

<style>
	.privacy-policy h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.privacy-policy h2 {
		border-top: 1px dashed black;
		font-size: 1.25rem;
		margin-top: 2rem;
		padding-top: 1rem;
	}

	.privacy-policy p,
	.privacy-policy ul {
		line-height: 1.7;
		margin-top: 1rem;
	}

	.privacy-policy ul {
		list-style: disc;
		padding-left: 1.5rem;
	}

	.privacy-policy li + li {
		margin-top: 0.75rem;
	}

	.privacy-policy a {
		text-decoration: underline;
	}
</style>
