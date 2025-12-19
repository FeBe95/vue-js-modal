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
      v-if="!modal.modalAttrs.loader"
      v-bind="modal.componentAttrs"
      v-on="modal.componentListeners"
      @close="$modal.hide(modal.modalAttrs.name, $event)"
    />
    <Suspense
      v-else
      @pending="sendNativeEvent(modal, 'loadstart')"
      @resolve="sendNativeEvent(modal, 'loaded')"
    >
      <template #default>
        <component
          :is="modal.component"
          v-bind="modal.componentAttrs"
          v-on="modal.componentListeners"
          @close="$modal.hide(modal.modalAttrs.name, $event)"
        />
      </template>
      <template #fallback>
        <div
          v-if="typeof modal.modalAttrs.loader === 'string'"
          style="
            position: relative;
            width: 100%;
            height: 100%;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          v-text="modal.modalAttrs.loader"
        ></div>

        <div
          v-else-if="modal.modalAttrs.loader?.html"
          :style="modal.modalAttrs.loader?.style"
          v-html="modal.modalAttrs.loader?.html"
        ></div>

        <div
          v-else
          style="
            position: relative;
            width: 100%;
            height: 100%;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <LoadingBars />
        </div>
      </template>
    </Suspense>
  </modal>
</template>
<script>
import { generateId } from '../utils'
import { markRaw } from 'vue'
import LoadingBars from './LoadingBars.vue'

const PREFIX = 'dynamic_modal_'

export default {
  components: {
    LoadingBars
  },
  data() {
    return {
      isLoadingAsyncComponent: false,
      nativeEvents: [
        'loadstart',
        'loaded',
        'before-open',
        'opened',
        'before-close',
        'closed'
      ],
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
    sendNativeEvent(modal, eventName) {
      if (!Object.hasOwn(modal.componentListeners, eventName)) {
        return
      }

      modal.componentListeners[eventName]({
        name: modal.modalAttrs.name,
        state: eventName
      })
    },
    add(component, componentAttrs = {}, modalAttrs = {}, componentListeners = {}) {
      if (this.isLoadingAsyncComponent) {
        console.warn('[vue-js-modal] Prevented modal from being opened, because another modal is currently loading.')
        return
      }

      this.isLoadingAsyncComponent = true

      const id = generateId()
      const name = modalAttrs.name || PREFIX + id
      const useSuspense = modalAttrs.loader ?? false

      const that = this;

      // deprecate modal listeners
      const modalListeners = Object.fromEntries(
        Object.entries(componentListeners).map(([eventName, eventListener]) => [
          eventName,
          function (...args) {
            if (!that.nativeEvents.includes(eventName)) {
              console.warn(
                '[vue-js-modal] Emitting "' +
                  eventName +
                  '" via `this.$parent.$emit(...)` is deprecated. ' +
                  'Use `this.$emit(...)` directly instead.'
              )
            }

            return typeof eventListener === 'function'
              ? eventListener.apply(this, args)
              : eventListener
          }
        ])
      )

      this.modals.push({
        id,
        modalAttrs: { ...modalAttrs, name },
        modalListeners,
        componentListeners,
        component: markRaw(component),
        componentAttrs
      })

      this.$nextTick(() => {
        if (
          !useSuspense &&
          component &&
          typeof component === 'object' &&
          Object.hasOwn(component, '__asyncLoader') &&
          component.__asyncLoader
        ) {
          try {
            const modalEventData = {
              componentListeners,
              modalAttrs: { name }
            }

            this.sendNativeEvent(modalEventData, 'loadstart')

            component.__asyncLoader().then(() => {
              this.sendNativeEvent(modalEventData, 'loaded')
              this.$modal.show(name)
              this.isLoadingAsyncComponent = false
            })
          } catch (error) {
            console.error(
              '[vue-js-modal] Failed to load component: "' + name + '"',
              error
            )
          }
        } else {
          this.$modal.show(name)
          this.isLoadingAsyncComponent = false
        }
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
