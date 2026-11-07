---
title: Twenty Twenty-Two photo gallery guide
description: Using figures, photo stacks, mixed grids, and grouped carousels on Bear Blog
---

## Set up the gallery features

1. Install [bearblog-twentytwentytwo.css](./bearblog-twentytwentytwo.css) in Bear Blog's Custom CSS.
2. Add the full contents of [twentytwentytwo-gallery.js](./twentytwentytwo-gallery.js) inside a separate `<script>` block in Footer Directives.
3. Keep your other plugins' script blocks intact. Include this gallery script only once.

```html
<script>
/* Replace this comment with the full contents of twentytwentytwo-gallery.js. */
</script>
```

Figures and grids work with CSS alone. JavaScript adds carousel navigation and
automatic grid column hints. Ordinary images and unclassified figures keep the
existing Twenty Twenty-Two styling.

## Add photo markup to a post

Copy the HTML inside the examples into your Bear Blog post body, without the
surrounding code fences. Keep each HTML container intact, with no blank lines
inside it. Replace the sample Picsum URLs with your own image URLs and describe
each photograph in its `alt` attribute.

These classes belong in your post markup, not in Footer Directives. Do not copy
this guide's YAML metadata into a post.

## Standalone figures and captions

Use a figure to group a photograph with a centered caption:

```html
<figure>
<img src="https://picsum.photos/id/1015/1200/800" alt="A mountain valley">
<figcaption>A morning in the mountains.</figcaption>
</figure>
```

| Figure class | Display                                      |
|--------------|----------------------------------------------|
| None         | Existing natural-size image, no forced crop   |
| `vertical`   | Centered portrait, at most 360px wide and 520px tall |
| `square`     | Centered 1:1 crop, at most 480px wide           |
| `wide`       | Full content width, at most 400px tall         |

Add the aspect class to the figure:

```html
<figure class="vertical">
<img src="https://picsum.photos/id/1011/600/1000" alt="A portrait-oriented waterside scene">
<figcaption>A portrait photograph.</figcaption>
</figure>
```

Use `square` or `wide` in place of `vertical` for the other frames.

## Vertical stacks

Place figures consecutively. No extra wrapper or stacking class is needed.
You can mix aspect classes and captions within the stack.

```html
<figure class="wide">
<img src="https://picsum.photos/id/1015/1200/600" alt="First landscape in a vertical stack">
<figcaption>The valley.</figcaption>
</figure>
<figure class="wide">
<img src="https://picsum.photos/id/1016/1200/600" alt="Second landscape in a vertical stack">
<figcaption>The ridge.</figcaption>
</figure>
```

## Horizontal stacks and grids

Use `.photo-grid` with direct `<img>` or `<figure>` children:

```html
<div class="photo-grid cols-2">
<figure>
<img src="https://picsum.photos/id/1015/900/600" alt="Valley on the left">
<figcaption>The valley.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1016/900/600" alt="Ridge on the right">
<figcaption>The ridge.</figcaption>
</figure>
</div>
```

For uncaptioned photographs, replace each figure with its image alone.
Grid captions appear as gradient overlays at the bottom of each photograph.

| Grid class           | Columns                              |
|----------------------|--------------------------------------|
| `photo-grid`         | Responsive auto-fill                 |
| `photo-grid cols-2`  | Two equal columns                    |
| `photo-grid cols-3`  | Three equal columns on wider screens |

Add more children for multiple rows. When you omit a column class, JavaScript
adds a two-column hint for two children or a three-column hint for three children.
Explicit column classes are preserved, regardless of the number of children.

## Portrait beside a vertical stack

In a grid, `vertical` spans two rows rather than using the standalone
figure's portrait limits:

```html
<div class="photo-grid cols-2">
<figure class="vertical">
<img src="https://picsum.photos/id/1011/600/1000" alt="Tall portrait on the left">
<figcaption>One portrait spanning both rows.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1015/900/600" alt="Upper landscape on the right">
<figcaption>Upper landscape.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1016/900/600" alt="Lower landscape on the right">
<figcaption>Lower landscape.</figcaption>
</figure>
</div>
```

A pair of `vertical` figures also works as a portrait-only horizontal stack.

## Wide photograph above a horizontal pair

The `wide` class spans two columns:

```html
<div class="photo-grid cols-2">
<figure class="wide">
<img src="https://picsum.photos/id/1018/1400/700" alt="Wide landscape across both columns">
<figcaption>A wide opening photograph.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1015/900/600" alt="Lower-left valley">
<figcaption>Lower left.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1016/900/600" alt="Lower-right ridge">
<figcaption>Lower right.</figcaption>
</figure>
</div>
```

