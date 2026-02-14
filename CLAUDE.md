# Yorkie Documentation Site

Official documentation website for Yorkie (yorkie.dev). Built with Next.js and MDX for content authoring.

## Tech Stack

- Next.js 13, React 18, TypeScript, Sass
- MDX (next-mdx-remote) with remark/rehype plugins
- Prism (syntax highlighting), Mermaid (diagrams), Framer Motion
- ESLint (next/core-web-vitals), Prettier

## Development Commands

```sh
npm install            # Install dependencies
npm run dev            # Start Next.js dev server
npm run build          # Build site + generate sitemap
npm run build:full     # Full build (fetch examples + build examples + build site)
npm run export         # Static export for deployment
npm run lint           # Run ESLint
npm run fetch:examples # Fetch examples from JS, iOS, Android SDKs
npm run build:examples # Build JS SDK examples
npm run fetch:ui       # Fetch shared UI styles
```

## Project Structure

```
docs/                   # MDX documentation files (39 pages)
  index.mdx             # Landing page (order: 10)
  getting-started/      # Quick start guides (orders: 20-29)
  sdks/                 # SDK references (orders: 30-39)
  self-hosted-server/   # Self-hosting guides (orders: 50-59)
  advanced/             # Advanced topics (orders: 110-119)
  internals/            # CRDT internals (orders: 120-129)
  tools/                # CLI, admin API, devtools (orders: 140-149)
pages/                  # Next.js route pages
  docs/[[...slug]].tsx  # Dynamic MDX page renderer
components/             # React components (Layout, Navigator, CodeBlock, etc.)
  docs/                 # Doc-specific components (Breadcrumb, Alert, EditThisPage)
utils/
  mdxUtils.ts           # Navigation generation, slug handling, frontmatter parsing
  rehypeVariables.ts    # Template variable replacement
  rehypeImageMeta.ts    # Image metadata extraction
  rehypeWrapContents.ts # Content wrapper for styling
hooks/                  # Custom React hooks
styles/                 # SCSS stylesheets
scripts/                # Example fetch/build scripts
examples/               # Built example applications (28 examples)
public/                 # Static assets (images, fonts, icons)
```

## MDX Conventions

**Frontmatter fields:**
```yaml
---
title: 'Page Title'    # Required: display name
order: 10              # Required for navigation: determines position
phase: development     # Optional: 'development' pages hidden in production
---
```

**Navigation ordering:**
- `order % 10 === 0` -> main navigation group
- Other orders -> submenu items under the preceding main group

**Template variables** (replaced at build time):
- `{{YORKIE_VERSION}}`, `{{YORKIE_JS_VERSION}}`, `{{YORKIE_IOS_VERSION}}`, `{{YORKIE_ANDROID_VERSION}}`
- `{{API_ADDR}}`, `{{API_HOST}}`, `{{API_PORT}}`, `{{DASHBOARD_PATH}}`

**Custom MDX components available:**
- `<Alert>`, `<Breadcrumb>`, `<Caption>`, `<ImageWrap>`
- `<CodeBlock>`, `<CodeBlockHeader>`, `<Mermaid>`
- `<Button>`, `<Icon>`

## Code Conventions

- Prettier: 120 chars, single quotes, trailing commas, 2-space indent
- ESLint: next/core-web-vitals
- Path alias: `@/` maps to project root
- Environment variables: `NEXT_PUBLIC_` prefix for client-side access
- Commit messages: subject max 70 chars, body at 80 chars

## Architecture Notes

- **Static generation**: All docs pages are statically generated via `getStaticPaths`/`getStaticProps`
- **MDX pipeline**: gray-matter (frontmatter) -> remark-gfm -> rehype plugins -> MDXRemote
- **Navigation**: Auto-generated from MDX frontmatter metadata in `utils/mdxUtils.ts`
- **Examples**: Fetched from SDK repos via scripts, built and served alongside docs
- **Deployment**: GitHub Pages via GitHub Actions on push to main
