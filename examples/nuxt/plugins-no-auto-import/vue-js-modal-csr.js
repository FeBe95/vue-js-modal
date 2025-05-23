import { defineNuxtPlugin } from 'nuxt/app'
import Modal from '../../../dist/ssr.index'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Modal)
})
