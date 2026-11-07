---
title: Bear CSS
description: Custom Bear Blog themes and installation instructions
---

A collection of custom CSS themes for [Bear Blog](https://bearblog.dev).

Each theme is a self-contained folder with a stylesheet, a developer reference doc, and (where needed) a JavaScript enhancement file.

## Themes

| Theme | Folder | Description |
|-------|--------|-------------|
| MS-DOS | [`ms-dos/`](ms-dos/) | Retro DOS/CRT terminal aesthetic with boot loader and scanline effects |
| Travel | [`travel-theme/`](travel-theme/) | Minimal, elegant theme with photo galleries and a carousel |
| Twenty Twenty-Two | [`twentytwentytwo/`](twentytwentytwo/) | Warm, editorial blog theme with serif headings, photo grids, and carousels |

Each folder contains a `css-reference-*.md` file documenting that theme's CSS variables, sections, and customization tips.

For gallery-only instructions and copyable photo layouts, use the
[Travel gallery guide](travel-theme/gallery-guide.md) or the
[Twenty Twenty-Two gallery guide](twentytwentytwo/gallery-guide.md).

## Installing a theme on Bear Blog

1. Open the theme's `.css` file in this repo and copy its full contents.
2. In your Bear Blog dashboard, go to **Design → Custom CSS** and paste the contents in.
3. If the theme ships a `.js` file (e.g. `travel-gallery.js` or `twentytwentytwo-gallery.js`), paste its contents inside a separate `<script>...</script>` block in **Footer Directives**. Keep other plugins and their script blocks intact.
4. Save and preview your blog.

## Customizing a theme

Every theme exposes its colors, fonts, and sizing as CSS custom properties in a `:root` block, so you can retheme it without touching the rest of the CSS. Open the theme's `css-reference-*.md` for the full variable table and section-by-section notes, then override values directly in the copied stylesheet, for example:

```css
:root {
  --color-primary: #2c6e83;
  --color-background: #f9ede6;
}
```

## Repo structure

```text
bear-css/
├── ms-dos/
│   ├── ms-dos.css
│   └── css-reference-ms-dos.md
├── travel-theme/
│   ├── bearblog-travel.css
│   ├── travel-gallery.js
│   └── css-reference-travel.md
├── twentytwentytwo/
│   ├── bearblog-twentytwentytwo.css
│   ├── twentytwentytwo-gallery.js
│   ├── photo-samples.md
│   └── css-reference-twentytwentytwo.md
```
