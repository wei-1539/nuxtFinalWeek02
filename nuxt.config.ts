// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/all.scss"],
  components: {
    dirs: [
      {
        path: "~/components/global",
        global: true,
      },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "bootstrap/scss/functions";
        @import "bootstrap/scss/variables";
        `,
        },
      },
    },
  },
  // 加入 Pinia 模組
  modules: ["@pinia/nuxt", ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
