// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyCxAADjbPDuylxfrZgMsBtJBX2R1Zx_ThE",
          authDomain: "nuxt3-blog-app.firebaseapp.com",
          projectId: "nuxt3-blog-app",
          storageBucket: "nuxt3-blog-app.appspot.com",
          messagingSenderId: "149666269247",
          appId: "1:149666269247:web:7c98427859d06807e3508a",
          measurementId: "G-686S00TNZX",
        },
        services: {
          auth: {
            persistence: "local", // default
            initialize: {
              onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false,
            },
            ssr: false, // default
          },
          firestore: true,
          storage: true,
        },
      },
    ],
  ],
});
