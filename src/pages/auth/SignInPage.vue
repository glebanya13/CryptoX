<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Пожалуйста, заполните все поля";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";

    const auth = getAuth();

    await setPersistence(
      auth,
      rememberMe.value ? browserLocalPersistence : browserSessionPersistence
    );

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredential.user;

    if (!user.emailVerified) {
      errorMessage.value =
        "Пожалуйста, подтвердите свою почту перед входом. Проверьте почту. (Спам)";
      await auth.signOut();
      return;
    }

    router.push("/");
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage.value = "Некорректный email";
        break;
      case "auth/user-disabled":
        errorMessage.value = "Аккаунт отключен";
        break;
      case "auth/user-not-found":
        errorMessage.value = "Пользователь не найден";
        break;
      case "auth/wrong-password":
        errorMessage.value = "Неверный пароль";
        break;
      default:
        errorMessage.value = "Ошибка при входе. Попробуйте снова";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="w-full max-w-md bg-white text-black rounded-2xl p-6 shadow-lg">
      <h2 class="text-center text-2xl mb-6 font-bold">Вход</h2>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <input
          v-model="email"
          type="email"
          placeholder="E-mail*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
          required
          minlength="6"
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
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-[#4D0538] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          <span v-if="!isLoading">Войти</span>
          <span v-else>Вход...</span>
        </button>

        <div class="text-center text-sm text-gray-600">
          Нет аккаунта?
          <router-link to="/sign-up" class="text-[#4D0538] hover:underline">
            Зарегистрироваться
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
