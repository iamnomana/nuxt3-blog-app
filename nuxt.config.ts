// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Loading",
      titleTemplate: "%s | DIV Blog",
      meta: [{ name: "description", content: "Blog Posts" }],
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
});
