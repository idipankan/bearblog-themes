---
title: Bearblog Twenty-Twenty-Two CSS Reference
description: Theme styling reference and photo gallery installation guide
---

> Quick developer guide for styling fixes. [View source](./bearblog-twentytwentytwo.css)

---

## 📦 CSS Variables (`:root`)

| Variable | Purpose | Default Value |
|----------|---------|---------------|
| `--color-primary` | Titles, links | `#2c6e83` (teal-blue) |
| `--color-accent` | Dates, highlights | `#c45c4b` (terracotta) |
| `--color-header-bg` | Header background | `#b85042` |
| `--color-header-text` | Header text | `#fff5f0` (cream) |
| `--color-background` | Page background | `#f9ede6` (blush/cream) |
| `--color-foreground` | Body text | `#333333` |
| `--color-muted` | Secondary text | `#666666` |
| `--font-heading` | Headings | `'Source Serif 4'` |
| `--font-body` | Body text | `'Literata'` |
| `--content-width` | Max content width | `720px` |

**Dark Mode**: Overrides in `@media (prefers-color-scheme: dark)` — *Lines 60-71*

---

## 🎨 Section Quick Reference

### Base Styles (Lines 73-106)
- Reset box-sizing, smooth scroll
- Body font, colors, antialiasing
- Content containers: `main`, `.post-content`, `article`

```css
/* Fix: Change max content width */
--content-width: 720px;
```

---

### Header / Navigation (Lines 108-188)

| Element | Selector | Notes |
|---------|----------|-------|
| Nav bar | `nav` | Flexbox, min-height 180px |
| Bird image | `nav::after` | Centered, responsive sizing |
| Site title | `.title`, `nav .title` | Italic, off-white `#faf5f0` |
| Nav links | `nav a:not(.title)` | Top-right, small text |

```css
/* Fix: Change header background */
--color-header-bg: #b85042;

/* Fix: Adjust bird image size */
width: clamp(280px, 60vw, 600px);
height: clamp(80px, 12vw, 140px);
```

---

### Typography (Lines 190-240)

| Heading | Size Variable | Weight |
|---------|---------------|--------|
| `h1` | `--text-3xl` | 300 |
| `h2` | `--text-2xl` | 300 |
| `h3` | `--text-xl` | 300 |
| `h4` | `--text-lg` | 300 |
| `h5/h6` | `--text-md` | 700, uppercase |

```css
/* Fix: Change heading color */
color: var(--color-primary);
```

---

### Links (Lines 242-277)
- Default: underlined with `--color-primary`
- Hover: dashed underline
- Title links: no underline by default

---

### Blog Post List (Lines 306-364)
Selector: `ul.blog-posts`

| Element | Selector | Styling |
|---------|----------|---------|
| List item | `ul.blog-posts li` | Bottom border, large margin |
| Post title | `ul.blog-posts li a` | Large heading font |
| Date | `ul.blog-posts li span`, `time` | Italic, accent color |
| Excerpt | `.post-excerpt` | Muted, italic |

```css
/* Fix: Adjust list spacing */
margin-bottom: var(--spacing-xl);
```

---

### Images & Media
- Max-width 100%, auto height
- `figure` with centered `figcaption`

#### Installing photo capabilities

1. Replace your custom CSS with [bearblog-twentytwentytwo.css](./bearblog-twentytwentytwo.css).
2. Copy [twentytwentytwo-gallery.js](./twentytwentytwo-gallery.js) into its own `<script>...</script>` block in Bear Blog's **Footer Directives**. Keep other plugins and their script blocks intact.
3. Paste the body of [photo-samples.md](./photo-samples.md) into a draft post. Omit the YAML metadata between the opening `---` delimiters.

Use this wrapper in Footer Directives, replacing the comment with the full JavaScript file contents:

```html
<script>
/* Paste the full contents of twentytwentytwo-gallery.js here. */
</script>
```

Add the gallery script only once. The `.js` file itself remains plain JavaScript; the script tags belong in Footer Directives.

The markup uses the same classes as Travel. Colors and typography still come from Twenty Twenty-Two. Ordinary images, unclassified figures, videos, iframes, and non-photo theme styles are unchanged.

#### Standalone figures and vertical stacks

Use `<figure>` and `<figcaption>` for captioned images. Consecutive figures form a vertical stack.

