---
template: post
title: Photographer full-screen business card website
slug: /posts/photographer-full-screen-business-card-website
draft: false
priority: 0
date: 2021-06-02T16:05:18.579Z
description: Highly optimized loading speed and SEO-friendly set of
  functionality. A photographer's website involves a lot of photo content.
category: case
tags:
  - business card
  - cms
  - case
  - netlify
  - publii
  - website
  - site
---
## **Task**

The client - photographer, who is oriented towards modern technological trends.

**Wishes:** modern design solutions. Lack of clutter and ease of content orientation, dark colors. To show the works as simply and efficiently as possible.

Highly optimized loading speed and SEO-friendly set of functionality. A photographer's website involves a lot of photo content.

[visit website](https://koolkat.photography/)

## **Design development and content management**

Since the main goal is to quickly show your works, it was decided to take as a basis the site model - a business card solution. The modern solution is a full-screen site. Small wow - effect due to custom cursor with reversible color change.

The site is a one-page, maximally simplified. Each subsequent section is hidden from view and appears on click with effective animation.

![main full-screen](/media/main.gif)

## **Navigation and sections control**

**creating a menu on the CMS side:** a separate section for the menu with the ability to create nesting levels 

![menu admin](/media/menu_nav.gif)

**the control of “contact” and "about" sections on the side of the CMS:** a separate panel for each section in the admin panel. In the "About" section you can change the avatar and text. In the contact section, you can change the links of the relevant social media and email.

![menu sections ](/media/sections_menu.gif)

## **Gallery Sections**

The most important element on a photographer's business card site is his product, so special attention was paid to the functionality of the galleries. Each of the galleries appears by clicking on the menu with effective animation. Photos are laid out in a trendy masonry style. The gallery functionality is implemented using the Photoswipe library, which supports zoom, touch, switching and has huge adaptive bonuses, which will be discussed below.

![gallery front](/media/gallery_front.gif)

**Possibilities of managing the layout of galleries from the admin panel:** the gallery editor provides ample opportunity to control the photostream. When adding a gallery in the editor of the article, you can select the width of the layout of the photos, as well as the number of columns. For more precise control of the layout in the gallery, you can move the photo either with arrows or by dragging to get more beautiful masonry layouts.

![gallery admin](/media/gallery_admin.gif)

## **Responsiveness and speed optimization**

The site has an adaptive layout, which allows it to be displayed correctly on all types of devices that exist today (tablets, mobile phones, personal computers).

\- Navigation: responsive, shape-shifting navigation.

\- Images: custom images, when added to the site, are automatically cut in proportions for desktop, tablet, and mobile versions and automatically substituted depending on the width of the screen. Thus, huge photos will not be loaded on mobile devices and an extra resource will not be wasted, which significantly increases the speed and is loved by all search engines. The client does not need to do anything, everything is done automatically with the settings from the admin panel to adjust the level of photo quality.

\- Galleries: automatically replace photo thumbnails, original photos are loaded when you click and open a photo in the gallery. The same effect of increasing the loading speed as in the case of single images.

\- Lazyloading while scrolling and loading content.

\- HTML, CSS compression of files during deployment

**Lighthouse speed test:** desktop

![lighthouse test desktop](/media/lighthouse_desk.gif)

**Lighthouse speed test:** mobile

![lighthouse test mobile](/media/lighthouse_mob.gif)

## **Correct SEO site layout**

\- From the first lines of code, the project is internally optimized, which is an integral part of SEO. The structure of the blog consists entirely of semantic markup tags according to HTML5 standards. Header tags are used in the correct hierarchy and do not appear in unexpected blocks.

\- Sitemap.xml is generated with each build of the project.

## **Technical solutions**

\- I use a modular (component) approach to layout.

\- Components are created and reused with Handlebars.js and are built into the CMS engine itself

\- The project was implemented using the latest trends in the field of Static Website

\- Lack of databases and replacing them with the principles of static websites

\- Content management using a desktop application on a computer

\- Deploy to the popular static site service Netlify

\- Direct synchronization with hosting with one button

\- Ability to edit and test content locally without using the Internet

\- HTTPS protocol

\- Fast admin panel written in Electron and Vue.js

## **Placing a project on the network**

I chose the method of project placement, popular in the West, through the CMS App + Netlify bundle. All content is stored locally on your computer. Synchronization with the Netlify static website service is configured once and then each content update is synchronized with one button. The advantages of Netlify over standard hosting are described by many authors on the Internet.\
\
The project works over the secure https protocol, which ensures the security of the data transmitted through it.