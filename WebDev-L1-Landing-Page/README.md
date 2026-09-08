# Attack on Titan Landing Page

A responsive, fan-made **Attack on Titan** landing page created as part of a web development project. The page presents the world of *Shingeki no Kyojin* through a dramatic hero section, story arcs, interactive season cards, character profiles, and a themed footer.

> This is an educational, fan-made project and is not affiliated with the official Attack on Titan production team or rights holders.

## Features

- Fixed responsive navigation header
- Top-left theme-aware logo branding
- Top-right light/dark theme control and menu toggle
- Dropdown navigation with:
  - Home
  - Contact Us
  - Portfolio
  - Services
- Hero section with:
  - Attack on Titan headline and supporting copy
  - `assets/side.jpg` hero artwork
  - Call-to-action link to the Seasons section
- Journey/story arc cards
- Interactive season cards with click-to-reveal descriptions
- Character profile cards with images, roles, and quotes
- Responsive CSS Grid and Flexbox layouts
- Keyboard-friendly controls and focus states
- Escape-key support for closing the navigation menu
- Reduced-motion support for users who prefer less animation

## Languages and Technologies Used

### HTML5

HTML provides the structure and semantic content of the page, including:

- Navigation and menu controls
- Hero/header content
- Journey, Seasons, and Characters sections
- Footer and social/contact placeholders
- Accessibility attributes such as `aria-label`, `aria-expanded`, `aria-controls`, and `aria-hidden`

### CSS3

CSS controls the visual design and responsive layout. The project uses:

- CSS custom properties for reusable colours and design values
- Flexbox for navigation controls and card alignment
- CSS Grid for the hero, journey, seasons, and character layouts
- Media queries for mobile, tablet, and desktop layouts
- Transitions for menus, buttons, themes, and accordion panels
- `object-fit: cover` for consistent image cropping
- `:focus-visible` for keyboard focus indicators
- `prefers-reduced-motion` for accessible motion reduction

### Vanilla JavaScript

The project uses plain JavaScript without a framework or build system. JavaScript handles:

- Opening and closing the navigation dropdown
- Updating menu icons and accessible labels
- Closing the menu when a navigation link is selected
- Closing the menu with the Escape key
- Switching between light and dark themes
- Saving the selected theme in `localStorage`
- Detecting the visitor's system colour preference
- Opening and closing season descriptions
- Synchronizing accordion `aria-expanded` and `aria-hidden` states
- Dynamically sizing open season panels so text is not clipped

### External resources

- **Remix Icon** for interface icons
- **Google Fonts**:
  - Cinzel for display headings
  - Montserrat for body text and interface content

## Theme System

The page includes a light/dark theme system implemented with HTML, CSS, and JavaScript.

### HTML theme state

The current theme is stored on the root HTML element using a data attribute:

```html
<html lang="en" data-theme="dark">
```

JavaScript changes this value to either `dark` or `light` when the theme button is used.

### CSS theme variables

Dark mode is the default theme. The light theme overrides the main colour variables with a selector like this:

```css
[data-theme="light"] {
    --navy: #f5f2ea;
    --navy-light: #fffdf8;
    --off-white: #171a1d;
}
```

The main CSS variables include:

- `--navy` and `--navy-light` for page and card backgrounds
- `--off-white` for primary text
- `--muted`, `--muted-strong`, and `--subtle` for secondary text
- `--gold` and `--gold-light` for accents and interactive states
- `--border` and `--border-strong` for borders
- `--glow` for menu-link hover effects
- `--hero-bg` for the hero image surface
- `--shadow` for elevated cards and panels
- `--max-width` for the main content width

### Theme logo switching

The two logo images are kept in the top navigation only:

- Dark theme displays `assets/logo-black.png`
- Light theme displays `assets/logo-white.png`

CSS controls which logo is visible, so the JavaScript only needs to update the `data-theme` attribute.

### JavaScript persistence

The selected theme is saved with the key:

```javascript
const themeStorageKey = "aot-theme";
```

