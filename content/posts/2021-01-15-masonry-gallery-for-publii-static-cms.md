---
template: post
title: "Masonry gallery for Publii static CMS "
slug: /posts/masonry-gallery-for-publii
draft: false
priority: 1
date: 2021-01-15T16:43:37.164Z
description: Publii gallery has standart grid gallery, so we will modify it into masonry
category: code
tags:
  - code
  - css
  - publii
  - cms
  - masonry
  - gallery
---
# Introduction

[Publii](https://getpublii.com/) is a static website content management system and rendering engine, with built-in FTP synchronization.

Publii uses Photoswipe for gallery. Photoswipe creates responsive galleries that work on all devices and screen sizes, and it has full touch support so you can open, zoom and switch images with just a few gestures.

![photoswipe gallery](/media/photoswipe.jpg "photoswhipe gallery")

It's fast too. Photoswipe implements many features to get users to the photos they want as quickly as possible. Lazy-loading preloads images, and if the connection isn't the best it can display them progressively or use the thumbnail as a placeholder while loading finishes.  

## I want masonry

Photoswipe uses ordinary grid "from the box". Publii also uses this grid and it looks boring in the world, where a lot of websites uses masonry. WordPress has masonry plugin using photoswipe. But, at this moment, Publii is not using plugins at all, so we will do it with hands.

## what to choose: pure css method or famous js libs?

From this moment, I will do test case, using pure CSS method. I know that browsers support is not the best at this moment, but we will try. 

When you upload images into the gallery, Publii generates a `<figure>` element for each image and the caption is generated without any class into a `<figcaption>` element. All these items are packed into two `<div>` containers as they are required to apply the two available gallery layout options: --wide and --full:

```
.gallery-wrapper {}
.gallery-wrapper--wide {}
.gallery-wrapper--full {}
.gallery {}
.gallery__item {}
```

The generated HTML markup:

```html
<div class="gallery-wrapper gallery-wrapper--wide">
    <div class="gallery">
       <figure class="gallery__item">
          <a href="original-image.jpg">
              <img src="thumbnail.jpg">
          </a>
          <figcaption> Caption </figcaption>
       </figure>
   </div>
</div>
```

### So I went to main.css file and changed it in this way:

```
.gallery {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-column-gap: 0;
  -moz-column-gap: 0;
  column-gap: 0;
  position: relative;
  margin: calc(1.7rem + 1vw) -0.2833333333rem;
}
```

### Next step - adaptive and multi column set:

```
@media all and (min-width: 20em) {
  .gallery {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media all and (min-width: 56.25em) {
  .gallery-wrapper--wide {
    margin-left: calc(-1 * var(--page-margin));
    margin-right: calc(-1 * var(--page-margin));
  }
  .gallery-wrapper--wide .gallery {
    width: calc(100% + 0.5666666667rem);
  }
}
.gallery-wrapper--full {
  margin-left: calc(-48vw + 50%);
  margin-right: calc(-48vw + 50%);
}
@media all and (min-width: 20em) {
  .gallery[data-columns="1"] {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}
@media all and (min-width: 30em) {
  .gallery[data-columns="2"] {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media all and (min-width: 37.5em) {
  .gallery[data-columns="3"] {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}
@media all and (min-width: 56.25em) {
  .gallery[data-columns="4"] {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
}
@media all and (min-width: 56.25em) {
  .gallery[data-columns="5"] {
    -webkit-column-count: 5;
    -moz-column-count: 5;
    column-count: 5;
  }
}
```

### status

it looks good now. Will test this way and if browser support is not enough, will try js libs way.

![masonry photoswipe](/media/masonry-photoswipe.jpg "masonry photoswipe")