import { createApp } from "vue";
import VueJSModal, { VueJSModalOptions } from "../index";

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
