import { createApp, defineAsyncComponent } from "vue";
import VueJSModal, { VueJSModalOptions } from "../index";
import TestComponent from './TestComponent';

const app = createApp({
  template: `<vue-modal name="awesome-modal"></vue-modal>`
});

// 1. Install the plugin without any options
app.use(VueJSModal);

// 2. Install the plugin with custom options
app.use<VueJSModalOptions>(VueJSModal, {
  componentName: "another-modal-name",
  dialog: false
});

const vm = app.mount("#app");

// 3. Call injected modal methods
vm.$modal.show("awesome-modal");
vm.$modal.hide("awesome-modal", { customeEvent: "customEventParam" });
vm.$modal.toggle("awesome-modal");

// 4. Show an SFC
vm.$modal.show(TestComponent, {
  text: 'Lorem ipsum'
})

// 5. Show an async SFC
const AsyncTestComponent = defineAsyncComponent(() => import('./TestComponent'));

vm.$modal.show(AsyncTestComponent, {
  text: 'Lorem ipsum'
})

// 6. Show a runtime component
vm.$modal.show(
  {
    template: `<p>{{ text }}</p> `,
    props: ['text']
  },
  {
    text: 'Lorem ipsum'
  },
  {
    height: 'auto'
  },
  {
    click: () => console.log('clicked')
  }
)
