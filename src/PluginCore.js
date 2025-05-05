import emitter from 'tiny-emitter/instance'
import { UNSUPPORTED_ARGUMENT_ERROR } from './utils/errors'
import { createDivInBody } from './utils'
import ModalsContainer from './components/ModalsContainer.vue'
import { createVNode, render } from 'vue'

const PluginCore = (app, options = {}) => {
  const subscription = {
    $on: (...args) => emitter.on(...args),
    $once: (...args) => emitter.once(...args),
    $off: (...args) => emitter.off(...args),
    $emit: (...args) => emitter.emit(...args)
  }

  const context = {
    root: null,
    componentName: options.componentName || 'Modal'
  }

  subscription.$on('set-modal-container', (container) => {
    context.root.__modalContainer = container
  })

  const showStaticModal = (name, params) => {
    subscription.$emit('toggle', name, true, params)
  }

  const showDynamicModal = (
    component,
    componentProps,
    modalProps = {},
    modalEvents
  ) => {
    const container = context.root?.__modalContainer
    const defaults = options.dynamicDefaults || {}

    container?.add(
      component,
      componentProps,
      { ...defaults, ...modalProps },
      modalEvents
    )
  }

  /**
   * Creates a container for modals in the root Vue component.
   */
  const setDynamicModalContainer = () => {
    context.root = {}

    const element = createDivInBody()

    const vNode = createVNode(ModalsContainer)
    vNode.appContext = app._context

    render(vNode, element);
  }

  const show = (...args) => {
    const [modal] = args

    switch (typeof modal) {
      case 'string':
        showStaticModal(...args)
        break

      case 'object':
      case 'function':
        showDynamicModal(...args)
        break

      default:
        console.warn(UNSUPPORTED_ARGUMENT_ERROR, modal)
    }
  }

  const hide = (name, params) => {
    subscription.$emit('toggle', name, false, params)
  }

  const hideAll = () => {
    subscription.$emit('hide-all')
  }

  const toggle = (name, params) => {
    subscription.$emit('toggle', name, undefined, params)
  }

  return {
    context,
    subscription,
    show,
    hide,
    hideAll,
    toggle,
    setDynamicModalContainer
  }
}

export default PluginCore
