# Task 1 — Landing Page: Attack on Titan

A fan-tribute landing page for *Attack on Titan* (Shingeki no Kyojin), built as **Task 1, Level 1** of the OIBSIP Web Development & Designing track.

## Overview

A single-page, static site introducing the anime's story, its four broadcast seasons, and its main cast — built with plain HTML, CSS, and vanilla JavaScript, no frameworks or build tools required.

## Features

- **Fixed navigation bar** with 4 working links (Home, The Journey, Seasons, Characters), collapsing into a hamburger menu on mobile
- **Hero section** with headline, subheadline, series synopsis, and a call-to-action button
- **The Journey** — 4 story-arc cards summarising the series' major plot beats
- **The Seasons** — click-to-reveal cards for all 4 seasons (S1–S4), each with its own key art and a teaser paragraph that expands on click, with a distinct colour tint per season
- **Characters** — a grid of 12 character cards (11 required + Ymir Fritz as a bonus), each with a photo, role, and a short quote
- **Footer** with placeholder social/contact links
- Fully responsive layout (tested down to mobile widths, no horizontal overflow or element overlap)
- Single, consistent dark navy/gold colour palette across every section

## Tech stack

- HTML5
- CSS3 (custom properties, Flexbox, CSS Grid, no framework)
- Vanilla JavaScript (mobile nav toggle, click-to-reveal season cards)
- [Remix Icon](https://remixicon.com/) for icons (via CDN)

## Project structure

```
WebDev-L1-LandingPage/
├── index.html
├── styles.css
├── main.js
└── assets/
    ├── header.png              # hero banner art
    ├── s1.jpg, s2.png, s3.jpg, s4.jpg   # season key art
    ├── eren.jpg, mikasa.jpg, armin.jpg, levi.jpg,
    │   erwin.jpg, hange.jpg, reiner.jpg, annie.jpg,
    │   jean.jpg, flock.jpg, zeke.jpg, ymir.jpg     # character portraits
    └── logo-white.png, logo-black.png  (unused — replaced with a text wordmark)
```

## Design notes

- **Colour palette:** deep navy (`#10141c`) background throughout, with a gold accent (`#daa520`) for headings, links, and interactive states — kept to a single background colour across nav, hero, and every section to avoid the jarring light/dark split the page had in an earlier draft.
- **Season cards:** each poster has a colour-matched gradient tint layered over its key art (`#1`–`#4` accent per season) so the four images read as one cohesive set even though the source art varies a lot in tone.
- **Logo:** the nav uses a simple gold text wordmark rather than an image, so it stays legible against the dark background at every screen size.

## How to run

No build step — clone the repo and open `index.html` directly in a browser, or serve it locally:

```bash
cd WebDev-L1-LandingPage
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Possible improvements

- Add keyboard support for the season cards (Enter/Space to expand, matching the existing `aria-expanded` attributes)
- Lazy-load character and season images to reduce initial page weight
- Add a dedicated attribution section crediting original art sources
- Animate the season card expand/collapse with a slight easing curve instead of a hard max-height cutoff

## Disclaimer

Fan-made project for educational purposes only. Not affiliated with Kodansha, MAPPA, or the *Attack on Titan* franchise.
