---
name: Yorkie Homepage
description: Homepage and documentation for Yorkie, the open-source document store for real-time collaboration.
colors:
  orange-dark: "#f27b2f"
  orange-0: "#fc8539"
  orange-light: "#fda36a"
  yellow-0: "#fdc433"
  green-0: "#23c176"
  blue-0: "#3c9af1"
  red-0: "#f44954"
  purple-0: "#855cf9"
  gradient-orange-from: "#f96767"
  gradient-orange-to: "#ff9754"
  gradient-yellow-from: "#fe924d"
  gradient-green-from: "#d7e38b"
  gradient-blue-from: "#8decec"
  gradient-red-from: "#fc94d8"
  gradient-purple-from: "#84b5ff"
  gray-900: "#332e2b"
  gray-800: "#514c49"
  gray-700: "#6e6966"
  gray-600: "#807b78"
  gray-500: "#a6a19e"
  gray-400: "#c2bdba"
  gray-300: "#e2dedb"
  gray-200: "#efeceb"
  gray-100: "#f5f3f1"
  gray-50: "#faf8f6"
  gray-000: "#fefdfb"
typography:
  display:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "56px"
    lineHeight: "64px"
  headline:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "38px"
    lineHeight: "46px"
  title:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "24px"
    lineHeight: "32px"
  body:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    lineHeight: "24px"
  label:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    lineHeight: "22px"
  code:
    fontFamily: "RobotoMono, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace"
    fontSize: "14px"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  "8": "8px"
  "16": "16px"
  "24": "24px"
  "32": "32px"
  "40": "40px"
  "48": "48px"
  "56": "56px"
  "64": "64px"
  "72": "72px"
  "96": "96px"
components:
  button:
    backgroundColor: "{colors.gray-000}"
    textColor: "{colors.gray-600}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-hover:
    backgroundColor: "{colors.gray-100}"
  button-primary:
    backgroundColor: "{colors.orange-0}"
    textColor: "{colors.gray-000}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.orange-dark}"
  button-large:
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "11px 16px"
  card:
    backgroundColor: "{colors.gray-000}"
    rounded: "{rounded.lg}"
    padding: "24px"
  header:
    backgroundColor: "{colors.gray-000}"
    height: "64px"
---

# Design System: Yorkie Homepage

## Overview

**Creative North Star: "The Shared Canvas"**

The page is a quiet sheet of warm paper, and the people on it are the color.
Neutrals are brown-tinted grays, never pure black or white, so the surface
reads as a calm working canvas. Against it, six saturated peer hues (orange,
yellow, green, blue, red, purple) stand for the collaborators themselves:
cursors, profile stacks, selections, live edits. Color means "someone is
here", which is exactly what the product makes possible.

Orange is the one hue that also belongs to the brand. It carries the logo,
the primary call to action, and emphasis in headlines. The other five hues
appear together, as a group of peers, not as individual decoration.

The system is flat and precise: hairline borders instead of shadows, small
4px corners on controls, generous vertical spacing between sections. It
supports light and dark themes by inverting the gray scale. The site must not
read as a generic SaaS template; its identity comes from showing real
collaboration on the canvas, not from stock hero patterns.

**Key Characteristics:**

- Warm, brown-tinted neutral scale in both themes
- One brand accent (orange); five further peer hues reserved for presence
- Flat surfaces separated by 1px borders
- Pretendard for everything, Roboto Mono for code
- Live examples and code are the primary imagery

## Colors

A warm neutral canvas with one brand orange and a six-hue peer palette.

### Primary

- **Yorkie Orange** (`orange-0`): primary buttons, headline emphasis, active
  indicators, the logo. `orange-dark` is its hover and pressed state;
  `orange-light` is for tints and the dark-theme counterpart.

### Secondary

- **Peer hues** (`yellow-0`, `green-0`, `blue-0`, `red-0`, `purple-0`, plus
  orange): each represents one collaborator. Used for cursors, avatars, and
  selection outlines. The landing hero uses its own darker steps of three of
  them (see Shared Document Hero). Every hue has
  `dark`, `0`, and `light` steps and three alpha tints (24%, 32%, 40%) as CSS
  custom properties in `styles/base/_color.scss`.

### Tertiary

- **Peer gradients** (`gradient-*-from` paired with the matching `*-0` hue;
  orange runs from `gradient-orange-from` to `gradient-orange-to`): two-stop
  linear gradients defined as `$gradient_90deg_*` and `$gradient_180deg_*` in
  `styles/base/_variables.scss`. They color the primary button's hover
  animation. Use the Sass variables, not literal stops.

### Neutral

- **Paper** (`gray-000`): page and header background.
- **Soft Paper** (`gray-50`, `gray-100`): subtle fills, hover backgrounds,
  disabled surfaces.
- **Hairline** (`gray-300`, `gray-400`): borders and dividers.
- **Quiet Ink** (`gray-600`, `gray-700`): secondary text, default button text.
- **Ink** (`gray-800`, `gray-900`): headings and body text.

In dark mode (`.darkmode`) the gray scale inverts and each hue swaps its
`dark` and `light` steps. Always use the CSS custom properties, never literal
hex values, so both themes stay correct.

### Named Rules

**The Peers Rule.** The five non-orange hues mean "a collaborator". Do not
use a single one of them as a decorative accent or a status color on
marketing surfaces.

**The Warm Neutral Rule.** No pure `#000` or cool grays. Every neutral comes
from the `--gray-*` scale. The only literal white is text on a saturated
fill.

