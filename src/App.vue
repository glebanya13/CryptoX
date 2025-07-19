<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div>
    <HeaderComponent />
    <div
      class="min-h-screen bg-gradient-to-b from-[#360036] via-[#4D0538] via-[80%] to-[#F06000] text-white flex px-4"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
