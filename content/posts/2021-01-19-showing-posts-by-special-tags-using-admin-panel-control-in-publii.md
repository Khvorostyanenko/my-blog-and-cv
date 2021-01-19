---
template: post
title: Showing posts by special tags using admin panel control in Publii
slug: /posts/post-by-tag-publii
draft: false
priority: 0
date: 2021-01-19T16:29:20.344Z
description: "Guide, based on official Publii Forum developers answers and documetation. "
category: code
tags:
  - code
  - component
  - config
  - publii
  - cms
  - static
---
Guide for myself, based on official Publii Forum developers answers and documetation.

## Task

Special section on first page, that will show only posts, based on special tags, that we will choose and use from CMS user panel. Fully controled tags options. 

## Creating a component

In directory themes/my-theme/partials create **tag-list.hbs** component: 

```
<h2 class="hero">{{@config.custom.TagsDropdownTitle}}</h2>

<div
	class="{{#checkIf @config.custom.layoutTags '==' "grid"}}l-grid {{@config.custom.layoutTagsGrid}} {{else}}l-masonry {{@config.custom.layoutTagsMasonry}}{{/checkIf}}">
	{{#getPostsByTags (concatenate "count=5&allowed=hidden,featured&tag_as=id" "&tags=" @config.custom.TagsDropdown
 "&orderby=modifiedAt&ordering=asc")}}

	<article class="c-card{{#isFeatured}} c-card--featured{{/isFeatured}}">
		{{#featuredImage}}
		{{#if url}}
		<a href="{{../url}}" class="c-card__image">
			<img src="{{url}}" {{#if @config.site.responsiveImages}}
				{{responsiveImageAttributes 'featuredImage' srcset sizes}} {{/if}} {{ lazyload "lazy" }} height="{{height}}"
				width="{{width}}" alt="{{alt}}">
		</a>
		{{/if}}
		{{/featuredImage}}
		<div class="c-card__wrapper">
			<h2 class="c-card__title">
				<a href="{{url}}" class="invert">
					{{title}}
				</a>
			</h2>
			<p class="c-card__text">{{{ excerpt }}}</p>
		</div>
	</article>
	{{/getPostsByTags}}
</div>
```



**{{@config.custom.TagsDropdownTitle}} -** will generate title, which we will write in special field from the user panel. 

**@config.custom.TagsDropdown -** will generate tags, that we will choose from the user panel 

**\#getPostsByTags -** will call and show posts by special tags

**count** - how many posts should be included in the result

**allowed** - which post statuses should be included

**tags** - which tags should be used

**excluded** - which posts should be excluded

**offset** - how many posts to skip

**orderby** - order field

**ordering** - order direction

**tag_as** - specify if we select by tag id or slug

**operator** - available values **AND** and **OR** - is used to specify if all tags should be connected with specific post (**AND**) or if there should be selected posts which contains at least one of the given tags (**OR**)

## Creating options in user panel 

In directory themes/my-theme/ in **config.json**: \
\
Find  **"customConfig" and add:**

```
    {
      "name": "TagsDropdown",
      "label": "Special tags post section",
      "group": "Frontpage",
      "note": "Display posts from the selected tag/s",
      "value": "",
      "type": "tags-dropdown",
      "multiple": true
    },
    {
      "name": "TagsDropdownTitle",
      "label": "Write title",
      "group": "Frontpage",
      "note": "Display tags section title",
      "value": "",
      "type": "textarea"
    },
```

This will add a dropdown menu with multiple choice of adding tags 

![tags-dropdown](/media/tags_dropdown_1.jpg "tags dropdown")

## Put the component in right place 

In our case we will call our component in frontpage in index.hbs file 

![tag-list-component](/media/tag-list_call.jpg "tag-list component")