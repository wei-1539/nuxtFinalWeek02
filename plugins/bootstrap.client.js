import Collapse from "bootstrap/js/dist/collapse";
import Modal from "bootstrap/js/dist/modal";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      Collapse,
      Modal,
    },
  };
});
