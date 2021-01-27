---
template: post
title: Travel blog slider with anime.js for Publii CMS
slug: /posts/travel-slider-for-publii
draft: false
priority: 1
date: 2021-01-27T15:28:51.809Z
description: The idea is to animate an SVG frame while we transition from one
  slide to another
category: code
tags:
  - code
  - slider
  - blog
  - publii
  - cms
  - static
  - animation
---
## Idea

I need to show featured posts on frontpage with travel animation and slider. I will take the idea to animate an SVG frame while we transition from one slide to another. I animate a circular shape to make it look like we are “focussing” on a specific place in the map. The map is added to the same SVG:

`video: title: "travel blog slider with anime js for Publii CMS": /media/travel-slider/travel-slider.mp4`

## Additions

I am using [anime.js](http://anime-js.com/) for the animations.

## Lets start

I will create a slider component **(posts-slider.hbs)** and will put in partials directory:  

```
<section class="posts-slider loading">
	<div class="slideshow">
		<div class="slides slides--images">
			{{#getPostsByTags (concatenate "count=1&tag_as=id" "&tags="@config.custom.SliderTagDropdown
 "&orderby=modifiedAt&ordering=asc")}}
			<div class="slide slide--current">
				<div class="slide__img">
					{{#featuredImage}}
					{{#if url}}
					<a href="{{../url}}">
						<img src="{{url}}">
					</a>
					{{/if}}
					{{/featuredImage}}
				</div>
			</div>
			{{/getPostsByTags}}
			{{#each featuredPosts}}
			<div class="slide">
				<div class="slide__img">
					{{#featuredImage}}
					{{#if url}}
					<a href="{{../url}}">
						<img src="{{url}}">
					</a>
					{{/if}}
					{{/featuredImage}}
				</div>
			</div>
			{{/each}}
		</div>

		<div class="slides slides--titles">
			{{#getPostsByTags (concatenate "count=1&tag_as=id" "&tags=" @config.custom.SliderTagDropdown
 "&orderby=modifiedAt&ordering=asc")}}
			<div class="slide slide--current">
				<h2 class="slide__title">
					<a class="slide-link" href="{{url}}">
						{{title}}
					</a>
				</h2>
			</div>
			{{/getPostsByTags}}
			{{#each featuredPosts }}
			<div class="slide">
				<h2 class="slide__title">
					<a class="slide-link" href="{{url}}">
						{{title}}
					</a>
				</h2>
			</div>
			{{/each}}
		</div>

		<nav class="slidenav">
			<a class="slidenav__item slidenav__item--prev">&#5176;</a>
			<a class="slidenav__item slidenav__item--next">&#5171;</a>
		</nav>
	</div>
</section>
```

## Сontent management:

\
I did two types of content management in slider for better control of showing content: 

\- First slide is adding a post with special tag 

\- Other slides are adding posts which are marked as featured \
\
The order of featured slides is the same as common option for featured posts (in my case I am contoling them on date of creation number.

**\#getPostsByTags in first slide  -** will show controled post from special tag

**@config.custom.SliderTagDropdown -** our custom menu for tags in Publii admin panel 

**{{#each featuredPosts }}** - this will add featured posts in next slides

## Add additional files

In footer.hbs will add links to **anime.js** and **slider.js** : 

```
<script defer src="{{js "anime.min.js"}}"></script>
<script defer src="{{js "frontpage-slider.js"}}"></script>
```

## Slider.js

```
{
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(minValue, maxValue, precision) {
    if (typeof precision == "undefined") {
      precision = 2;
    }
    return parseFloat(
      Math.min(
        minValue + Math.random() * (maxValue - minValue),
        maxValue
      ).toFixed(precision)
    );
  }

  // From https://davidwalsh.name/javascript-debounce-function.
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  class Slideshow {
    constructor(el) {
      this.DOM = {};
      this.DOM.el = el;
      this.settings = {
        animation: {
          slides: {
            duration: 400,
            easing: "easeOutQuint",
          },
          shape: {
            duration: 400,
            easing: { in: "easeOutQuint", out: "easeInQuad" },
          },
        },
        frameFill: "#000",
      };
      this.init();
    }
    init() {
      this.DOM.slides = Array.from(
        this.DOM.el.querySelectorAll(".slides--images > .slide")
      );
      this.slidesTotal = this.DOM.slides.length;
      this.DOM.nav = this.DOM.el.querySelector(".slidenav");
      this.DOM.titles = this.DOM.el.querySelector(".slides--titles");
      this.DOM.titlesSlides = Array.from(
        this.DOM.titles.querySelectorAll(".slide")
      );
      this.DOM.nextCtrl = this.DOM.nav.querySelector(".slidenav__item--next");
      this.DOM.prevCtrl = this.DOM.nav.querySelector(".slidenav__item--prev");
      this.current = 0;
      this.createFrame();
      this.initEvents();
    }
    createFrame() {
      this.rect = this.DOM.el.getBoundingClientRect();
      this.frameSize = this.rect.width / 12;
      this.paths = {
        initial: this.calculatePath("initial"),
        final: this.calculatePath("final"),
      };
      this.DOM.svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      this.DOM.svg.setAttribute("class", "shape");
      this.DOM.svg.setAttribute("width", "100%");
      this.DOM.svg.setAttribute("height", "100%");
      this.DOM.svg.setAttribute(
        "viewbox",
        `0 0 ${this.rect.width} ${this.rect.height}`
      );

      const imgFillSize = this.calculateImgFillSizes();
      this.DOM.svg.innerHTML = `
                <defs>
                    <clipPath id="shape__clip">
                        <path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>
                    </clipPath>
                </defs>
                <image xlink:href="media/files/map.png" clip-path="url(#shape__clip)" x="0" y="0" width="${imgFillSize.width}px" height="${imgFillSize.height}px"/>
            `;
      this.DOM.el.insertBefore(this.DOM.svg, this.DOM.titles);
      this.DOM.shape = this.DOM.svg.querySelector("path");
      this.DOM.imgFill = this.DOM.svg.querySelector("image");
    }
    calculateImgFillSizes() {
      const ratio = Math.max(this.rect.width / 1920, this.rect.height / 1140);
      return { width: 1920 * ratio, height: 1140 * ratio };
    }
    updateFrame() {
      this.paths.initial = this.calculatePath("initial");
      this.paths.final = this.calculatePath("final");
      this.DOM.svg.setAttribute(
        "viewbox",
        `0 0 ${this.rect.width} ${this.rect.height}`
      );
      this.DOM.shape.setAttribute(
        "d",
        this.isAnimating ? this.paths.final : this.paths.initial
      );
      const imgFillSize = this.calculateImgFillSizes();
      this.DOM.imgFill.setAttribute("width", `${imgFillSize.width}px`);
      this.DOM.imgFill.setAttribute("height", `${imgFillSize.height}px`);
    }
    calculatePath(path = "initial") {
      const r = Math.sqrt(
        Math.pow(this.rect.height, 2) + Math.pow(this.rect.width, 2)
      );
      const rInitialOuter = r;
      const rInitialInner = r;
      const rFinalOuter = r;
      const rFinalInner = (this.rect.width / 3) * getRandomFloat(0.2, 0.4);
      const getCenter = () =>
        `${getRandomInt(
          rFinalInner,
          this.rect.width - rFinalInner
        )}, ${getRandomInt(rFinalInner, this.rect.height - rFinalInner)}`;
      return path === "initial"
        ? `M ${this.rect.width / 2}, ${
            this.rect.height / 2
          } m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${
            rInitialOuter - rInitialInner
          } a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z`
        : `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${
            rFinalOuter - rFinalInner
          } a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
    }
    initEvents() {
      this.DOM.nextCtrl.addEventListener("click", () => this.navigate("next"));
      this.DOM.prevCtrl.addEventListener("click", () => this.navigate("prev"));

      window.addEventListener(
        "resize",
        debounce(() => {
          this.rect = this.DOM.el.getBoundingClientRect();
          this.updateFrame();
        }, 20)
      );

      document.addEventListener("keydown", (ev) => {
        const keyCode = ev.keyCode || ev.which;
        if (keyCode === 37) {
          this.navigate("prev");
        } else if (keyCode === 39) {
          this.navigate("next");
        }
      });
    }
    navigate(dir = "next") {
      if (this.isAnimating) return false;
      this.isAnimating = true;

      const animateShapeIn = anime({
        targets: this.DOM.shape,
        duration: this.settings.animation.shape.duration,
        easing: this.settings.animation.shape.easing.in,
        d: this.calculatePath("final"),
      });

      const animateSlides = () => {
        return new Promise((resolve, reject) => {
          const currentSlide = this.DOM.slides[this.current];
          anime({
            targets: currentSlide,
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            translateY:
              dir === "next" ? -1 * this.rect.height : this.rect.height,
            complete: () => {
              currentSlide.classList.remove("slide--current");
              resolve();
            },
          });

          const currentTitleSlide = this.DOM.titlesSlides[this.current];
          anime({
            targets: currentTitleSlide.children,
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            delay: (t, i, total) =>
              dir === "next" ? i * 100 : (total - i - 1) * 100,
            translateY: [0, dir === "next" ? -100 : 100],
            opacity: [1, 0],
            complete: () => {
              currentTitleSlide.classList.remove("slide--current");
              resolve();
            },
          });

          this.current =
            dir === "next"
              ? this.current < this.slidesTotal - 1
                ? this.current + 1
                : 0
              : this.current > 0
              ? this.current - 1
              : this.slidesTotal - 1;

          const newSlide = this.DOM.slides[this.current];
          newSlide.classList.add("slide--current");
          anime({
            targets: newSlide,
            duration: this.settings.animation.slides.duration,
            easing: this.settings.animation.slides.easing,
            translateY: [
              dir === "next" ? this.rect.height : -1 * this.rect.height,
              0,
            ],
          });

          const newSlideImg = newSlide.querySelector(".slide__img");
          anime.remove(newSlideImg);
          anime({
            targets: newSlideImg,
            duration: this.settings.animation.slides.duration * 4,
            easing: this.settings.animation.slides.easing,
            translateY: [dir === "next" ? 100 : -100, 0],
          });

          const newTitleSlide = this.DOM.titlesSlides[this.current];
          newTitleSlide.classList.add("slide--current");
          anime({
            targets: newTitleSlide.children,
            duration: this.settings.animation.slides.duration * 2,
            easing: this.settings.animation.slides.easing,
            delay: (t, i, total) =>
              dir === "next" ? i * 100 + 100 : (total - i - 1) * 100 + 100,
            translateY: [dir === "next" ? 100 : -100, 0],
            opacity: [0, 1],
          });
        });
      };

      const animateShapeOut = () => {
        anime({
          targets: this.DOM.shape,
          duration: this.settings.animation.shape.duration,
          //delay: 100,
          easing: this.settings.animation.shape.easing.out,
          d: this.paths.initial,
          complete: () => (this.isAnimating = false),
        });
      };

      animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
    }
  }

  new Slideshow(document.querySelector(".slideshow"));
  imagesLoaded(".slide__img", { background: true }, () =>
    document.body.classList.remove("loading")
  );
}
```

## Anime.js

Js code we can take [here](https://animejs.com/)

## Lets add some CSS

```
.posts-slider {
  --fontsize-stitle: 4vw;
}

.slide-link {
  text-decoration: none;
  color: var(--white);
  outline: none;
  display: flex;
  margin-left: 5%;
  width: 65%;
}

.slide-link:hover,
.slide-link:focus {
  color: var(--yellow);
  outline: none;
}

.slideshow {
  width: 100%;
  height: calc(230px + 270 * (100vw / 1200));
  position: relative;
  overflow: hidden;
}

.slides {
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.slide--current {
  opacity: 1;
  pointer-events: auto;
}

.slide__img {
  position: absolute;
  background-size: cover;
  background-position: 50% 50%;
}

.slidenav {
  position: absolute;
  width: 100%;
  bottom: 5%;
  text-align: center;
  padding: 1.4em;
  font-size: 1.2em;
}

.slidenav__item {
  border: 0;
  background: none;
  font-weight: bold;
  color: var(--white);
  cursor: pointer;
  padding: 2.5em;
}

.slidenav__item:focus {
  outline: none;
}

.slidenav__item:hover {
  color: var(--yellow);
}

.shape {
  position: absolute;
  width: 100%;
  height: 100%;
  fill: var(--color-shape-fill);
  top: 0;
  pointer-events: none;
}

.slide__title {
  position: relative;
  font-size: var(--fontsize-stitle);
  margin: 0;
  cursor: default;
  line-height: 1;
  color: var(--white);
}
```

## Custom control in admin panel

In **config.json** file in  **customConfig:** 

```
{
  "name": "SliderTagDropdown",
  "label": "Special tag first slide",
  "group": "Frontpage-Slider",
  "note": "Display post from the selected tag in first slide",
  "value": "",
  "type": "tags-dropdown",
  "multiple": false
},
```

This will add such a contol option in admin panel in theme options:\
\
`video: title: "travel blog slider with anime js for Publii CMS": /media/travel-slider/slider-panel.mp4`