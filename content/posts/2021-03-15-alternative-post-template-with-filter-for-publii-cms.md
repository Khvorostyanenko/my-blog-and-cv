---
template: post
title: "Alternative post template with filter for Publii CMS "
slug: /posts/alternative-post-template-with-filter-for-publii-cms
draft: false
priority: 0
date: 2021-03-15T12:44:07.439Z
description: On this stage Publii post have a role of post or page. Post have
  its own template for each posts. So we need to create alternative post
  template for special kind of posts and transfer there filter functional.
category: code
tags:
  - code
  - template
  - post template
  - publii
  - cms
  - static
  - filter
---
Guide for myself, based on official Publii Forum developers answers and documetation.

## Task

We have basic template with good filter functional (Mercury theme official Publii) on main page (index.html). According to design and UX logic, we need to change filters location and show it on second level pages. 

## Detail

On this stage Publii post have a role of post or page. Post have its own template for each posts. So we need to create alternative post template for special kind of posts and transfer there filter functional.

## Creating alternative post template

1. I created alternative post template **post-portfolio.hbs**

2. In config.json I added:

```
"postTemplates": {
  "portfolio": "portfolio filter"
},
```

Now our template is registered and we can choose which template to select when creating a post. 

3. Created a post, hide it, exclude it from main page and chose post template “portfolio filter”\
4. In alternative post template **post-portfolio.hbs** I copied all from default index.hbs (where filters were).\
5. I created three tags, three posts. To each post I added a tag.

### The difference between default post template and alternative

1. The post-portfolio template is an alternate post template and refers to the post context, so copying the index content to the new post template just won’t work. We need replacing **{{#each posts}}** to **{{#each @website.contentStructure.posts}}** in the alternative post template - would show all the cards/posts like the front page.\
2. In footer in script of filter code we need to add **post:** 

```
{{#is "index,tag,tags,author,post"}}
```

## Problem and solving 

Now our filter is working on alternative post template. But we have a problem that filter is showing all posts even without tags and hidden. How do we omit hidden posts ? 

How to omit posts that are marked as “hidden” or without any tag from the post listing by replacing: 

```
{{#each posts}}
   <article
```

with

```
{{#each @website.contentStructure.posts}}
    {{#unless isHidden}}
        {{#if mainTag}} <!-- mainTag will be empty if the post has no tags -->
            <article
```