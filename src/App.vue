<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "./components/ui/Header.vue";
import Footer from "./components/ui/Footer.vue";
</script>

<template>
  <div class="app-wrapper">
    <Header />

    <main
      class="main-content min-h-screen bg-gradient-to-b from-[#360036] via-[#4D0538] via-[90%] to-[#F06000] text-white flex px-4 pt-[82px] pb-[112px]"
    >
      <RouterView />
    </main>
    <Footer />
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
