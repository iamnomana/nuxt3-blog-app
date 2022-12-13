<template>
  <div class="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
    <div v-for="p in 20">
      <BlogCard />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Home",
});
</script>

<style scoped></style>
