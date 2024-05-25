import { fi } from "./assets/locales/fi.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-primevue"],

  css: ["~/assets/css/base.css", "~/assets/css/transitions.scss"],

  primevue: {
    options: {
      unstyled: true,
      locale: fi,
    },
    components: {
      prefix: "P",
      include: "*",
    },
    importPT: { as: "Aura", from: "~/presets/aura" },
  },

  $development: {
    sourcemap: true,
  },
});
