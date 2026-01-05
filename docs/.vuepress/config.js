import webpackBundler from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import sidebar from './sidebar'
import navbar from './navbar'
import head from './head'

export default defineUserConfig({
  bundler: webpackBundler(),
  base: '/vue-js-modal/',
  title: 'Vue.js Modal (Vue 3)',
  head,
  port: 8081,
  description: 'Simple, flexible, Vue.js modal plugin',
  plugins: [searchPlugin()],
  theme: defaultTheme({
    sidebar,
    navbar
  })
})
