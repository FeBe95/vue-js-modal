import webpackBundler from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import sidebar from './sidebar'

export default defineUserConfig({
  bundler: webpackBundler(),
  base: '/vue-js-modal/',
  title: 'Vue.js Modal (Vue 3)',
  port: 8081,
  description: 'Simple, flexible, Vue.js modal plugin',
  plugins: [searchPlugin()],
  theme: defaultTheme({
    sidebar,
    navbar: [
      { text: 'Github', link: 'https://github.com/febe95/vue-js-modal' },
      { text: 'Vue 2', link: 'https://euvl.github.io/vue-js-modal/' },
      {
        text: 'Examples',
        children: [
          {
            text: 'Demo',
            link: 'https://febe95.github.io/vue-js-modal/demo'
          },
          {
            text: 'SSR (Nuxt)',
            link: 'https://febe95.github.io/vue-js-modal/examples/nuxt/'
          }
        ]
      }
    ]
  })
})
