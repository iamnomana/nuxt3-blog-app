import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyCxAADjbPDuylxfrZgMsBtJBX2R1Zx_ThE",
    authDomain: "nuxt3-blog-app.firebaseapp.com",
    projectId: "nuxt3-blog-app",
    storageBucket: "nuxt3-blog-app.appspot.com",
    messagingSenderId: "149666269247",
    appId: "1:149666269247:web:7c98427859d06807e3508a",
    measurementId: "G-686S00TNZX",
  };
  const firebaseDev = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseDev);
  const auth = getAuth(firebaseDev);

  auth.languageCode = "vi";

  return {
    provide: {
      auth,
      db,
    },
  };
});
