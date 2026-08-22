# Bearblog Twenty-Twenty-Two CSS Reference

> Quick developer guide for styling fixes. [View source](file:///c:/Users/hp/Desktop/Code%20Playground/2026/Jan/bear-css/bearblog-twentytwentytwo.css)

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

### Images & Media (Lines 366-387)
- Max-width 100%, auto height
- `figure` with centered `figcaption`

---

### Blockquotes (Lines 389-405)
- Left border accent
- Heading font, italic, larger text

---

### Code Blocks (Lines 407-438)
| Element | Background |
|---------|------------|
| `code` (inline) | `var(--color-border)` |
| `pre` (block) | `rgba(0,0,0,0.05)` |

**Dark mode**: Background shifts to `rgba(255,255,255,0.05)`

---

### Tables (Lines 440-466)
- Full width, collapsed borders
- Header row with subtle background

---

### Pagination (Lines 490-526)
Selectors: `.pagination`, `#pagination`
- Centered flex layout
- Bordered link buttons

---

### Author Box (Lines 528-588)
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

### Footer (Lines 590-603)
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

## 🖨 Print Styles (Lines 635-659)
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
