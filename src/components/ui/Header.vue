<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const routes = [
  { path: "exchange", label: "Главная" },
  { path: "about-us", label: "О нас" },
  { path: "news", label: "Новости" },
  { path: "reviews", label: "Отзывы" },
  { path: "contact-us", label: "Контакты" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    closeMenu();
  }
};

const navigateToSection = async (id: string) => {
  closeMenu();
  if (route.path !== "/") {
    await router.push({ path: "/", query: { scrollTo: id } });
  } else {
    scrollToSection(id);
  }
};
</script>

<template>
  <header
    class="bg-gradient-to-r from-[#360036] via-[#4D0538] via-[50%] to-[#F06000] fixed top-0 w-full px-4 py-4 flex justify-between items-center border-b border-white z-50"
  >
    <RouterLink to="/">
      <img src="../../assets/icons/logo.svg" alt="Logo" class="h-12" />
    </RouterLink>

    <nav class="hidden md:flex space-x-6 text-white">
      <button
        v-for="route in routes"
        :key="route.path"
        class="hover:text-[#F06000] transition"
        @click.prevent="navigateToSection(route.path)"
      >
        {{ route.label }}
      </button>
    </nav>

    <div class="flex items-center gap-4">
      <RouterLink to="/profile">
        <img
          src="../../assets/icons/user.svg"
          alt="User"
          class="h-8 w-8 hover:opacity-80 transition-opacity"
        />
      </RouterLink>

      <div
        class="space-y-1 cursor-pointer md:hidden"
        @click="toggleMenu"
        aria-label="Toggle menu"
        role="button"
        tabindex="0"
      >
        <span class="block w-7 h-1 bg-white rounded"></span>
        <span class="block w-7 h-1 bg-white rounded"></span>
        <span class="block w-7 h-1 bg-white rounded"></span>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full right-4 mt-2 w-48 bg-[#4D0538] text-white rounded-lg shadow-lg border border-white md:hidden"
      >
        <nav class="flex flex-col py-2">
          <button
            v-for="(route, index) in routes"
            :key="index"
            class="text-left px-4 py-2 hover:bg-[#F06000] hover:text-black transition"
            @click="navigateToSection(route.path)"
          >
            {{ route.label }}
          </button>
        </nav>
      </div>
    </transition>
  </header>
</template>
