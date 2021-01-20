---
template: post
title: Breadcrumbs for Publii
slug: /posts/breadcrumbs-for-publii
draft: false
priority: 0
date: 2021-01-20T14:52:10.076Z
description: "Guide, based on official Publii Forum developers answers and documetation. "
category: code
tags:
  - code
  - breadcrumbs
  - css
  - html
  - publii
  - cms
  - static
  - seo
---
Guide for myself, based on official Publii Forum developers answers and documetation. 

## SEO friendly 

There is no breadcrumbs  functional "from the box" in Publii. Google supports three formats for transferring structured data - JSON-LD, Microdata, RDFa. It is recommended to use Microdata and RDFa for decorating breadcrumbs. \
\
So we will do it in Microdata format : 

in **post.hbs**:   

```
<ol class="breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="{{@website.url}}">
      <span itemprop="name">Home</span></a>
    <meta itemprop="position" content="1" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemscope itemtype="https://schema.org/WebPage" itemprop="item" itemid="{{mainTag.url}}"
      href="{{mainTag.url}}">
      <span itemprop="name">{{mainTag.name}}</span></a>
    <meta itemprop="position" content="2" />
  </li>
  ›
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <span itemprop="name">{{title}}</span>
    <meta itemprop="position" content="3" />
  </li>
</ol>
```

Lets make our breadcrumbs pretty and in **main.css** will add some styles: 

```
.breadcrumbs {
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
}

.breadcrumbs li {
  padding-right: 0.5rem;
}

.breadcrumbs li:nth-child(1) {
  padding-left: 0;
}
```

\
**Important**: Including the current page with no link to it at the end of the duplicate navigation is a good practice\
\
**Result:**  

![breadcrumbs](/media/breadcrumbs.jpg "breadcrumbs for Publii")