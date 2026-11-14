# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary visitor is a product developer (frontend or full-stack) who wants
to add collaboration to an app they already have: co-editing, presence,
cursors, live selection. They care about the result and the time it takes to
get there, not about CRDT theory. They usually arrive while evaluating
options and decide quickly whether Yorkie is worth an afternoon of trying.

Secondary audiences, not the ones the site is optimized for: engineers
comparing sync engines in depth, teams evaluating self-hosting, and
open-source contributors.

## Product Purpose

yorkie.dev is the homepage and documentation site for Yorkie, an open-source
document store for building real-time collaborative applications. The site
explains what Yorkie is, shows it working through live examples, and teaches
developers how to integrate it.

Success means a visitor does one or more of the following:

1. Follows the docs and gets an SDK syncing a document in their own app.
2. Signs up for Yorkie Cloud and uses the Dashboard.
3. Stars the GitHub repository or joins the Discord community.

## Positioning

CRDT libraries such as Yjs and Automerge provide data structures only. Yorkie
is the full stack: client SDKs, a server, persistence, and management tools,
available as a managed cloud service or as a self-hosted open-source
deployment. Developers build features instead of collaboration
infrastructure.

## Operating Context

- Visitors move between three areas: the landing and product pages, the docs
  (`/docs`), and the examples (`/examples`), then leave for the Dashboard,
  GitHub, or Discord.
- Docs are MDX files under `docs/`; navigation is generated from frontmatter.
- Example apps are fetched from the JS, iOS, and Android SDK repositories and
  built into the site, so examples run live in the page.
- The site is statically generated and deployed to GitHub Pages on merge to
  `main`.

## Capabilities and Constraints

- Yorkie provides JSON-like Documents based on CRDTs, Presence, Channels
  (memory-only presence and broadcast), and offline support with automatic
  sync.
- SDKs: JavaScript, React, Android, iOS, plus a ProseMirror binding.
- Tools: Dashboard, CLI, Admin API, Auth Webhook.
- Deployment options: Yorkie Cloud (managed) or self-hosted server.
- Stack: Next.js 13 (pages router), React 18, SCSS, MDX.
- Styles under `styles/` are edited directly in this repository, which is the
  source of truth for the site's styles. The legacy `npm run fetch:ui` flow
  that pulls from the private `yorkie-ui-old` repository is no longer used
  for design changes; running it would overwrite local edits.
- Terminology to keep consistent: Document, Presence, Channel, Client,
  Project, Dashboard.

## Brand Commitments

- Name: Yorkie. Existing logo and icon assets live in `components/Icons` and
  `public/`.
- The site supports light and dark themes.

## Evidence on Hand

- Live, runnable example apps under `examples/` (web, iOS, Android), with
  thumbnails and demo media under `public/assets/images/examples`: TodoMVC,
  Kanban, scheduler, simultaneous cursors, profile stack, CodeMirror,
  ProseMirror, Quill, tldraw, React Flow, and others.
- Interactive code samples on the landing and product pages.
- Full documentation, including internals and a glossary.
- Not on hand: customer logos, testimonials, usage numbers, or benchmarks.
  Do not fabricate them.

## Product Principles

1. Show collaboration working before explaining it. Live examples are the
   strongest proof the site has.
2. Shorten the path to a first synced document. Every page should make the
   next step toward integration obvious.
3. Speak to the developer adding a feature, not to the CRDT researcher. Depth
   belongs in the docs, one click away.
4. Stay honest. Claims are limited to what the product and the examples
   demonstrate.
5. Cloud and self-hosted are both first-class; never hide the open-source
   path behind the sign-up path.
