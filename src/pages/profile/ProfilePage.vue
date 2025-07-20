<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { db } from "../../config/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { useRouter } from "vue-router";
import { until } from "@vueuse/core";
import { useAuth } from "../../composables/useAuth";

interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
}

const { user: authUser, isAuthReady } = useAuth();
const router = useRouter();
const userProfile = ref<UserProfile | null>(null);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  await until(isAuthReady).toBe(true);

  if (!authUser.value) {
    router.push("/sign-in");
    return;
  }

  try {
    const userRef = dbRef(db, `users/${authUser.value.uid}`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      userProfile.value = {
        fullName: data?.fullName || "",
        phone: data?.phone || "",
        email: authUser.value?.email || "",
        createdAt: data?.createdAt || "",
      };
      isLoading.value = false;
    });
  } catch (error) {
    errorMessage.value = "Не удалось загрузить данные профиля";
    isLoading.value = false;
    throw error;
  }
});

const formatDate = (dateString: string) => {
  if (!dateString) return "Не указана";
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
};
</script>

<template>
  <div class="w-full mx-auto pt-10 px-4 space-y-6 pb-10">
    <h1 class="text-center text-2xl text-white mb-10">ПРОФИЛЬ</h1>

    <div v-if="isLoading" class="text-center text-white">
      Загрузка данных профиля...
    </div>

    <div v-else-if="userProfile" class="max-w-md mx-auto p-2 space-y-4">
      <div v-if="errorMessage" class="text-red-500 text-sm text-center">
        {{ errorMessage }}
      </div>

      <div class="space-y-1">
        <h2 class="text-[#F05802] text-lg">Имя</h2>
        <p class="text-white text-xl">
          {{ userProfile.fullName || "Не указано" }}
        </p>
      </div>

      <div class="space-y-1">
        <h2 class="text-[#F05802] text-lg">Телефон</h2>
        <p class="text-white text-xl">{{ userProfile.phone || "Не указан" }}</p>
      </div>

      <div class="space-y-1">
        <h2 class="text-[#F05802] text-lg">Email</h2>
        <p class="text-white text-xl">{{ userProfile.email }}</p>
      </div>

      <div class="space-y-1">
        <h2 class="text-[#F05802] text-lg">Дата регистрации</h2>
        <p class="text-white text-xl">
          {{ formatDate(userProfile.createdAt) }}
        </p>
      </div>
    </div>

    <div v-else class="text-center text-white">
      Не удалось загрузить данные профиля
    </div>
  </div>
</template>
