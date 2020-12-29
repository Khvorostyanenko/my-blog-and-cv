---
template: post
title: E-commerce for handmade Batik Scarfs using Webpack + GitHub + Netlify
slug: /posts/batik-scarf
draft: false
priority: 1
date: 2020-12-29T10:33:29.981Z
description: Creation of a one-page online store (showroom) of handmade scarves
  using the Batik technique.
category: e-commerce
tags:
  - e-commerce
  - shop
  - keys
  - netlify
  - webpack
  - github
  - website
  - site
---

## Task

The client is a master and artist who creates handicrafts from silk using the batik technique. Each product is individual, in a single copy. Therefore, the client asked not to create a standard online store for hundreds of positions. I decided to focus on the uniqueness and individuality of the small cozy shop of the master, so I decided to leave the standard commercial online store in the direction of the showroom.

The client also asked not to use heavy management systems (cms) and refuse templating on Wordpress and Open Cart. Taking into account the wishes, it was decided to make a one-page static showroom based on clean code, with a minimal admin panel for editing the text of the existing content.

The target audience usually orders one piece of the product and discusses the details of the final result in advance. I took this moment into account and optimized the amount of work, saving the client's budget by abandoning the shopping cart. Products are ordered through the feedback form.

## Design development

The promo section (hero section), from the first seconds of being on the site, shows what the master is doing. The accent of the background is made using one of the works with scarves using the batik technique.

`video: title: "the accent of the background is made using the batik technique": /media/batik-scarf/desctop.mp4`

The creative theme deserves more than widespread Roboto font. I selected the fonts that maximally reflect the contours and lines made while working with scarves by the master himself. As a result, the fonts complement the image of the product and together with the background reveal the main message of the promo section.

Photos of the processes of creating a scarf by the hands of a master emphasizes the uniqueness of each product and handicraft.

## Adaptive

`video: title: "the site has an adaptive layout": /media/batik-scarf/adaptive-cards.mp4`

The site has an adaptive layout, which allows it to display correctly on all types of devices that exist today (tablets, mobile phones, personal computers). Product cards for mobile devices are different from the desktop version and are simplified to optimize download speed and interaction.

## Correct SEO site layout

From the first lines of code, the project is internally optimized, which is an integral part of SEO. The showroom structure consists entirely of semantic markup tags according to HTML5 standards. Header tags are used in the correct hierarchy and do not appear in unexpected blocks.\
\
Sitemap.xml is generated with each build of the project and sends requests to Google, Yandex, Bing automatically, on the Netlify side.

## Contact Forms

There are two types of contact forms on the site. One is responsible for sending data in order to get a discount. The second type of forms is responsible for ordering a specific product.\
\
The main question is: "How to show the manager which particular product card came from the purchase request?" Since the project is self-written and does not have a CMS under the hood, it was decided to "hang anchors" on each product card. Thus, when an order arrives by mail, the manager sees the full information of the form and from which particular card the order came.\
\
Sorting orders and convenient content management of forms is implemented through the connection of Netlify forms, and notifications about the order are sent to the manager not only in the admin panel, but also by mail and messenger (out of the box - Slack)\
\
Also, through Netlify, these forms can be generated into CSV tables and downloaded.

Forms are protected from spam through Netlify support from Google Recaptcha2.

## Technical solutions

I used a modular (component) approach to layout. The project is built using Webpack with configured basic code optimization (code minification, image optimization). The project uses:

- SCSS
- JS with Babel
- Stylelint, Eslint
- Prettier - for auto-formatting

It is a known fact that Google swears at its own map. Therefore, I made lazy loading Google Maps (using JS, the HTML block responsible for the map is loaded as you scroll to a specific area of the screen).\
\
Implemented a chat with an operator. Messages are sent to Telegram (you can connect more messengers), there you can choose an operator (if you have several managers). The chat uses forms to obtain primary information about the client (optional).

## Placing a project in the network

I chose the method of hosting the project, popular in the West, through the GitHub + Netlify bundle. Thus, it was possible to implement version control, for future improvements and understanding what happens in the project if different developers work.\
\
With each update of the repository code, the project is automatically assembled, with a detailed log on Netlify, after which the site is updated automatically. Thus, the stages of site updating were automated. The advantages of Netlify over standard hosting are described by many authors in Internet.\
\
The project works over the secure https protocol, which ensures the security of the data transmitted through it.

## Additional optimization

Basic optimization tuned through Webpack. At the build stage through Netlify, additional optimization is configured: file caching, font loading strategy.

Lighthouse testing occurs automatically during build on the Netlify side and you can see the results in the build log.
