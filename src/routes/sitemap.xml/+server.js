// Lists every page route, so a new blog post or page is in the sitemap
// without editing this file. Tonbo Cloud (tonbo.dev) keeps its own sitemap,
// since a sitemap may only list URLs on its own host.
const ORIGIN = 'https://tonbo.io';

// /blogs is an older duplicate of /blog's index.
const EXCLUDE = new Set(['/blogs']);

export const prerender = true;

export function GET() {
	const paths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
		.map((file) => file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/')
		.filter((path) => !EXCLUDE.has(path) && !path.includes('['))
		.sort();
	const urls = paths.map((path) => `\t<url><loc>${ORIGIN}${path}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
