<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const routes = [
  { path: "/", label: "Главная" },
  { path: "/news", label: "Новости" },
  { path: "/reviews", label: "Отзывы" },
  { path: "/about-us", label: "О нас" },
  { path: "/contact-us", label: "Контакты" },
  { path: "/sign-in", label: "Вход" },
];
</script>

<template>
  <header
    class="bg-[#360036] w-full px-4 py-4 flex justify-between items-center border-b border-white relative z-50"
  >
    <img src="../assets/logo.svg" alt="Logo" class="h-12" />

    <div class="flex items-center gap-4">
      <img src="../assets/user.svg" alt="User" class="h-8 w-8" />

      <div class="space-y-1 cursor-pointer" @click="toggleMenu">
        <span class="block w-7 h-1 bg-white rounded"></span>
        <span class="block w-7 h-1 bg-white rounded"></span>
        <span class="block w-7 h-1 bg-white rounded"></span>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full right-4 mt-2 w-48 bg-[#4D0538] text-white rounded-lg shadow-lg border border-white"
      >
        <nav class="flex flex-col py-2">
          <RouterLink
            v-for="(route, index) in routes"
            :key="index"
            :to="route.path"
            class="px-4 py-2 hover:bg-[#F06000] hover:text-black transition"
            @click="closeMenu"
          >
            {{ route.label }}
          </RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