When the page loads, it checks the saved value first. If no saved value exists, it checks the browser's `prefers-color-scheme` setting. The theme button also updates its icon, accessible label, and `aria-pressed` state.

## Navigation and Menu

The navigation header separates the branding from the action controls:

```html
<div class="nav_header">
    <div class="nav_logo">...</div>
    <div class="nav_controls">
        <button class="theme_btn">...</button>
        <button class="nav_menu_btn">...</button>
    </div>
</div>
```

`.nav_header` uses Flexbox with `justify-content: space-between`, while `.nav_controls` uses `margin-left: auto` to keep the theme and menu buttons aligned to the far right.

The menu links remain hidden until the menu button receives the `open` state. When visible, each link has a gold glow on hover and keyboard focus:

```css
.nav_links a:hover,
.nav_links a:focus-visible {
    box-shadow: 0 0 0.8rem var(--glow);
    text-shadow: 0 0 0.55rem var(--gold-light);
}
```

## Character Profile Cards

Character cards are created with a reusable HTML pattern:

1. A `.character_card` contains the character information.
2. A `.character_avatar` provides a circular image frame.
3. The character image fills the frame using `object-fit: cover`.
4. The character name, role, and quote appear below the image.
5. CSS Grid arranges the cards differently depending on the screen width.

Example image styling:

```css
.character_avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
```

The character images are stored in the `assets` folder, including images for Eren, Mikasa, Armin, Levi, Erwin, Hange, Reiner, Annie, Jean, Floch, Zeke, and Ymir.

## Season Poster and Description Layout

Each season card combines an image, season information, and a description in one reusable component.

### Poster area

The `.season_poster` element forms the left side of the card. It contains:

- A season image
- A dark colour overlay created with `::before`
- A visible season number such as `S1`, `S2`, `S3`, or `S4`

The image is fitted into the poster area with:

```css
.season_img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

This keeps each poster visually consistent even when the source images have different dimensions.

### Text and paragraph area

The `.season_head` area places the year, episode count, title, and arrow icon beside the poster. The longer season paragraph is stored in `.season_content` directly below the header portion of the same `.season_card`.

The paragraph starts collapsed. Clicking the `.season_toggle` button:

1. Adds or removes the `.open` class.
2. Updates `aria-expanded` on the button.
3. Updates `aria-hidden` on the description panel.
4. Calculates the panel's `scrollHeight` in JavaScript.
5. Animates the description open without clipping longer text.

This approach fuses the poster image, season metadata, and paragraph into one interactive season component while keeping the content readable and accessible.

## Project Structure

```text
attack_on_titan_landing_page/
├── index.html
├── styles.css
├── main.js
├── README.md
└── assets/
    ├── logo-black.png
    ├── logo-white.png
    ├── side.jpg
    ├── s1.jpg
    ├── s2.png
    ├── s3.jpg
    ├── s4.jpg
    └── character images
```

## Running the Project

No build tools or package installation are required.

You can open `index.html` directly in a browser, or run a local server from the project directory:

```bash
python -m http.server
```

Then open `http://localhost:8000` in a browser.

## Future Improvements

Possible future improvements include:

- Replace placeholder social links with real project or social media URLs
- Add a functional contact form with validation
- Add a real streaming or watch destination to the hero CTA
- Add a dedicated Portfolio section instead of mapping the menu item to the character section
- Add a dedicated Services section if the navigation labels are retained
- Add filtering or search for characters and seasons
- Add lazy loading to below-the-fold images
- Convert large images to optimized WebP or AVIF formats
- Add image loading placeholders and better error handling
- Add a mobile navigation overlay and click-outside closing behavior
- Add automated HTML, CSS, accessibility, and JavaScript tests
- Add browser-based visual regression testing
- Improve screen-reader descriptions for decorative and informative artwork
- Add subtle scroll-reveal effects while respecting reduced-motion preferences
- Connect the project to a CMS or data source so character and season cards can be maintained more easily

## Credits

Created as a fan-made educational web development project inspired by *Attack on Titan / Shingeki no Kyojin*.
