# Inertia.js - SSR - React

This guide will explain how to add server-side rendering (SSR) to an existing React Inertia application.

Note, if you're using the [Ziggy](https://github.com/tighten/ziggy) library, you're going to run into issues with SSR. While it is technically possible to use Ziggy in SSR, it requires a bunch of extra configuration, which this guide won't cover.

## Upgrade dependencies

Upgrade to the latest version of Inertia (version 0.9.0 or newer):

```sh
npm install @inertiajs/inertia@latest @inertiajs/inertia-react@latest @inertiajs/progress@latest
```

## Update title/meta management

In order for `<head>` tags such as `<title>` and `<meta>` to work in SSR mode, you need to use the new `<InertiaHead>` component instead React Helmet, or similar libraries. To do this, add the following component to your pages:

```jsx
import { InertiaHead } from '@inertiajs/inertia-react'

<InertiaHead>
  <title>Your page title</title>
  <meta name="description" content="Your page description" />
</InertiaHead>
```

You can also use the title prop shorthand:

```jsx
import { InertiaHead } from '@inertiajs/inertia-react'

<InertiaHead title="Your page title" />
```

It's also available as just `Head` if that's your style:

```jsx
import { Head } from '@inertiajs/inertia-react'

<Head title="Your page title" />
```

It's possible to have multiple instances of the `<InertiaHead>` component throughout your application. For example, maybe your layout component sets a default title and meta description tag, and then your pages themselves overide those defaults as necessary.

By default, Inertia will only ever render one `<title>` tag. However, it's possible to stack other tags, such as `<meta>` tags. To avoid duplicate tags in your `<head>`, you can use the `inertia` attribute, which will make sure the tag is only rendered once. For example:

```jsx
// layout.js
import { InertiaHead } from '@inertiajs/inertia-react'

<InertiaHead>
  <title>My app</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="description" content="This is my app's default description" inertia="description" />
</InertiaHead>

// about.js
import { InertiaHead } from '@inertiajs/inertia-react'

<InertiaHead>
  <title>About - My app</title>
  <meta name="description" content="This is my about page description" inertia="description" />
</InertiaHead>
```

In this example, only the `<title>` and `<meta>` tags from the page component will be rendered:

```html
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>About - My app</title>
  <meta name="description" content="This is my about page description" />
</head>
```

## Create SSR server

Now we'll configure our SSR server. This is a light Express (Node) server that will run in the background and convert your React page components into HTML.

First, install Express:

```sh
npm install express
```

Next, create a `resources/js/ssr.js` file:

```sh
touch resources/js/ssr.js
```

This file is going to look similar like your `app.js` file, with the exception that it's not going to run in the browser, but rather in Node. Here's a complete example. Be sure to add anything that's missing from your `app.js` file that makes sense to run in SSR mode. However, not everything needs to be included. For example, the `InertiaProgress` library can be ommitted from this file, as it will never be used in SSR mode.

```jsx
import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/inertia-react'

const server = express()
server.use(express.json())
server.post('/render', async (request, response, next) => {
  try {
    response.json(
      await createInertiaApp({
        page: request.body,
        render: ReactDOMServer.renderToString,
        resolve: name => require(`./Pages/${name}`),
        setup: ({ App, props }) => <App {...props} />,
      })
    )
  } catch (error) {
    next(error)
  }
})
server.listen(8080, () => console.log('Server started.'))

console.log('Starting SSR server...')
```

Note, do not use code splitting in `ssr.js`, as it won't help anything. Instead, we want to generate just one SSR build file. You can, of course, still use code splitting for your client-side build (`app.js`).

## Webpack setup

At the time of writing this, Laravel Mix does not support multiple webpack configurations within the same `webpack.mix.js` file. So, instead we'll create a new `webpack.ssr.mix.js` file for SSR. However, when you have two Mix files like this in one project, the generated manifests will overwrite eachother. We can avoid this by using the `laravel-mix-merge-manifest` package:

```sh
npm install laravel-mix-merge-manifest
```

Also, in order for our Webpack build to run properly on Node, we also need to install the `webpack-node-externals` package:

```sh
npm install webpack-node-externals
```

With these packages installed, let's now create `webpack.ssr.mix.js`:

```sh
touch webpack.ssr.mix.js
```

Here is a example configuration for this file. Note that it will look much like your `webpack.mix.js` configuration, with the exception that you only compile your JavaScript, and not your CSS. Be sure to redefine any aliases used within your application. Using `webpackConfig()`, be sure to set the `target` to `node`, and set `externals` to `[webpackNodeExternals()]`, which is the library we just installed.

```js
const path = require('path')
const mix = require('laravel-mix')
const nodeExternals = require('webpack-node-externals');

require('laravel-mix-merge-manifest')

mix
  .js('resources/js/ssr.js', 'public/js')
  .react()
  .alias({ '@': path.resolve('resources/js') })
  .webpackConfig({
    target: 'node',
    externals: [nodeExternals()],
  })
  .mergeManifest()
```

Notice how we're using `.mergeManifest()` in this file. You need to add the exact same thing to your main `webpack.mix.js` config:

```js
require('laravel-mix-merge-manifest')

mix
  .js('resources/js/app.js', 'public/js')
  // ...
  .mergeManifest()
```

## Update app.blade.php

Next, we need to update our `app.blade.php` to actually use the HTML rendered from our SSR server. **The following code is a little ugly, and will eventually be abstracted in the Laravel adapter.** However, this will give you a good sense of how it all works.

```blade
@php
try {
    $ssr = Http::post('http://localhost:8080/render', $page)->throw()->json();
} catch (Exception $e) {
    $ssr = null;
}
@endphp
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
    @foreach($ssr['head'] ?? [] as $element)
        {!! $element !!}
    @endforeach
  </head>
  <body>
    @if ($ssr)
        {!! $ssr['body'] !!}
    @else
        @inertia
    @endif
  </body>
</html>
```

## Running the build process

You now have two build processes you need to run—one for your client-side bundle, and another for your server-side bundle:

```sh
npx mix
npx mix --mix-config=webpack.ssr.mix.js
```

Run both of these build steps and correct any errors that are generated. Remember, you're now building an "isomorphic" app, which means your app runs both on the client (browser) and on the server (Node). To learn more about SSR in React, see [their guide](https://reactjs.org/docs/react-dom-server.html).

## Running the Express (Node) server

With the builds generated, you can now run the Node server:

```sh
node public/js/ssr.js
```

With that running, you should now be able to access your app within the browser, with server-side rendering enable. In fact, you should be able to disable JavaScript entirely and navigate around the app.

## Hosting setup

When deploying your SSR enabled app to production, you'll need to run both the client-side (`app.js`) and server-side (`ssr.js`) builds. One option here is to update the `prod` script in `package.json` to run both builds automatically:

```js
"prod": "mix --production && mix --production --mix-config=webpack.ssr.mix.js",
```

## Forge

To run the SSR server on Forge, create a new daemon that runs `node public/js/ssr.js` in the root of your app. Take note of the daemon ID that is generated, as you'll need to use this in your apps deployment script. Whenever you deploy your application, you'll need to automatically restart the SSR server. Add the following to your deployment script, updating "123456" with your daemon ID.

```sh
# Restart SSR server
sudo supervisorctl restart daemon-123456:daemon-123456_00
```

## Heroku

To run the SSR server on Heroku, update your `web` configuration in your `Procfile` to first run the SSR server before starting your web server. Note, to do this you must have the `heroku/nodejs` buildpack installed in addition to the `heroku/php` buildback.

```sh
web: node public/js/ssr.js & vendor/bin/heroku-php-apache2 public/
```
