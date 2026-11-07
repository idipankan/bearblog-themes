---
title: Travel theme photo gallery guide
description: Using figures, photo stacks, grids, and carousels on Bear Blog
---

## Set up the gallery features

1. Install [bearblog-travel.css](./bearblog-travel.css) in Bear Blog's Custom CSS.
2. Add the full contents of [travel-gallery.js](./travel-gallery.js) inside a separate `<script>` block in Footer Directives.
3. Keep your other plugins' script blocks intact. Include this gallery script only once.

```html
<script>
/* Replace this comment with the full contents of travel-gallery.js. */
</script>
```

Figures and grids need only CSS. Carousels need the JavaScript for navigation.
Load the Travel script normally in the footer, not asynchronously after the page
has loaded: it initializes on `DOMContentLoaded`.

## Add photo markup to a post

Copy the HTML inside the examples into your Bear Blog post body, without the
surrounding code fences. Keep each HTML container intact, with no blank lines
inside it. Replace the sample Picsum URLs with your own image URLs and describe
each photograph in its `alt` attribute.

These classes belong in your post markup, not in Footer Directives. Do not copy
this guide's YAML metadata into a post.

## Standalone figures and captions

Use `<figure>` to group a photograph with its caption:

```html
<figure>
<img src="https://picsum.photos/id/1015/1200/800" alt="A mountain valley">
<figcaption>A morning in the mountains.</figcaption>
</figure>
```

Standalone captions are centered and italic.

| Figure class | Display                                  |
|--------------|------------------------------------------|
| None         | Natural image dimensions, no forced crop |
| `vertical`   | Portrait capped at 360px wide and 520px tall |
| `square`     | 1:1 crop, capped at 480px wide             |
| `wide`       | Full content width, capped at 400px tall   |

Add the aspect class to the figure:

```html
<figure class="vertical">
<img src="https://picsum.photos/id/1011/600/1000" alt="A portrait-oriented waterside scene">
<figcaption>A portrait photograph.</figcaption>
</figure>
```

Use `square` or `wide` in place of `vertical` for the other frames.

## Vertical stacks

Consecutive figures form a vertical stack. No extra wrapper or stacking class
is required. Mix natural, portrait, square, and wide frames as needed.

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

Place direct `<img>` or `<figure>` children inside `.photo-grid`.

| Grid class           | Columns                             |
|----------------------|-------------------------------------|
| `photo-grid`         | Responsive auto-fill                |
| `photo-grid cols-2`  | Two equal columns                   |
| `photo-grid cols-3`  | Three equal columns on wider screens |

For a horizontal pair without captions:

```html
<div class="photo-grid cols-2">
<img src="https://picsum.photos/id/1015/900/600" alt="Valley on the left">
<img src="https://picsum.photos/id/1016/900/600" alt="Ridge on the right">
</div>
```

For a captioned pair:

```html
<div class="photo-grid cols-2">
<figure>
<img src="https://picsum.photos/id/1015/900/600" alt="A mountain valley">
<figcaption>The valley.</figcaption>
</figure>
<figure>
<img src="https://picsum.photos/id/1016/900/600" alt="A mountain ridge">
<figcaption>The ridge.</figcaption>
</figure>
</div>
```

Grid photographs are cropped to fill their cells. Captions appear as gradient
overlays at the bottom. Add more children for multiple rows.

The Travel script adds `cols-2` for two children and `cols-3` for three children,
even when you already supplied a column class. For example, three children in
`cols-2` become three columns on desktop after initialization. To keep that
particular combination at two columns, add this optional override after your
theme CSS:

```css
.photo-grid.cols-2.cols-3 {
    grid-template-columns: 1fr 1fr;
}
```

## Mixed portrait, wide, and square layouts

Aspect classes have different meanings inside a grid:

| Class      | Grid placement                    |
|------------|-----------------------------------|
| `vertical` | Spans two rows                    |
| `wide`     | Spans two columns                 |
| `square`   | Requests a square image crop      |

Put the class on a direct image or its figure. This four-image mosaic avoids
the script's automatic two/three-child column hints:

```html
<div class="photo-grid cols-3">
<img class="vertical" src="https://picsum.photos/id/1011/600/1000" alt="Tall portrait spanning two rows">
<img class="wide" src="https://picsum.photos/id/1018/1400/700" alt="Wide landscape spanning two columns">
<img class="square" src="https://picsum.photos/id/1015/900/600" alt="Square valley photograph">
<img src="https://picsum.photos/id/1016/900/600" alt="Regular ridge photograph">
</div>
```

Use two columns for a portrait beside two stacked landscapes, or a wide image
above a horizontal pair. If those layouts have exactly three children and the
Travel script is installed, use the optional two-column override above.

## Choose a crop focus

For regular grid images, put the focus class directly on `<img>`:

```html
<div class="photo-grid cols-2">
<img class="focus-top" src="https://picsum.photos/id/1011/600/1000" alt="Portrait cropped from the top">
<img class="focus-bottom" src="https://picsum.photos/id/1011/600/1000" alt="Portrait cropped from the bottom">
</div>
```

`focus-center` crops at the center. In the current Travel CSS, focus classes on
figures do not transfer to their images, and aspect-specific rules can override
focus classes. Use focus classes on regular grid images for predictable results.

## Photo carousel

Use one `.carousel-slide` per photograph inside `.carousel-track`. This example
uses div slides to avoid the margins applied to ordinary standalone figures:

```html
<div class="photo-carousel" role="region" aria-label="Mountain photographs">
<div class="carousel-track">
<div class="carousel-slide">
<img src="https://picsum.photos/id/1015/1200/800" alt="Valley on the first slide">
<div class="slide-caption">The valley.</div>
</div>
<div class="carousel-slide">
<img src="https://picsum.photos/id/1016/1200/800" alt="Ridge on the second slide">
<div class="slide-caption">The ridge.</div>
</div>
</div>
</div>
```

The script adds previous/next buttons and slide dots. Click a dot to jump to
a slide, swipe horizontally on a phone, or use Tab and Enter/Space to activate
a navigation button. Navigation wraps at both ends and recalculates after
resizing. Each carousel operates independently.

The track is optional for multi-slide carousels because the script can create
it. Keeping it explicit makes the structure easier to follow. A single slide
does not receive navigation controls.

Carousel images fit without cropping, with a maximum height of 500px on desktop
and 360px on mobile. `<figure class="carousel-slide">` and `<figcaption>` are also
supported, but the current Travel CSS leaves standalone figure margins in place.
Short captions work best because dots share the image's bottom overlay area.

## Combine layouts in one post

Place standalone figures, grids, and carousels one after another, with prose
between them. For example, start with a wide figure, add a horizontal pair,
then add a carousel of the rest of the trip.

Do not nest carousels. Grids inside carousel slides do not retain all their
grid-specific image and caption styles in the current Travel stylesheet; use
separate grids and carousels for predictable results.

## Mobile behavior and checks

At widths up to 768px, grids use two columns and grid images become 160px tall.
The current Travel mobile rules also override portrait and square image heights,
so those crops may differ from their desktop appearance.

Before publishing:

* Check both desktop and phone previews
* Check captions, especially beneath carousel dots
* Test arrows, dots, wraparound, and swipes
* Check your intended column count after JavaScript initializes
* Confirm image URLs load and alt text describes each photograph

For non-gallery theme settings, use the [full CSS reference](./css-reference-travel.md).
