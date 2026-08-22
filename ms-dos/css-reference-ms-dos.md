# Bearblog MS-DOS Theme — CSS Reference

> Quick developer guide for the retro DOS/CRT aesthetic theme. [View source](file:///c:/Users/hp/Desktop/Code%20Playground/2026/Jan/bear-css/ms-dos.css)

---

## 📦 CSS Variables (`:root`)

| Variable | Purpose | Default Value |
|----------|---------|---------------|
| `--width` | Max content width | `720px` |
| `--font-main` | Heading font | `'Space Mono', monospace` |
| `--font-secondary` | Body font | `'Space Mono', monospace` |
| `--font-scale` | Base font size | `0.9em` |
| `--background-color` | Page background | `#000084` (DOS blue) |
| `--heading-color` | Heading text | `#000000` |
| `--heading-background` | Heading bar fill | `#00AAAA` (DOS cyan) |
| `--text-color` | Body text | `#B7B7B7` (CRT grey) |
| `--link-color` | Link color | `#B7B7B7` |
| `--visited-color` | Visited links | `#B7B7B7` |
| `--code-background-color` | Code block background | `#0C0C0C` |
| `--code-color` | Code text / prompt | `#00AAAA` |
| `--code-accent-color` | `C:\>` prompt color | `#AAAAAA` |
| `--code-glow` | Code phosphor glow | `rgba(0, 170, 170, 0.3)` |
| `--blockquote-color` | Blockquote text | `#B7B7B7` |
| `--glow-color` | Body text glow | `rgba(183, 183, 183, 0.4)` |
| `--cursor-color` | Hover cursor blink | `#B7B7B7` |

```css
/* Tip: To change the screen color, update: */
--background-color: #000084;   /* DOS blue background */
--heading-background: #00AAAA; /* Cyan heading bars */
```

---

## 🎬 Animations & Effects

### Loading Screen (Lines 27–115)
A pure-CSS boot loader appears on page load via `body::after` and `html::after`.

| Element | Selector | Notes |
|---------|----------|-------|
| Loading overlay | `body::after` | Fixed full-screen, z-index 9999 |
| Progress bar border | `html::after` | Fixed, z-index 10000 |

**Keyframes:**

| Name | Effect |
|------|--------|
| `loader-text-blink` | Cursor blink on loading text (0.5s) |
| `loader-progress-anim` | Progress bar fill animation (1s) |
| `loader-fadeout` | Fade out overlay after 1.2s delay |

```css
/* Tip: Delay fade-out longer */
animation: loader-fadeout 0.4s ease-out 2s forwards;
/*                                        ↑ change delay */
```

---

### CRT Scanline Overlay (Lines 172–197)
A repeating horizontal scanline pattern moves continuously over the viewport. It sits at **z-index 1000** — images are lifted above it.

| Selector | z-index | Notes |
|----------|---------|-------|
| `body::before` | 1000 | `pointer-events: none`, always on top of content |
| `img` | 1001 | Lifted above scanlines to prevent flicker |

**Keyframe:** `scanline-move` — shifts background-position 100px downward over 8s, creating a scrolling line effect.

```css
/* Tip: Slow down or speed up scanlines */
animation: scanline-move 8s linear infinite;
/*                        ↑ increase for slower scanlines */
```

---

### Screen Flicker (Lines 227–262)
Subtle opacity dips simulate a CRT screen's natural flicker. **Applies only to headings**, not images.

| Selector | Animation |
|----------|-----------|
| `h1`–`h6` | `screen-flicker 5s infinite` + `text-flicker 0.1s infinite alternate` |

> **Note:** Images do **not** flicker — they are deliberately excluded and rendered above the scanline overlay.

---

### DOS Cursor Blink (Lines 130–167)

| Element | Appended content | Timing |
|---------|-----------------|--------|
| `h1::after`, `h2::after`, `h3::after` | `█` (block cursor) | 1s step-end |
| `p:hover::after` | `▌` (half-block cursor) | 0.8s step-end |
| `input:focus::after`, `textarea:focus::after` | `█` | 0.6s step-end |

---

### Boot Typing Effect (Lines 277–285)
The `.title h1` element animates in like typed DOS output on page load.

```css
.title h1 {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 0.8s steps(20) 1.5s both;
}
```

- Starts after **1.5s** (after the loader fades)
- Uses `steps(20)` for a character-by-character feel

---

## 🎨 Section Quick Reference

### Phosphor Glow Effects (Lines 199–222)

| Selector | Glow |
|----------|------|
| `body` | `text-shadow: 0 0 2px var(--glow-color)` |
| `h1`–`h6` | `text-shadow: 0 0 5px rgba(0, 170, 170, 0.5)` |
| `a` | `text-shadow: 0 0 3px var(--glow-color)` |
| `a:hover` | `text-shadow: 0 0 8px rgba(0, 0, 0, 0.8)` |

---

### Typography (Lines 375–411)

All headings use the `--heading-background` bar style (black text on cyan fill).

| Heading | Font Size |
|---------|-----------|
| `h1` | `1.2em` |
| `h2` | `1.1em` |
| `h3` | `1.0em` |
| `h4` | `0.9em` |
| `h5` | `0.8em` |
| `h6` | `0.7em` |

```css
/* Fix: Change heading bar colors */
--heading-color: #000000;
--heading-background: #00AAAA;
```

---

### Links (Lines 323–423)

| State | Behavior |
|-------|----------|
| Default | No underline; animated underline via `::before` pseudo-element |
| Hover | Cyan underline slides in left-to-right; inverted colors (black on grey) |
| Visited | Same color as default (`--visited-color`) |

The animated underline uses `transform: scaleX()` with `transform-origin` toggling between `right` (hidden) and `left` (visible).

---

### Navigation (Lines 425–444)

| Element | Selector | Notes |
|---------|----------|-------|
| Nav bar | `nav` | Black background |
| Nav paragraph | `nav p` | Zero margin |
| Nav link | `nav a` | `5px 12px` padding, inline-block |
| Nav link hover | `nav a:hover` | Grey background `#B7B7B7` |

---

### Images & Hover Magnify (Lines 264–281)

Images are rendered **above** the CRT scanline overlay to prevent flicker.

| Property | Value | Purpose |
|----------|-------|---------|
| `position` | `relative` | Enables z-index stacking |
| `z-index` | `1001` | Above scanline overlay (z-index 1000) |
| `cursor` | `zoom-in` | Visual hint to the user |
| `transition` | `0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Smooth deceleration curve |

**Hover state:**

| Property | Value |
|----------|-------|
| `transform` | `scale(1.08)` |
| `box-shadow` | Cyan ring + deep drop shadow + outer glow |
| `filter` | `brightness(1.08)` |
| `z-index` | `1002` |

---

### Code Blocks (Lines 514–557)

All `.highlight` and `.code` blocks use a DOS terminal aesthetic.

- Double-border bevel effect using `border` directional colors
- Inner phosphor glow via `box-shadow: inset`
- Prepended `C:\>` prompt via `::before` pseudo-element
- `overflow-x: auto` for horizontal scroll on long lines

```css
/* Fix: Change the DOS prompt text */
.highlight::before, .code::before {
    content: 'C:\>';  /* Change to any prompt you like */
}
```

---

### Syntax Highlighting (Lines 559–694)

DOS-themed color overrides for code tokens:

| Token Type | Color | Notes |
|------------|-------|-------|
| Functions, class names | `#FFD700` | Bright yellow |
| Keywords | `#FFFFFF` | Pure white |
| Strings | `#55FF55` | Classic DOS green |
| Comments | `#888888` | Italic, no glow |
| Numbers | `#FF55FF` | Magenta/pink |
| Built-ins | `#FFAA55` | Orange |
| Operators | `var(--code-color)` | Default cyan |
| Variables/params | `#88DDFF` | Light cyan |
| Decorators | `#CC99FF` | Light purple |

---

### Buttons (Lines 290–318)

Uses classic Windows 3.x / DOS raised-bevel 3D button style:

| State | Effect |
|-------|--------|
| Default | White border top-left, dark border bottom-right (raised look) |
| Hover | Slightly lighter background `#CCCCCC` |
| Active | Borders flip (pressed look) + `translate(1px, 1px)` |

---

### Footer (Lines 489–494)

Mirrors heading style — black text on cyan background, centered.

```css
footer {
    background: var(--heading-background);
    color: var(--heading-color);
}
```

---

### Blog Post List (Lines 696–713)

| Element | Selector | Notes |
|---------|----------|-------|
| List | `ul.blog-posts` | No bullets, no padding |
| Item | `ul.blog-posts li` | Flexbox row, `12px` bottom margin |
| Date | `ul.blog-posts li span` | Fixed `130px` width |
| Visited link | `ul.blog-posts li a:visited` | Uses `--visited-color` |

---

### Selection Styling (Lines 349–359)

Selected text uses the heading color scheme — black on cyan — with `text-shadow` removed for legibility.

---

## 🔧 Common Fixes

### Change the DOS screen color
```css
:root {
    --background-color: #001a00; /* Green phosphor screen */
    --heading-background: #00FF41;
    --heading-color: #000000;
    --code-color: #00FF41;
}
```

### Change content width
```css
:root {
    --width: 860px;
}
```

### Disable the boot loader
```css
body::after, html::after {
    display: none;
}
```

### Disable scanlines
```css
body::before {
    display: none;
}
```

### Slow down or remove heading flicker
```css
/* Remove flicker from headings */
h1, h2, h3, h4, h5, h6 {
    animation: none;
}
```

### Change heading cursor character
```css
h1::after, h2::after, h3::after {
    content: '_'; /* Underscore cursor instead of block */
}
```

### Change fonts
```css
/* 1. Update the @import at line 1 */
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

/* 2. Update the variables */
:root {
    --font-main: 'Your Font', monospace;
    --font-secondary: 'Your Font', monospace;
}
```
