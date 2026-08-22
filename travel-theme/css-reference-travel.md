# Bearblog Travel Theme — Reference

> A minimal, elegant travel-themed Bearblog CSS theme with photo gallery and carousel support.

---

## 📦 Files

| File | Purpose | Where to use |
|------|---------|--------------|
| `bearblog-travel.css` | Full theme stylesheet | Bear Blog → **Design → Custom CSS** |
| `travel-gallery.js` | Carousel + grid enhancements | Bear Blog → **Footer JavaScript** |

---

## 🎨 CSS Variables (`:root`)

| Variable | Purpose | Light | Dark |
|----------|---------|-------|------|
| `--color-primary` | Headings, links | `#2a5e6c` (deep teal) | `#6fb8c9` |
| `--color-accent` | Dates, highlights | `#c08552` (warm amber) | `#d9a76a` |
| `--color-header-bg` | Header background | `#1e3d44` (oceanic teal) | `#12282e` |
| `--color-header-text` | Header text | `#f0ebe3` (parchment) | `#e8e2d8` |
| `--color-background` | Page background | `#faf6f0` (warm linen) | `#151a1e` |
| `--color-foreground` | Body text | `#2d2d2d` | `#dcd6cc` |
| `--color-muted` | Secondary text | `#7a7a7a` | `#9a9288` |
| `--font-heading` | Headings | `'Playfair Display'` | — |
| `--font-body` | Body text | `'Nunito'` | — |
| `--content-width` | Max content width | `720px` | — |

---

## 🖼 Images — Standalone `<figure>`

Use `<figure>` with `<figcaption>` instead of markdown `![]()` for consistent styling:

```html
<figure>
<img src="photo.jpg" alt="Description">
<figcaption>Caption text</figcaption>
</figure>
```

### Aspect-ratio classes

Add a class to `<figure>` to control how the image is framed:

| Class | Effect | Best for |
|-------|--------|----------|
| *(none)* | Natural size, no crop | Default |
| `vertical` | Max 360px wide, full height, centered | Portrait / phone shots |
| `square` | 1:1 crop, smart top-bias | Profile-style shots |
| `wide` | Full width, capped 400px height | Panoramas, landscapes |

```html
<figure class="vertical">
<img src="portrait.jpg" alt="A portrait">
<figcaption>Vertical framing</figcaption>
</figure>
```

---

## 📐 Photo Grid

Wrap images in a `<div class="photo-grid">` for a responsive CSS Grid layout.

```html
<div class="photo-grid">
<img src="a.jpg" alt="...">
<img src="b.jpg" alt="...">
<img src="c.jpg" alt="...">
</div>
```

### Column hints

| Class | Layout |
|-------|--------|
| *(none)* | Auto-fill (responsive) |
| `cols-2` | Exactly 2 equal columns |
| `cols-3` | Exactly 3 equal columns |

> **Note:** The JS automatically adds `cols-2` or `cols-3` when appropriate, but you can set them manually for explicit control.

### Figures with captions inside grids

```html
<div class="photo-grid cols-2">
<figure>
  <img src="a.jpg" alt="...">
  <figcaption>Caption overlay</figcaption>
</figure>
<figure>
  <img src="b.jpg" alt="...">
  <figcaption>Another caption</figcaption>
</figure>
</div>
```

Captions appear as a gradient overlay at the bottom of each image.

### Aspect-ratio classes in grids

| Class | Grid effect |
|-------|-------------|
| `vertical` | Spans **2 rows**, crops from top |
| `wide` | Spans **2 columns** |
| `square` | 1:1 crop, auto height |

```html
<div class="photo-grid cols-3">
<img src="landscape.jpg" alt="...">
<img src="portrait.jpg" alt="..." class="vertical">
<img src="other.jpg" alt="...">
</div>
```

### Focus-point overrides

Fine-tune cropping on individual grid images:

| Class | Crop bias |
|-------|-----------|
| `focus-top` | Top edge |
| `focus-center` | Center (default CSS behavior) |
| `focus-bottom` | Bottom edge |

```html
<img src="people.jpg" alt="..." class="focus-top">
```

---

## 🎠 Photo Carousel

A horizontal slider with arrow navigation and dot indicators.

```html
<div class="photo-carousel">
<div class="carousel-track">
  <figure class="carousel-slide">
    <img src="slide1.jpg" alt="...">
    <figcaption>Slide 1 caption</figcaption>
  </figure>
  <figure class="carousel-slide">
    <img src="slide2.jpg" alt="...">
    <figcaption>Slide 2 caption</figcaption>
  </figure>
</div>
</div>
```

**Requires `travel-gallery.js`** in Footer JavaScript. The script:
- Injects ‹/› arrow buttons
- Adds dot indicators
- Handles click navigation with smooth sliding
- Wraps around (last → first, first → last)

---

## 📱 Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 768px` | Reduced spacing; grids collapse to 2 columns; smaller carousel arrows |
| `≥ 1200px` | Slightly larger base font |
| `≤ 480px` | Author box stacks vertically |

---

## 🖨 Print Styles

- Hides nav, header, footer
- Black text on white
- Headings avoid page breaks

---

## 🔧 Quick Customization

### Change color palette
```css
:root {
    --color-primary: #YOUR_COLOR;
    --color-accent: #YOUR_ACCENT;
    --color-header-bg: #YOUR_HEADER;
}
```

### Change fonts
```css
:root {
    --font-heading: 'Your Font', serif;
    --font-body: 'Your Font', sans-serif;
}
/* Update the @import at line 8 accordingly */
```

### Adjust content width
```css
:root {
    --content-width: 800px;
}
```
