---
template: post
title: Sticky Sidebar with admin panel control for Publii
slug: /posts/sticky-sidebar-with-admin-panel-control-for-publii
draft: false
priority: 0
date: 2021-02-02T09:46:25.901Z
description: sticky sidebar with author info, photo, special tags, newsletter
  subscription, social media buttons. It will be shown on desktop and tablet and
  we will switch from sticky to section for mobile version. All the content
  control of the sidebar I will have from admin panel
category: code
tags:
  - code
  - sidebar
  - blog
  - publii
  - cms
  - static
  - sticky
---
## Task

I have some space in posts listing and I need to fill it with functional that will follow user while posts listing. So I will create a sticky sidebar with author info, photo, special tags, newsletter subscription, social media buttons. It will be shown on desktop and tablet and we will switch from sticky to section for mobile version. All the content control of the sidebar I will have from admin panel. \
\
`video: title: "admin panel for sidebar control menu for Publii CMS": /media/sidebar/sticky-sidebar.mp4`

## HTML and CSS

First, I will give a common wrapper to my posts listing section **<div class="post-list__wrapper"></div>**

Lets add our sidebar with author info, photo, special tags, newsletter subscription, social media buttons: 

```
<div class="sidebar-right">
  <div class="sidebar-right__photo">
     <img src="{{@config.custom.sidebarLogo}}" alt="{{@website.name}}">
  </div>
  <div class="sidebar-right__text">
     <p class="sidebar-right__text">{{@config.custom.SidebarText}}</p>
  </div>
  <ul class="post__tag">
     {{#getTags (concatenate  "&tags="@config.custom.SidebarTagsDropdown) "<div>" "</div>"}}
     <li>
        <a href="{{ url }}">{{ name }}</a>
     </li>
     {{/getTags}}
  </ul>
  {{#if @config.custom.newsletter}}
  <section class="newsletter box">
     {{{@config.custom.newsletterFormCode}}}
  </section>
  {{/if}}
  <div class="sidebar-right__social">
     {{> footer-social}}
  </div>
</div>
```

**{{@config.custom.sidebarLogo}} -** will add custom logo(photo) field from admin panel

**{{@config.custom.SidebarText}} -**  will add custom text field from admin panel

**\#getTags -** will call special tags

\
**"&tags="@config.custom.SidebarTagsDropdown -** will add custom tags dropdown from admin panel

**{{#if @config.custom.newsletter}}{{/if}} -** if newsletter button is on, then will show custom field with\
newsletter form 

**{{> footer-social}} -**  adding social media buttons component

### Adding styles

```
.post-list__wrapper {
  display: flex;
  justify-content: space-between;
}

.main {
  width: 70%;
}

.sidebar-right {
  width: 25%;
  height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 10%;
}

.sidebar-right__text {
  font-size: 0.8rem;
  line-height: 1.1rem;
  margin-bottom: calc(1rem + 0.5vw);
}

.sidebar-right nav {
  display: flex;
}

.sidebar-right nav button {
  margin: 4% 2% 2% 0;
}

.sidebar-right nav button a {
  color: var(--white);
}

.sidebar-right__photo {
  display: flex;
  justify-content: center;
}

.sidebar-right .post__tag {
  margin-bottom: 0.5rem;
}

.box {
  border-bottom: none !important;
  /* margin-top: 2.4285714286rem;
  padding-top: 1.9428571429rem; */
  padding-bottom: 0 !important;
}
.sidebar-right .box:first-child {
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}

.box ul {
  margin: 0;
}

.newsletter {
  color: var(--black);
  font-size: 0.7724761953rem;
  line-height: 1.3;
  margin-bottom: 0.4857142857rem;
}
.newsletter__description {
  margin-bottom: 0.7285714286rem;
}
.newsletter input {
  margin-top: 0.4857142857rem;
  font-size: 0.8rem;
  padding: 0.6rem 0.75rem;
  width: 100%;
}
.newsletter label {
  display: block;
  margin: 0.4857142857rem 0 0;
}
.newsletter ul {
  margin: 0.7285714286rem;
}
.newsletter ul li {
  padding: 0;
  list-style: none;
  position: relative;
}
.newsletter ul li input[type="checkbox"] {
  left: 0;
  width: 0.9714285714rem;
}
.newsletter ul li label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: var(--font-weight-normal);
}
.newsletter ul li label:before {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.sidebar-right__social {
  text-align: center;
}

@media screen and (max-width: 767px) {
  .sidebar-right {
    display: none;
  }

  .sidebar-mobile {
    display: block;
    text-align: center;
    margin-top: 4em;
  }

  .main {
    width: 100%;
  }

  .newsletter {
    width: 40%;
    margin: auto;
  }
}

@media screen and (min-width: 767px) {
  .sidebar-mobile {
    display: none;
  }
}
```

## Customizing admin panel for sidebar control menu

In **config.json** file in **custom config** : 

```
{
  "name": "SidebarTagsDropdown",
  "label": "Special tags for sidebar list",
  "group": "Sidebar-right",
  "note": "Display list in sidebar from the selected tag/s",
  "value": "",
  "type": "tags-dropdown",
  "multiple": true
},
{
  "name": "sidebarLogo",
  "label": "Sidebar logo",
  "group": "Sidebar-right",
  "note": "Display sidebar photo",
  "value": "",
  "type": "upload",
  "upload": true
},
{
  "name": "SidebarText",
  "label": "Text about authors",
  "group": "Sidebar-right",
  "value": "",
  "type": "textarea"
},
{
  "name": "newsletter",
  "label": "Newsletter",
  "group": "Sidebar-right",
  "value": true,
  "type": "checkbox"
},
{
  "name": "newsletterFormCode",
  "group": "Sidebar-right",
  "label": "Tablet and desktop version",
  "note": "Before pasting your code here, learn how to make your newsletter form as functional and visually-appealing as possible. <a href=\"https://getpublii.com/docs/make-newsletter-form-functional-and-visually-appealing.html\" target=\"_blank\">Learn more</a>",
  "value": "<form>...",
  "type": "textarea",
  "dependencies": [
    {
      "field": "newsletter",
      "value": "true"
    }
  ]
},
{
  "name": "newsletterFormCodeMobile",
  "group": "Sidebar-right",
  "label": "Mobile audience",
  "note": "Before pasting your code here, learn how to make your newsletter form as functional and visually-appealing as possible. <a href=\"https://getpublii.com/docs/make-newsletter-form-functional-and-visually-appealing.html\" target=\"_blank\">Learn more</a>",
  "value": "<form>...",
  "type": "textarea",
  "dependencies": [
    {
      "field": "newsletter",
      "value": "true"
    }
  ]
},
```

How it looks in admin panel : 

`video: title: "admin panel for sidebar control menu for Publii CMS": /media/sidebar/sidebar_admin-panel.mp4 `\
``\
How it looks on the site: 

![Sticky Sidebar with admin panel control for Publii](/media/sticky-sidebar.jpg "Sticky Sidebar with admin panel control for Publii")