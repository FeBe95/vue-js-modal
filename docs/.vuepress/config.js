import webpackBundler from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import sidebar from './sidebar'

export default defineUserConfig({
  bundler: webpackBundler(),
  base: '/vue-js-modal/',
  title: 'Vue.js Modal',
  description: 'Simple, flexible, Vue.js modal plugin',
  plugins: [searchPlugin()],
  theme: defaultTheme({
    sidebar,
    navbar: [
      { text: 'Github', link: 'https://github.com/febe95/vue-js-modal' },
      { text: 'Examples', link: '/examples/' }
    ]
  })
})
