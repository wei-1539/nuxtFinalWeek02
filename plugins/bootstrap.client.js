// import Collapse from "bootstrap/js/dist/collapse";
// import Modal from "bootstrap/js/dist/modal";
// import Dropdown from "bootstrap/js/dist/dropdown";

// export default defineNuxtPlugin((nuxtApp) => {
//   return {
//     provide: {
//       bootstrap: {
//         Dropdown,
//         Collapse,
//         Modal: (element) => new Modal(element),
//       },
//     },
//   };
// });
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("bootstrap", bootstrap);
});
