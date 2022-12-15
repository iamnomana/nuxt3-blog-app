<template>
  <div>
    <header
      class="bg-[url('https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-cover w-full bg-center p-24 object-cover flex justify-center items-center relative"
      style="height: 60vh"
    >
      <div class="bg-stone-900 h-full opacity-70 absolute top-0 w-full left-0"></div>

      <div class="text-center mx-auto relative">
        <h1 class="font-bold md:text-8xl sm:text-lg text-white">DIV BLOGS</h1>
        <span class="self-center text-slate-50">
          Animi perferendis, ullam deserunt modi inventore officia doloribus omnis repellendus
          ducimus!</span
        >
      </div>
    </header>

    <section class="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
      <div v-for="p in 20">
        <BlogCard />
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Home",
});
</script>

<style scoped></style>
