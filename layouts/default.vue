<template>
  <div>
    <header>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <NuxtLink to="/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
              >DIV Blog</span
            >
          </NuxtLink>

          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul
              class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li>
                <NuxtLink
                  to="/"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  exact-active-class="text-white"
                  >Home</NuxtLink
                >
              </li>

              <li>
                <NuxtLink
                  to="/about"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  exact-active-class="text-gray-700"
                  >About</NuxtLink
                >
              </li>

              <li v-if="!state.user">
                <NuxtLink
                  to="/auth/login"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  exact-active-class="text-white"
                  >Login</NuxtLink
                >
              </li>

              <li v-if="!state.user">
                <NuxtLink
                  to="/auth/register"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  exact-active-class="text-white"
                  >Register</NuxtLink
                >
              </li>

              <li v-if="state.user">
                <button
                  @click="handleLogout"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <div class="w-100">
      <slot />
    </div>

    <footer class="bottom-0 w-full p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-8"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >DIV Blog</span
          >
        </a>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2022 <a href="https://flowbite.com/" class="hover:underline">DIV Blog™</a>. All Rights
        Reserved.
      </span>
    </footer>
  </div>
</template>

<script setup>
import AuthServices from "@/firebase/services/auth";
const { $auth } = useNuxtApp();

const authServices = new AuthServices($auth);

const state = reactive({
  user: null,
});

onMounted(() => {
  authServices.onAuthStateChanged((user) => {
    state.user = user;
  });
});

const handleLogout = async () => {
  try {
    await authServices.logout();
  } catch (error) {
    console.log("handleLogout failed ==> ", error);
  }
};
</script>

<style scoped></style>
