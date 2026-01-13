# Ken Cross Blog - SvelteKit Migration

This project is a migration of the original Gatsby blog to [SvelteKit](https://kit.svelte.dev/), modernized with the [Bun](https://bun.sh) runtime.

## 🚀 Technology Stack

- **Framework**: SvelteKit (Svelte 5)
- **Runtime & Manager**: [Bun](https://bun.sh)
- **Content**: Markdown/MDX via [mdsvex](https://mdsvex.pngwn.io/)
- **Styling**: Native CSS Variables (ported from Emotion/CSS-in-JS)
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
- **Math/LaTeX**: Complex LaTeX blocks in `spo2.md` and `tools.md` caused issues with the Svelte compiler and have been commented out or simplified.

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

### Running Tests

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

Run all tests:

```bash
bun run playwright test
```

Run tests in UI mode:

```bash
bun run playwright test --ui
```

### Local Preview

Preview the production build locally:

```bash
bun run preview
```

## 🚀 Deployment

The project is configured for **GitHub Pages**.

1. Run `bun run build`.
2. Push the contents of the `build/` folder to your `gh-pages` branch.

Alternatively, configure GitHub Actions to checkout the repo, run `bun install && bun run build`, and deploy the `build` folder.