| Figure class | Display                                        |
|--------------|------------------------------------------------|
| None         | Existing natural-size image and centered caption |
| `vertical`   | Centered portrait, at most 360px wide and 520px tall |
| `square`     | Centered 1:1 crop, at most 480px wide            |
| `wide`       | Full-width image, at most 400px tall            |

```html
<figure class="vertical">
<img src="https://picsum.photos/id/1011/600/900" alt="A traveler on the water">
<figcaption>A portrait-oriented photograph</figcaption>
</figure>
```

#### Horizontal stacks and mixed grids

Use `<div class="photo-grid">` with direct `<img>` or `<figure>` children. `cols-2` and `cols-3` select two or three equal columns. Without a hint, CSS auto-fills columns; JavaScript adds a hint for exactly two or three children, but never overrides an explicit hint.

Add these classes to a grid image or its figure:

| Class          | Display                                  |
|----------------|------------------------------------------|
| `vertical`     | Spans two rows, cropped from the top     |
| `wide`         | Spans two columns, cropped at the center  |
| `square`       | 1:1 crop                                 |
| `focus-top`    | Crop from the top                        |
| `focus-center` | Crop from the center                     |
| `focus-bottom` | Crop from the bottom                     |

Figures display captions as bottom overlays. Explicit focus classes override the aspect class's crop position. A portrait plus two normal images in `cols-2` creates a portrait beside a vertical stack; a `wide` figure above two normal figures creates a horizontal stack below a wide image.

At widths up to 768px, grids use two columns and normal grid images are 160px tall instead of 220px. Portrait spans and square crops remain active.

#### Carousels and combinations

```html
<div class="photo-carousel" role="region" aria-label="Trip photographs">
<div class="carousel-track">
<figure class="carousel-slide">
<img src="https://picsum.photos/id/1015/1200/800" alt="A mountain valley">
<figcaption>A mountain valley</figcaption>
</figure>
<figure class="carousel-slide">
<img src="https://picsum.photos/id/1016/1200/800" alt="A rocky landscape">
<figcaption>A rocky landscape</figcaption>
</figure>
</div>
</div>
```

The script adds wrapping previous/next buttons, slide dots, touch swipes, and resize handling. Buttons work with keyboard Tab and Enter/Space. Multiple carousels operate independently. The track wrapper is optional; the script creates it for direct `.carousel-slide` children. A single slide needs no controls.

To combine layouts, use `<div class="carousel-slide">` containing a photo grid or consecutive figures. Do not nest carousels. Ordinary carousel images fit without cropping, at most 500px tall on desktop and 360px on mobile. Captions stay above the dots. Reduced-motion preferences disable the sliding transition.

Figures and grids work without JavaScript. With an explicit `.carousel-track`, carousels also support native horizontal scrolling without JavaScript.

---

### Blockquotes
- Left border accent
- Heading font, italic, larger text

---

### Code Blocks
| Element | Background |
|---------|------------|
| `code` (inline) | `var(--color-border)` |
| `pre` (block) | `rgba(0,0,0,0.05)` |

**Dark mode**: Background shifts to `rgba(255,255,255,0.05)`

---

### Tables
- Full width, collapsed borders
- Header row with subtle background

---

### Pagination
Selectors: `.pagination`, `#pagination`
- Centered flex layout
- Bordered link buttons

---

### Author Box
Selector: `.author-box`

| Element | Class | Notes |
|---------|-------|-------|
| Container | `.author-box` | Flex, horizontal layout |
| Avatar | `.author-box img` | 80×80, circular |
| Content | `.author-box-content` | Flexible width |
| Name | `.author-name` | Heading font |
| Bio | `.author-bio` | Italic, muted |

**Mobile** (< 480px): Stacks vertically, centered

---

### Footer
- Centered, small text
- Muted color

---

## 📱 Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 768px` | Reduced spacing, tighter padding |
| `≥ 1200px` | Larger base font |
| `≤ 480px` | Author box stacks vertically |

---

## 🖨 Print Styles
- Hides nav, header, footer
- Black text on white
- Headings avoid page breaks

---

## 🔧 Common Fixes

### Change primary color scheme
```css
:root {
    --color-primary: #YOUR_COLOR;
    --color-accent: #YOUR_ACCENT;
}
```

### Adjust header height
```css
nav {
    min-height: 180px; /* Change this value */
}
```

### Modify content width
```css
:root {
    --content-width: 800px; /* Wider content area */
}
```

### Change fonts
```css
:root {
    --font-heading: 'Your Font', serif;
    --font-body: 'Your Font', serif;
}
/* Don't forget to update the @import at line 8 */
```
