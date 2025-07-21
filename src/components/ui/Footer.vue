<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const routes = [
  { id: "exchange", label: "Главная", scroll: true },
  { id: "about-us", label: "О компании", scroll: true },
  { id: "contact-us", label: "Контакты", scroll: true },
  { id: "/profile", label: "Профиль", scroll: false },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const navigateToSection = async (id: string) => {
  if (route.path !== "/") {
    await router.push({ path: "/", query: { scrollTo: id } });
  } else {
    scrollToSection(id);
  }
};
</script>

<template>
  <footer class="bg-gradient-to-r from-[#360036] via-[#4D0538] via-[90%] to-[#F06000] text-white text-sm px-4 py-8 mt-auto">
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10"
    >
      <div class="space-y-3">
        <h2 class="text-[#F05802] text-xl mb-2">Телефон</h2>
        <div class="flex items-center gap-3">
          <img src="../../assets/icons/tg.svg" alt="Telegram" class="w-7 h-7" />
          <img src="../../assets/icons/wt.svg" alt="WhatsApp" class="w-7 h-7" />
        </div>
        <p>+996 (501) 178590</p>
        <p>+7 (999) 599-99-93</p>
        <p>@cryptox_kg1</p>
      </div>

      <div class="space-y-2">
        <h2 class="text-[#F05802] text-xl mb-2">Навигация</h2>
        <ul class="space-y-1">
          <li v-for="routeItem in routes" :key="routeItem.id">
            <template v-if="routeItem.scroll">
              <button
                @click="navigateToSection(routeItem.id)"
                class="hover:underline text-left w-full"
              >
                {{ routeItem.label }}
              </button>
            </template>
            <template v-else>
              <RouterLink to="/profile" class="hover:underline">
                {{ routeItem.label }}
              </RouterLink>
            </template>
          </li>
        </ul>
      </div>

      <div class="space-y-2 text-center md:text-right">
        <p>&copy; {{ new Date().getFullYear() }} CryptoX</p>
        <p>Все права защищены</p>
        <p>Пн–Пт: 10:00–20:00</p>
        <p>Сб–Вс: 11:00–19:00</p>
      </div>
    </div>
  </footer>
</template>
