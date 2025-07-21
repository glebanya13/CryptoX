<script setup lang="ts"></script>

<template>
  <footer class="bg-[#4D0538] text-white text-sm px-4 py-8 mt-auto">
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
          <li>
            <RouterLink to="/" class="hover:underline">Главная</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="hover:underline"
              >О компании</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/contacts" class="hover:underline"
              >Контакты</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/profile" class="hover:underline"
              >Профиль</RouterLink
            >
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
