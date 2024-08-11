import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			// platformProxy: {
			// 	configPath: 'wrangler.toml',
			// 	environment: undefined,
			// 	experimentalJsonConfig: false,
			// 	persist: false
			// }
		})
	},
	preprocess: vitePreprocess()
};

export default config;
