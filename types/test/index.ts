import { createApp, defineAsyncComponent } from "vue";
import VueJSModal, { VueJSModalOptions } from "../index";
import TestComponent from './TestComponent';

const app = createApp({
  template: `<vue-modal name="awesome-modal"></vue-modal>`
});

app.use(VueJSModal);
app.use<VueJSModalOptions>(VueJSModal, {
  componentName: "another-modal-name",
  dialog: false
});

const vm = app.mount("#app");

vm.$modal.show("awesome-modal");
vm.$modal.hide("awesome-modal", { customeEvent: "customEventParam" });
vm.$modal.toggle("awesome-modal");

vm.$modal.show(TestComponent, {
  text: 'Lorem ipsum'
})

const AsyncTestComponent = defineAsyncComponent(() => import('./TestComponent'));

vm.$modal.show(AsyncTestComponent, {
  text: 'Lorem ipsum'
})

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
