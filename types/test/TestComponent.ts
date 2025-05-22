import { defineComponent, h, ref } from 'vue'

export default defineComponent(
  props => {
    const count = ref(0)

    return () => {
      return h('div', count.value)
    }
  }
)