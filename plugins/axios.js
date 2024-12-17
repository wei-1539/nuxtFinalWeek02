import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const autoBaseUrl = axios.create({
    baseURL: "https://nuxr3.zeabur.app",
  });

  nuxtApp.provide("axios", autoBaseUrl);
});
