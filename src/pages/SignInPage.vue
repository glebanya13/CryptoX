<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md bg-white text-black rounded-2xl p-6">
      <h2 class="text-center text-2xl mb-6">Вход</h2>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="E-mail*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="accent-orange-500"
            />
            <span>Запомнить меня</span>
          </label>

          <a href="#" class="text-xs text-[#4D0538] hover:underline">
            Забыли пароль?
          </a>
        </div>

        <button
          type="submit"
          class="w-full bg-[#4D0538] text-white py-3 rounded-lg hover:opacity-90"
        >
          Войти
        </button>

        <div class="text-center text-sm text-gray-600">
          Нет аккаунта?
          <a href="#" class="text-[#4D0538] hover:underline"
            >Зарегистрироваться</a
          >
        </div>
      </form>
    </div>
  </div>
</template>
