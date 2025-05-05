import Modal from './components/Modal.vue'
import Dialog from './components/Dialog.vue'
import PluginCore from './PluginCore'

const Plugin = {
  install(app, options = {}) {
    if (app.config.globalProperties.$modal) {
      return
    }

    const plugin = new PluginCore(app, options)

    Object.defineProperty(app.config.globalProperties, '$modal', {
      get: function() {
        if (!plugin.context.root) {
          plugin.setDynamicModalContainer()
        }

        return plugin
      }
    })

    /**
     * Sets custom component name (if provided)
     */
    app.component(plugin.context.componentName, Modal)

    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      const componentName = options.dialogComponentName || 'VDialog';
      app.component(componentName, Dialog);
    }
  }
}

export default Plugin
