<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { db } from "../../config/firebase";
import { ref as dbRef, onValue, off } from "firebase/database";
import { useRoute } from "vue-router";

interface NewsItem {
  id: string;
  title: string;
  preview: string;
  description: string;
  content: string;
}

const newsItem = ref<NewsItem | null>(null);
const route = useRoute();
const isLoading = ref(true);

onMounted(() => {
  const newsId = route.params.id as string;
  const newsRef = dbRef(db, `news/${newsId}`);

  const handleNews = (snapshot: any) => {
    const val = snapshot.val();
    if (val) {
      newsItem.value = {
        id: newsId,
        ...val,
      };
    }
    isLoading.value = false;
  };

  onValue(newsRef, handleNews);
  return () => off(newsRef, "value", handleNews);
});
</script>

<template>
  <div class="w-full mx-auto pt-10 px-4 pb-10 max-w-4xl">
    <div v-if="isLoading" class="text-center text-white">Загрузка...</div>

    <div v-else-if="newsItem" class="bg-white rounded-xl p-6 space-y-6">
      <h1 class="text-2xl font-bold text-black">{{ newsItem.title }}</h1>

      <img
        :src="newsItem.preview"
        alt="preview"
        class="w-full h-64 object-cover rounded-lg"
      />

      <div class="prose text-black">{{ newsItem.content }}</div>

      <router-link
        to="/news"
        class="inline-block bg-[#4D0538] text-white py-2 px-6 rounded-lg hover:opacity-90"
      >
        Назад к списку новостей
      </router-link>
    </div>

    <div v-else class="text-center text-white">Новость не найдена</div>
  </div>
</template>
