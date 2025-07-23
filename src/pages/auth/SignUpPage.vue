<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db } from "../../config/firebase";
import { ref as dbRef, set } from "firebase/database";
import { useRouter } from "vue-router";

const fullName = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const agreed = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const infoMessage = ref("");
const router = useRouter();

const handleSubmit = async () => {
  if (!agreed.value) {
    errorMessage.value = "Необходимо согласие на обработку данных";
    return;
  }

  if (!fullName.value || !phone.value || !email.value || !password.value) {
    errorMessage.value = "Все поля обязательны для заполнения";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "Пароль должен содержать минимум 6 символов";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    infoMessage.value = "";

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await sendEmailVerification(userCredential.user);

    await set(dbRef(db, "users/" + userCredential.user.uid), {
      fullName: fullName.value,
      phone: phone.value,
      email: email.value,
      createdAt: new Date().toISOString(),
    });

    infoMessage.value = "Регистрация прошла успешно! Проверьте почту для подтверждения аккаунта.";

    fullName.value = "";
    phone.value = "";
    email.value = "";
    password.value = "";
    agreed.value = false;

    await auth.signOut();

    router.push("/sign-in");

  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage.value = "Этот email уже зарегистрирован";
        break;
      case "auth/invalid-email":
        errorMessage.value = "Некорректный email";
        break;
      case "auth/weak-password":
        errorMessage.value = "Слишком слабый пароль";
        break;
      default:
        errorMessage.value = "Произошла ошибка при регистрации";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="w-full max-w-md bg-white text-black rounded-2xl p-6 shadow-lg">
      <h2 class="text-center text-2xl mb-6 font-bold">Регистрация</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
        <div v-if="infoMessage" class="text-green-600 text-sm text-center">
          {{ infoMessage }}
        </div>

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
          placeholder="Пароль* (минимум 6 символов)"
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
          :disabled="isLoading"
          class="w-full bg-[#4D0538] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex justify-center items-center"
        >
          <span v-if="!isLoading">Зарегистрироваться</span>
          <span v-else>Регистрация...</span>
        </button>
      </form>
    </div>
  </div>
</template>
