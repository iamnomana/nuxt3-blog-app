<template>
  <div class="">
    <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-9 text-center capitalize">
      DIV Blog
    </h5>
    <form class="space-y-6" @submit.prevent="handleRegister">
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
          >Password</label
        >
        <input
          type="password"
          v-model="formData.password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          minlength="3"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered?
        <NuxtLink to="/auth/login" class="text-blue-700 hover:underline dark:text-blue-500"
          >Sign In</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import AuthServices from "~~/firebase/services/auth";
import UserServices from "~~/firebase/services/user";

useHead({
  title: "Register",
});
definePageMeta({
  layout: "auth",
});

const { $auth, $db } = useNuxtApp();
const authServices = new AuthServices($auth);
const userServices = new UserServices($db);

const formData = reactive({});

const handleRegister = async () => {
  authServices
    .register(formData.email, formData.password)
    .then(async (res) => {
      const { user } = res;

      if (user) {
        await userServices.create(user.uid, { name: user.displayName, email: user.email });

        navigateTo({
          path: "/",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(e.code);
      let msg = "";
      switch (e.code) {
        case "auth/invalid-email":
          msg = "Invalid Email";
          break;
        case "auth/email-already-in-use":
          msg = "Email already exist for this account. \r\nLogin Instead";
          break;
        case "auth/weak-password":
          msg = "Weak Password";
          break;

        default:
          msg = "Failed";
          break;
      }

      alert(msg);
    });
};
</script>

<style scoped></style>
