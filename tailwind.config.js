/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
	theme: {
		extend: {
			screens: {
				xs: '480px',
				sm: '640px',
				md: '1200px',
				lg: '1400px'
			},
			colors: {
				'background-dark': '#1F251A',
				'background-light': '#E4E6D9',
				'font-light': '#FFFDEC',
				'tonbo-red': '#E5673E',
				'tonbo-gray': '#6A6B54',
				'tonbo-orange': '#EBAE70',
				'tonbo-light': '#BFC4B2',
				'tonbo-colortx': '#ECEDEA'
			},
			width: {}
		},
		fontFamily: {
			code: ['Iosevka Web', 'monospace'],
			medium: ['Iosevka Web Medium', 'monospace']
		}
	},
	plugins: []
};
