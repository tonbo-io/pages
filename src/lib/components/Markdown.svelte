<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let content = '';

	let htmlContent = '';

	onMount(() => {
		// Configure marked options
		marked.setOptions({
			gfm: true, // GitHub Flavored Markdown
			breaks: true, // Convert line breaks to <br>
			sanitize: false // Allow HTML in markdown
		});

		// Convert markdown to HTML
		htmlContent = marked(content);
	});
</script>

<div class="blog-content">
	{@html htmlContent}
</div>
