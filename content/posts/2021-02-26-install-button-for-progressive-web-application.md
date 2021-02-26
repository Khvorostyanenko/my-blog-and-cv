---
template: post
title: Install button for progressive web application
slug: /posts/install-button-for-progressive-web-application
draft: false
priority: 0
date: 2021-02-26T17:27:38.164Z
description: "it is not obviously for user how to install progressive web
  application. Even after Chrome developers but the icon in browser search
  feald, not everyone can find it or notice it at all. So we will help people to
  find and install our PWA. "
category: PWA
tags:
  - code
  - pwa
  - app
  - publii
  - cms
  - static
---
It is not obviously for user how to install progressive web application. Even after Chrome developers put the icon in browser search feald, not everyone can find it or notice it at all. So we will help people to find and install our PWA. 

![travelchem progressive web app promo](/media/pwa_travelchem_promo.png "travelchem progressive web app promo")

I will use this [example](https://web.dev/codelab-make-installable/) of Pete LePage. I found it good for my case.\
I already have website with PWA. Now I will create the promo section of web app: 

```
<div id="installContainer" class="app__wrapper hidden-pwa">
   <div class="app__promo">
      <h2>
         {{@config.custom.AppPromoTitle}}
      </h2>
      <p>
         {{@config.custom.AppPromoText}}
      </p>
      <button id="butInstall" type="button" class="app__button">
         установить
      </button>
   </div>
   <div class="app__photo">
      <img src="{{@config.custom.AppPromoLogo}}" alt="{{@website.name}}">
   </div>
</div>
```

**Handlebars components**, which are controlled from Publii CMS **admin panel** : 

{{@config.custom.AppPromoTitle}} - control promo title 

{{@config.custom.AppPromoText}} - control promo text

{{@config.custom.AppPromoLogo}}"- control promo image

In **CSS file** of project : 

```
/* App promo */

.app__wrapper {
  display: flex;
  padding: 6%;
}

.app__promo {
  max-width: 60%;
}

#installContainer {
  align-items: center;
}

.hidden-pwa {
  display: none !important;
}

.app__button {
  margin-top: 5%;
}
```

Java Script functional: 

## Listen for the beforeinstallprompt event

When the browser fires the `beforeinstallprompt` event, that's the indication that the Progressive Web App can be installed and an install button can be shown to the user. The `beforeinstallprompt` event is fired when the PWA meets the [installability criteria](https://web.dev/install-criteria/).

```
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle('hidden', false);
});
```

## Handle the install button click

To show the install prompt, call `prompt()` on the saved `beforeinstallprompt` event. Calling `prompt()` is done in the install button click handler because `prompt()` must be called from a user gesture.

```
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  divInstall.classList.toggle('hidden', true);
});
```

## Track the install event

Installing a Progressive Web App through an install button is only one way users can install a PWA. They can also use Chrome's menu, the mini-infobar, and through [an icon in the omnibox](https://web.dev/promote-install/#browser-promotion). You can track all of these ways of installation by listening for the `appinstalled` event.

```
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
```

In conclusion we have a promo install button which will be shown if user dont have our app, and will be hidden if our user already installed the app. I have also hidden it from mobile version, because there we will use default android pop up. 

`video: title: "Progressive web app for Travelchem": /media/pwa/pwa_travelchem.mp4`