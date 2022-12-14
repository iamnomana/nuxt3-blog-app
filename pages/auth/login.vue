<template>
  <div class="">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-9 text-center capitalize">
      DIV Blog
    </h5>

    <form class="space-y-6" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          type="email"
          v-model="formData.email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
      </div>

      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          v-model="formData.password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      <!-- <div class="flex items-start">
        <NuxtLink
          to="/auth/reset_password"
          class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >Lost Password?</NuxtLink
        >
      </div> -->

      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
        <NuxtLink to="/auth/register" class="text-blue-700 hover:underline dark:text-blue-500"
          >Create account</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import AuthServices from "~~/firebase/services/auth";
useHead({
  title: "Login",
});
definePageMeta({
  layout: "auth",
});

const { $auth } = useNuxtApp();
const authServices = new AuthServices($auth);

const formData = reactive({});

const handleLogin = async () => {
  authServices
    .loginWithEmail(formData.email, formData.password)
    .then((result) => {
      if (result?.user) {
        const { uid, accessToken } = result.user;
        localStorage.setItem("uid", uid);
        localStorage.setItem("accessToken", accessToken);

        navigateTo({
          path: "/",
        });
      }
    })
    .catch((e) => {
      let msg = "";
      switch (e.code) {
        case "auth/user-not-found":
          msg = "Unknown User";
          break;
        case "auth/wrong-password":
          msg = "The password is invalid ";
          break;
        case "auth/too-many-requests":
          msg =
            "Access to this account has been temporarily disabled due to many failed login attempts. \r\n You can immediately restore it by resetting your password or you can try again later";
          break;
        default:
          break;
      }

      alert(msg);
    });
};
</script>

<style scoped></style>
