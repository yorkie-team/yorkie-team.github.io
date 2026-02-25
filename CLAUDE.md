# Yorkie Documentation Site

Official docs at yorkie.dev. Next.js 13 + MDX for content authoring.

## Development Commands

```sh
npm install            # Install dependencies
npm run dev            # Start Next.js dev server
npm run build          # Build site + generate sitemap
npm run build:full     # Full build (fetch examples + build examples + build site)
npm run lint           # Run ESLint
npm run fetch:examples # Fetch examples from JS, iOS, Android SDKs
```

## After Making Changes

Always run before submitting:
```sh
npm run lint && npm run build
```

## MDX Conventions

Docs live in `docs/` as MDX files. Frontmatter fields:
- `title` (required), `order` (required for nav), `phase: development` (hides page in prod)
- Navigation: `order % 10 === 0` = main group, others = submenu items

Template variables replaced at build time:
- `{{YORKIE_VERSION}}`, `{{YORKIE_JS_VERSION}}`, `{{YORKIE_IOS_VERSION}}`, `{{YORKIE_ANDROID_VERSION}}`
- `{{API_ADDR}}`, `{{API_HOST}}`, `{{API_PORT}}`, `{{DASHBOARD_PATH}}`

Custom components: `<Alert>`, `<Breadcrumb>`, `<Caption>`, `<ImageWrap>`, `<CodeBlock>`, `<Mermaid>`

## Gotchas

- Navigation is auto-generated from MDX frontmatter — `order` field determines position
- Prettier: 120 chars, single quotes, trailing commas, 2-space indent
- Path alias: `@/` maps to project root
- Examples are fetched from SDK repos via scripts and built alongside docs
- Static generation: all docs pages use `getStaticPaths`/`getStaticProps`
- Deployment is via GitHub Pages on push to main