## Mixed grids and crop focus

Put these classes on a direct grid image or its figure:

| Class          | Effect                                   |
|----------------|------------------------------------------|
| `vertical`     | Spans two rows, default top crop          |
| `wide`         | Spans two columns, default center crop    |
| `square`       | 1:1 crop                                 |
| `focus-top`    | Crop from the top                        |
| `focus-center` | Crop from the center                     |
| `focus-bottom` | Crop from the bottom                     |

Explicit focus classes override the aspect class's default crop position.
This mosaic combines all three aspect classes:

```html
<div class="photo-grid cols-3">
<figure class="vertical focus-bottom">
<img src="https://picsum.photos/id/1011/600/1000" alt="Tall portrait with a bottom-focused crop">
<figcaption>Portrait focused at the bottom.</figcaption>
</figure>
<figure class="wide">
<img src="https://picsum.photos/id/1018/1400/700" alt="Wide landscape in the mosaic">
<figcaption>Wide photograph.</figcaption>
</figure>
<figure class="square">
<img src="https://picsum.photos/id/1015/900/600" alt="Square valley photograph">
<figcaption>Square photograph.</figcaption>
</figure>
<figure>
<img class="focus-center" src="https://picsum.photos/id/1016/900/600" alt="Center-focused ridge photograph">
<figcaption>Regular photograph focused at the center.</figcaption>
</figure>
</div>
```

## Photo carousel

Each `.carousel-slide` is one slide:

```html
<div class="photo-carousel" role="region" aria-label="Mountain photographs">
<div class="carousel-track">
<figure class="carousel-slide">
<img src="https://picsum.photos/id/1015/1200/800" alt="Valley on the first slide">
<figcaption>The valley.</figcaption>
</figure>
<figure class="carousel-slide">
<img src="https://picsum.photos/id/1016/1200/800" alt="Ridge on the second slide">
<figcaption>The ridge.</figcaption>
</figure>
</div>
</div>
```

The script adds previous/next buttons and slide dots. Click a dot to jump to
a slide, swipe horizontally on a phone, or use Tab and Enter/Space to activate
a navigation button. Navigation wraps at both ends and recalculates after
resizing. Each carousel operates independently.

The track wrapper is optional: the script creates it for direct slide children.
Keep an explicit track if you want native horizontal scrolling when JavaScript
is unavailable. A single slide does not receive controls.

Carousel images fit without cropping, at most 500px tall on desktop and 360px
on mobile. Captions sit above the separate dot area. You can also use a div
slide containing an image and `<div class="slide-caption">Caption</div>`.

## Grids and vertical stacks inside carousel slides

Use a div slide as the container for a group of photographs:

```html
<div class="photo-carousel" role="region" aria-label="Grouped travel photographs">
<div class="carousel-track">
<div class="carousel-slide">
<div class="photo-grid cols-2">
<figure class="square">
<img src="https://picsum.photos/id/1015/900/600" alt="Left photograph on the first slide">
<figcaption>First slide, left.</figcaption>
</figure>
<figure class="square">
<img src="https://picsum.photos/id/1016/900/600" alt="Right photograph on the first slide">
<figcaption>First slide, right.</figcaption>
</figure>
</div>
</div>
<div class="carousel-slide">
<figure class="wide">
<img src="https://picsum.photos/id/1018/1200/600" alt="Upper photograph on the second slide">
<figcaption>Second slide, upper photograph.</figcaption>
</figure>
<figure class="wide">
<img src="https://picsum.photos/id/1015/1200/600" alt="Lower photograph on the second slide">
<figcaption>Second slide, lower photograph.</figcaption>
</figure>
</div>
</div>
</div>
```

Replace the grid above with either mixed-grid example to put portrait and wide
combinations inside a slide. Grouped images retain their figure or grid sizing;
the ordinary single-image carousel height cap does not apply to the whole group.

You can also place figures, grids, and carousels consecutively in one post.
Do not nest one carousel inside another.

## Mobile behavior and checks

At widths up to 768px, grids use two columns and ordinary grid images become
160px tall instead of 220px. Portrait spans and square crops remain active.
Reduced-motion preferences disable the carousel sliding transition.

Before publishing:

* Check both desktop and phone previews
* Confirm portrait spans, wide spans, and square crops
* Check every caption and its contrast
* Test arrows, dots, wraparound, and swipes in each carousel
* Resize the page after selecting a different slide
* Confirm image URLs load and alt text describes each photograph

For non-gallery theme settings, use the [full CSS reference](./css-reference-twentytwentytwo.md).
