<template>
  <modal
    v-for="modal in modals"
    :key="modal.id"
    v-bind="modal.modalAttrs"
    v-on="modal.modalListeners"
    @closed="remove(modal.id)"
  >
    <component
      :is="modal.component"
      v-bind="modal.componentAttrs"
      @close="$modal.hide(modal.modalAttrs.name, $event)"
    />
  </modal>
</template>
<script>
import { generateId } from '../utils'
import { markRaw } from 'vue'

const PREFIX = 'dynamic_modal_'

export default {
  data() {
    return {
      modals: []
    }
  },
  created() {
    /**
     * Register ModalContainer so that it was availiable inside the plugin
     */
    this.$modal.subscription.$emit('set-modal-container', this)
  },
  mounted() {
    this.$modal.subscription.$on('hide-all', () => {
      this.modals = []
    })
  },
  methods: {
    add(component, componentAttrs = {}, modalAttrs = {}, modalListeners = {}) {
      const id = generateId()
      const name = modalAttrs.name || PREFIX + id

      this.modals.push({
        id,
        modalAttrs: { ...modalAttrs, name },
        modalListeners,
        component: markRaw(component),
        componentAttrs
      })

      this.$nextTick(() => {
        this.$modal.show(name)
      })
    },
    remove(id) {
      const index = this.modals.findIndex((v) => v.id === id)

      if (index !== -1) {
        this.modals.splice(index, 1)
      }
    }
  }
}
</script>
