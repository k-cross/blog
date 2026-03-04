# Ken Cross Blog - SvelteKit Migration

This project is a migration of the original Gatsby blog to [SvelteKit](https://kit.svelte.dev/), modernized with the [Bun](https://bun.sh) runtime.

## 🚀 Technology Stack

- **Framework**: SvelteKit (Svelte 5)
- **Runtime & Manager**: [Bun](https://bun.sh)
- **Content**: Markdown/MDX via [mdsvex](https://mdsvex.pngwn.io/) with `rehype-katex` for Math
- **Styling**: Native CSS Variables (ported from Emotion/CSS-in-JS)
- **Tooling**: [Biome](https://biomejs.dev/) for fast linting/formatting
- **Testing**: [Playwright](https://playwright.dev/) for Visual, E2E, and A11y tests
- **Deployment**: Static Site Generation via `@sveltejs/adapter-static` (GitHub Pages compatible)

## 🛠 Project Structure

- `src/lib/content`: Contains all blog posts (Markdown).
- `src/lib/components`: Ported Svelte components (Header, Footer, PostCard, etc.).
- `src/routes`: File-based routing.
  - `+layout.svelte`: Main site layout (Header/Footer wrapper).
  - `+page.svelte`: Homepage.
  - `[slug]/+page.svelte`: Individual blog posts.
  - `tags/[tag]/+page.svelte`: Tag archive pages.
  - `rss.xml/+server.ts`: Dynamic RSS feed generation.

## 📦 Migration Notes

### Content Handling

- **Markdown**: Posts were migrated from the Gatsby `src/content` directory.
- **Embeds**: External scripts (Twitter, BlueSky) were consolidated into the `<svelte:head>` of the blog post layout to avoid duplicate script execution and hydration errors.
- **Math/LaTeX**: Native LaTeX support is enabled via `rehype-katex`.
- **Data Visualizations**: Complex charts are rendered using generic D3 Svelte wrapper components (e.g. `src/lib/components/charts`) embedded directly inside `.md` fronts via mdsvex.

### Styling

- The original Emotion (CSS-in-JS) styles were converted to standard CSS in `src/app.css` and scoped `<style>` blocks within Svelte components.
- Dark/Light mode tokens are preserved in CSS variables.

## 💻 Usage

### Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or later)

### Installation

```bash
bun install
```

### Local Development

Start the development server:

```bash
bun run dev
```

### Building for Production

Generate the static site in the `build/` directory:

```bash
bun run build
```

### Code Quality & Testing

This project uses [Biome](https://biomejs.dev/) for lightning-fast linting and formatting, and [Playwright](https://playwright.dev/) for continuous integration checks.

**Lint & Format:**
```bash
bun run check:all
```

**Testing Strategy:**
The test suite is automated via Playwright to ensure regression-free deployments:
- **E2E / Routing (`tests/links.spec.ts`)**: Validates internal linking, ensuring no broken links to tags or markdown pages exist across the blog roll.
- **Styling (`tests/styling.spec.ts`)**: Assertions to guarantee Light/Dark CSS theme variables apply correctly to markdown UI components and code syntax highlighting.
- **Accessibility (`tests/a11y.spec.ts`)**: Automated WCAG 2.1 AA audits across dynamic pages using `@axe-core/playwright`.

**Run test suite:**
```bash
bunx playwright test
```

### Local Preview

Preview the production build locally:

```bash
bun run preview
```

## 🚀 Deployment

The project is configured for **GitHub Pages**. 

During the SvelteKit static build (`bun run build`), an empty `.nojekyll` file requires to be present in the `static/` directory to bypass GitHub's default Jekyll asset processing, allowing SvelteKit's bundled `_app` folder to be correctly routed.

To deploy manually:
1. Run `bun run build`.
2. Push the contents of the `build/` folder to your `gh-pages` branch.
