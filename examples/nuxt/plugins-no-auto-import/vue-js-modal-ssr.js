import { defineNuxtPlugin } from 'nuxt/app'
import Modal from '../../../dist/ssr.nocss'

import '../../../dist/styles.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Modal)
})
