import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  devServer: {
    host: '::1'
  },
  ssr: process.env.NUXT_RENDERING_MODE !== 'csr',
  plugins: [
    process.env.NUXT_RENDERING_MODE === 'csr'
      ? '~/plugins-no-auto-import/vue-js-modal-csr.js'
      : '~/plugins-no-auto-import/vue-js-modal-ssr.js'
  ],
  modules: ['@nuxt/eslint']
})
