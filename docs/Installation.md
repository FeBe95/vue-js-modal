# Installation

```bash
npm install @febe95/vue-js-modal --save
```

## Client

Import plugin in your main file:

```js
import VModal from '@febe95/vue-js-modal'

OR

import VModal from '@febe95/vue-js-modal/dist/index.nocss.js'
import '@febe95/vue-js-modal/dist/styles.css'
```

```js
app.use(VModal)
```

## SSR

To use this plugin with Nuxt.js you need to create a plugin file and reference it in the `nuxt.config.js` file.

```js
// nuxt.config.js
export default {
  ...
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vue-js-modal.js'
  ],
}
```

```js
// plugins/vue-js-modal.js
import { defineNuxtPlugin } from 'nuxt/app'
import VModal from '../../../dist/ssr.nocss'

import '../../../dist/styles.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VModal)
})
```

::: tip Extracted CSS
The `/dist` directory contains a version of the build with extracted CSS files. This is useful for SSR but also can be used with the purely client-side implementation when you need more flexibility in controlling your stylesheets.

- `ssr.index.js` - SSR build with inline CSS
- `ssr.nocss.js` - SSR build without inline CSS
- `index.nocss.js` - Client build without inline CSS
- `styles.css` - Stylesheet

:::
