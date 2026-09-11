# Task 2 — Personal Portfolio

A personal portfolio site for Samson Desmond Osagyefo, built as **Task 2, Level 1** of the OIBSIP Web Development & Designing track.

## Overview

Rather than a generic dev-portfolio template, the design is built around what actually makes this profile distinct: directing AI coding agents (Claude, Cursor, ChatGPT) through the full build cycle instead of writing every line by hand. That idea drives an **engineering-blueprint / schematic** visual theme — technical drawing linework, bracketed "spec sheet" panels, and a literal pipeline diagram in the hero showing `Human intent → AI agent → Shipped system`.

## Sections

- **Hero** — name, role, location, a short pitch, and the human/AI/system pipeline diagram
- **About** — a short bio grounded in the actual CV/resume content
- **Skills** — grouped into 4 panels: AI-native engineering, Web & programming, Backend & cloud, Tools & workflow
- **Projects** — 3 cards: Project Athena (local-first AI orchestration hub), Nexus Mart (modular e-commerce refactor), and CodeAlpha data automation tooling
- **Experience** — a connector-line timeline covering the CodeAlpha internship, Nexus Mart, and Melcom Limited
- **Contact** — email, phone, LinkedIn, and GitHub, plus a direct "Email me" call-to-action

## Tech stack

- HTML5
- CSS3 (custom properties, Flexbox, CSS Grid)
- Vanilla JavaScript (mobile nav toggle)
- Google Fonts: Space Grotesk (headings), IBM Plex Sans (body), IBM Plex Mono (reserved for the pipeline diagram labels only)

## Project structure

```
WebDev-L1-PersonalPortfolio/
├── index.html
├── styles.css
├── main.js
└── assets/
    └── samson-portrait.png
```

## Design notes

- **Colour palette:** blueprint indigo (`#0f2438`) background, panel blue (`#16334f`), gold accent (`#f0a202`) — a quiet nod to Accra/Ghana — and a muted sage green (`#3f8a63`) for technology tags.
- **Layout:** sharp-cornered panels with corner-bracket marks (like technical drawing crop marks) instead of the usual rounded SaaS card style, to stay visually consistent with the blueprint concept.
- **Typography:** monospace type is used only where it has a real job to do (the pipeline diagram), not as decorative labelling.

## Known placeholder

The GitHub link in the Contact section is a placeholder (`github.com — add your handle`) — the source resume didn't include a specific GitHub username. Update the `href` in `index.html` once available.

## How to run

```bash
cd WebDev-L1-PersonalPortfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Possible improvements

- Wire up the real GitHub profile link
- Add live links/screenshots for each project once repositories are public
- Add a light/dark theme toggle
- Replace the `mailto:` contact button with a working contact form (e.g. Formspree) for a smoother mobile experience
