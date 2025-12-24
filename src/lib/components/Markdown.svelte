<script>
	import { marked } from 'marked';

	export let content = '';

	// Configure marked options
	marked.setOptions({
		gfm: true, // GitHub Flavored Markdown
		breaks: true // Convert line breaks to <br>
	});

	// Convert markdown to HTML at initialization (works on both server and client)
	$: htmlContent = marked(content);
</script>

<div class="blog-content">
	{@html htmlContent}
</div>
