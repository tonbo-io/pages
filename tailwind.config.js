/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '1200px',
        'lg': '1400px',
      },
      colors: {
        "background-dark": "#222623",
        "background-light": "#E7F1BE",
        "font-light": "#FFFDEC",
        "tonbo-red": "#EF6A21",
        "tonbo-gray": "#6A6B54",
        "tonbo-orange": "#EBAE70",
      },
      width: {
      }
    },
    fontFamily: {
      code: ["Iosevka Web", "monospace"],
      medium: ["Iosevka Web Medium", "monospace"],
    },
  },
  plugins: [],
}
