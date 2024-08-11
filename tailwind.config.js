/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
  theme: {
    extend: {
      colors: {
        "background-dark": "#222623",
        "background-light": "#E7F1BE",
        "font-light": "#FFFDEC",
        "tonbo-red": "#EF6A21",
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