## Typography

**Display and Body Font:** Pretendard (with system sans-serif fallback),
self-hosted in weights 300, 400, 500, 600, 800.
**Code Font:** Roboto Mono 400 (with Consolas, Monaco fallback).

**Character:** One humanist sans family does all the work, so hierarchy comes
from size and weight, not from font contrast. Code is the second voice.

### Hierarchy

The scale is fixed in `styles/base/_font.scss`:

- **Hero** (96px / 108px, weight 800): the landing hero headline only. It
  scales down to 76px in narrow two-column windows and steps to 80px when
  stacked on a small laptop, 64px on tablet, 40px on mobile, and 36px below
  360px.
- **Display** (56px / 64px): page titles on the other pages.
- **Headline** (46px / 54px and 38px / 46px): section headlines.
- **Title** (30px / 38px, 24px / 32px, 20px / 28px): card and subsection
  titles.
- **Body** (16px / 24px): marketing copy and docs prose.
- **Label** (14px / 22px): buttons, navigation, captions. 12px / 16px for
  fine print.

### Named Rules

**The One Family Rule.** Do not add a second display typeface. Emphasis in a
headline is made with weight or the orange accent.

## Layout

Centered containers with a default maximum width of 1120px; wide showcase
sections extend to about 1368px, narrow text sections to 1000px. Spacing
follows an 8px base scale (8 to 96px, in `styles/base/_variables.scss`).

Breakpoints: desktop above 1023px, tablet from 640px to 1023px, mobile below
640px, with a compact adjustment below 360px. The sticky header is 64px tall
on desktop and 70px on mobile. Layout mixins (`pcStart`, `tabletStart`,
`mobileStart`, `mobileXS`) live in `styles/base/_mixins-lib.scss`; use them
instead of raw media queries.

## Elevation & Depth

Flat by default. Surfaces are separated by 1px `gray-400` borders and tonal
steps of the gray scale, not by shadows. A small shadow vocabulary exists for
floating layers only.

### Shadow Vocabulary

- **shadow_xs / shadow_s / shadow_m** (`0 8px 4px|8px|16px -8px rgb(0 0 0 / 20%)`):
  dropdowns and popovers.
- **shadow_l** (`0 20px 24px -12px rgb(0 0 0 / 20%)`): modals.

### Named Rules

**The Flat Canvas Rule.** Cards and sections at rest have a border and no
shadow. Shadows belong to layers that float above the page.

## Shapes

Small, consistent corners: 4px on buttons, inputs, tabs, and code blocks;
8px on media and panels; 16px on feature cards. Full circles are for avatars
and cursors only. Borders are 1px solid.

## Components

### Buttons

- **Shape:** gently squared (4px radius), 1px transparent border, 8px 16px
  padding, 14px / 22px label. Large size uses 11px 16px; small uses 7px 12px.
- **Default:** Paper background with Quiet Ink text; hover fills with
  `gray-100`.
- **Primary:** `orange-0` fill with Paper text; hover moves to `orange-dark`.
- **Line variant (`.btn_line`):** hue border with a 24% alpha tint of the same
  hue as background (32% on hover) and the dark step as text.
- **Disabled:** `gray-50` fill, `gray-300` text.
- **Motion:** `background-color 0.2s` only.

### Cards / Containers

- **Corner Style:** 16px radius.
- **Background:** Paper.
- **Border:** 1px `gray-400`. No shadow.
- **Internal Padding:** 24px; stacked cards are 16px apart.

### Navigation

- Sticky header, 64px, Paper background, 1px `gray-400` bottom border on
  tablet and below. Logo left, links in Label type. Collapses to a dropdown menu
  on mobile. A theme dropdown offers system, light, and dark.

### Code Blocks

- Roboto Mono on a Paper surface with a header bar (file tabs, copy button)
  and 4px corners. Highlighted lines use the 24% alpha tints of red, green,
  and yellow. Code samples are primary content on this site and
  get as much care as imagery.

### Shared Document Hero

- The landing hero is an app window (16px radius, 1px `gray-400` border, a
  56px title bar with three peer avatars) whose body is a dotted document
  holding the headline, pitch, and actions.
- Three scripted collaborators arrive once, in sequence: one drags a dashed
  selection across the orange word, one leaves a text caret at the end of the
  headline, and one points at the primary button. Each has a name tag in its
  peer color. The sequence does not loop, and under reduced motion everything
  rests in its final place.
- Peers use dark steps of blue, purple, and green with white tags on the
  light theme, and light steps with dark tags on the dark theme. The colors
  are scoped to the hero in `styles/pages/service_main_hero.scss`.

## Do's and Don'ts

### Do:

- **Do** use `var(--gray-*)` and `var(--{hue}-*)` custom properties so light
  and dark themes both work.
- **Do** keep orange for brand and primary actions, and show the other hues
  together as peers.
- **Do** let live examples, cursors, and real code carry the page.
- **Do** separate surfaces with 1px borders and spacing from the 8px scale.

### Don't:

- **Don't** make the site look like a generic SaaS template: no stock
  purple-blue gradient heroes, no repeated three-card feature rows as the
  default section pattern, no interchangeable hero with a screenshot under a
  centered headline.
- **Don't** add shadows to cards at rest.
- **Don't** introduce a second display typeface or cool gray neutrals.
- **Don't** run `npm run fetch:ui`; it overwrites `styles/` from a legacy
  source.
