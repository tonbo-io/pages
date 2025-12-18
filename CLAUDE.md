# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` - Start Vite dev server with HMR at http://localhost:5173
- `npm run build` - Build optimized Cloudflare Workers bundle to `build/`
- `npm run preview` - Serve production build locally
- `npm run lint` - Run Prettier (check mode) + ESLint; keep green before pushing
- `npm run format` - Apply Prettier fixes across the repo

## Architecture

SvelteKit app deployed to Cloudflare Workers via `@sveltejs/adapter-cloudflare`.

**Key directories:**
- `src/routes/` - File-based routing using `+page.svelte`, `+layout.svelte`, `+page.server.js`
- `src/lib/components/` - Shared Svelte components (e.g., `Markdown.svelte` for rendering)
- `src/styles/` - Shared CSS; `home.css` contains design system utilities
- `static/` - Static assets served verbatim (fonts, images, favicon)

**Blog system:** Blog posts are Svelte components with embedded Markdown content. Metadata (title, date, authors, tags) is exported from `+page.server.js` files. The `Markdown.svelte` component uses `marked` library for rendering.

## Styling

Tailwind CSS with custom Tonbo theme defined in `tailwind.config.js`:
- Custom colors: `background-dark`, `background-light`, `font-light`, `tonbo-red`, `tonbo-gray`, `tonbo-orange`, `tonbo-light`
- Custom breakpoints: xs (480px), sm (640px), md (1200px), lg (1400px)
- Fonts: Iosevka Web (code, medium variants) served from `/static/fonts/`

Co-locate component-specific styles in `<style>` blocks; use `src/styles/` for shared tokens.

## Conventions

- Svelte components: PascalCase (`HeroPanel.svelte`)
- Utility modules/stores: camelCase filenames
- Commits: short, imperative style (`add careers page`, `refactor pages`)
- Run `npm run lint` and `npm run build` before pushing
