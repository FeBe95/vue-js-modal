import { createApp } from 'vue'
import VueJsModal from 'plugin'
import App from './App.vue'

const app = createApp(App)

app.use(VueJsModal, {
  dialog: true,
  dynamicDefaults: {
    draggable: true
  }
})

app.mount('#app')
