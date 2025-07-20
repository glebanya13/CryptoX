<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "./components/ui/Header.vue";
</script>

<template>
  <div class="app-wrapper">
    <Header />

    <main
      class="main-content min-h-screen bg-gradient-to-b from-[#360036] via-[#4D0538] via-[80%] to-[#F06000] text-white flex px-4"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
