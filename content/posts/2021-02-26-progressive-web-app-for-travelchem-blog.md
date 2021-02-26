---
template: post
title: Progressive web app for Travelchem blog
slug: /posts/progressive-web-app-for-travelchem-blog
draft: false
priority: 0
date: 2021-02-26T12:27:31.778Z
description: We created Travelchem blog, fully responsive website for travelers.
  Now lets give an opportunity for this resource to be downloadable, with push
  notifications, ios and android friendly.
category: PWA
tags:
  - code
  - pwa
  - app
  - publii
  - cms
  - static
---
We created Travelchem blog, fully responsive website for travelers. Now lets give an opportunity for this resource to be downloadable, with push notifications, ios and android friendly.

`video: title: "Progressive web app for Travelchem": /media/pwa/pwa_travelchem.mp4`

## Service worker

Service worker technology allows website to be online even when the server is unavailable. This is such an intermediary between the client and the server, which intercepts each request and, in which case, shoves data from the cache as a response.\
\
I am using service worker with the Advanced caching: 

in root folder **pwabuilder-sw.js** with this **code:** 

```
//This is the service worker with the Advanced caching

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const HTML_CACHE = "html";
const JS_CACHE = "javascript";
const STYLE_CACHE = "stylesheets";
const IMAGE_CACHE = "images";
const FONT_CACHE = "fonts";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "document",
  new workbox.strategies.NetworkFirst({
    cacheName: HTML_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: JS_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: STYLE_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: IMAGE_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "font",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: FONT_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

```

\
I took this advanced caching SW from [pwabuilder ](https://www.pwabuilder.com/serviceworker)

\- Next step is to add a script to register a service worker. I will not add it direct in HTML. Lets create **app.js** file and add it in **head section**

```
if (navigator.serviceWorker.controller) {
  console.log("[PWA Builder] active service worker found, no need to register");
} else {
  navigator.serviceWorker
    .register("pwabuilder-sw.js", {
      scope: "./",
    })
    .then(function (reg) {
      console.log("Service worker has been registered for scope:" + reg.scope);
    });
}

```

**navigator.serviceWorker.register** ('/ pwabuilder-sw.js') function takes as an argument the URL where the service worker file is located. It doesn't matter how the file is named, but it is important that it is located at the root of the domain. The service worker will then be scoped to the entire domain and will receive fetch events from any page.

## Web App Manifest

The manifest provides information about our application: short and long name, icons of all sizes, start page, colors and orientation.

**manifest.json**: 

```
{
  "name": "... App",
  "short_name": "...",
  "gcm_sender_id": "....",
  "gcm_user_visible_only": true,
  "icons": [
    {
      "src": "/android-icon-36x36.png",
      "sizes": "36x36",
      "type": "image/png",
      "density": "0.75",
      "purpose": "any"
    },
    {
      "src": "/android-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "density": "1.0",
      "purpose": "any"
    },
    {
      "src": "/android-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "density": "1.5",
      "purpose": "any"
    },
    {
      "src": "/android-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "density": "2.0",
      "purpose": "any"
    },
    {
      "src": "/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "density": "3.0",
      "purpose": "any"
    },
    {
      "src": "/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "density": "4.0",
      "purpose": "any"
    },
    {
      "src": "/android-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "density": "4.0",
      "purpose": "any"
    },
    {
      "src": "/maskable_icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "lang": "Russian",
  "start_url": "/index.html",
  "display": "standalone",
  "Scope": "/",
  "background_color": "#ffb900",
  "theme_color": "#ffb900",
  "orientation": "any",
  "url": "https://.../",
  "categories": ["travel", "blog", "education"],
  "description": "Blog about traveling. Interesting places to visit, locations, photos",
  "screenshots": [
    {
      "src": "/pwa-screenshot_desk.png",
      "sizes": "1280x800",
      "type": "image/png"
    },
    {
      "src": "pwa-screenshot_mob.png",
      "sizes": "750x1334",
      "type": "image/png"
    }
  ]
}

```

**In head:** 

```
<link rel="manifest" href="/manifest.json">
```

## **Apple and Android icons, m**askable, **splash screen** 

```
<meta name="apple-mobile-web-app-capable" content="yes">
        <link href="/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <meta name="apple-mobile-web-app-title" content="Travelchem App">
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffb900">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="msapplication-TileColor" content="#ffb900">
        <meta name="theme-color" content="#ffb900">
```

**Generators for icons:**  [realfavicongenerator](https://realfavicongenerator.net/) and [appsco](https://appsco.pe/developer/splash-screens) with [maskable](https://maskable.app/)

## Push notification 

For Push I am using [gravitec](https://push.gravitec.net/) service. They have good admin panel with statistic and good free starter pack for beggining. 

![progressive web app for travelchem](/media/pwa_travelchem.png "progressive web app for travelchem")