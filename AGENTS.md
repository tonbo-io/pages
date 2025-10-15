# Repository Guidelines

## Project Structure & Module Organization
Tonbo IO is a SvelteKit app targeted for Cloudflare Workers. Core entrypoints live in `src/routes` using the SvelteKit `+page.svelte/+layout.svelte` convention for routing. Shared UI and utilities live in `src/lib`, while cross-cutting styles and Tailwind layers sit in `src/styles`. Static assets (favicons, fonts, sitemap) belong in `static/` and are served verbatim. The compiled output from `npm run build` is written to `build/`; commit only artifacts explicitly requested for deployment.

## Build, Test, and Development Commands
- `npm run dev`: Launches the Vite dev server with hot module reload at `http://localhost:5173`.
- `npm run build`: Produces an optimized Cloudflare-ready bundle in `build/`.
- `npm run preview`: Serves the production build locally for smoke testing.
- `npm run lint`: Runs Prettier in check mode followed by ESLint (Svelte + JS rules); keep this green before pushing.
- `npm run format`: Applies Prettier fixes across the repo; use after large content edits.

## Coding Style & Naming Conventions
Use Prettier defaults (two-space indent, 80-column wraps) and run `npm run format` to normalize. Svelte components are PascalCase (`HeroPanel.svelte`), utility modules and stores use `camelCase` filenames, and Tailwind classes rely on the custom theme defined in `tailwind.config.js`. Co-locate component-specific styles in `<style>` blocks; reserve `src/styles` for shared tokens. Avoid committing generated `.svelte-kit` artifacts.

## Testing Guidelines
Automated tests are not yet wired in; rely on `npm run lint` plus manual verification of affected routes. When adding tests, colocate them near their modules (`Component.test.ts`) and consider introducing `vitest` + `@testing-library/svelte` for UI coverage. Document any new test commands in `package.json` and include fixtures under `static/` if needed.

## Commit & Pull Request Guidelines
Follow the existing short, imperative commit style (`add careers page`, `refactor pages`). Group related changes per commit and reference issues with `#123` when applicable. PRs should include: a concise summary of the change, screenshots or clips for UI-facing updates, reproduction steps for bug fixes, and notes on any configuration updates. Run `npm run lint` and `npm run build` before requesting review.

## Security & Configuration Tips
The project targets Cloudflare Workers via `@sveltejs/adapter-cloudflare`; confirm `wrangler.toml` settings in any deployment-focused PR. Store secrets in environment variables rather than committing `.env` files, and scrub API keys from demo content before publishing.
