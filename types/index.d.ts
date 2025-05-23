import { ObjectPlugin, Component, AsyncComponentLoader } from 'vue'

export declare interface VueJSModalOptions {
  componentName?: string
  dialog?: boolean
  dialogComponentName?: string
  dynamicDefaults?: object
}

declare const VueJSModal: ObjectPlugin<VueJSModalOptions | []>

declare interface VModal {
  show(name: string, params?: object): void
  show(
    component: Component | AsyncComponentLoader,
    componentProps?: object,
    modalProps?: object,
    modalEvents?: object
  ): void
  hide(name: string, params?: object): void
  hideAll(): void
  toggle(name: string, params?: object): void
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $modal: VModal
  }
}

export default VueJSModal
