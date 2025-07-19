<script setup lang="ts">
import { ref } from "vue";

const fullName = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const agreed = ref(false);

const handleSubmit = () => {
  console.log({
    fullName: fullName.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
    agreed: agreed.value,
  });
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md bg-white text-black rounded-2xl p-6">
      <h2 class="text-center text-2xl mb-6">Регистрация</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <input
          v-model="fullName"
          type="text"
          placeholder="Имя*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="phone"
          type="tel"
          placeholder="Телефон*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
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

        <label class="flex items-start gap-2 mt-4 text-xs text-gray-700">
          <input
            type="checkbox"
            v-model="agreed"
            class="accent-orange-500 mt-1"
          />
          <span>Согласен(-на) на обработку персональных данных</span>
        </label>

        <button
          type="submit"
          class="w-full bg-[#4D0538] text-white py-3 rounded-lg hover:opacity-90"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>
