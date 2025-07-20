<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { db } from "../../config/firebase";
import { ref as dbRef, onValue, off } from "firebase/database";
import { useRouter } from "vue-router";

interface NewsItem {
  id: string;
  title: string;
  preview: string;
  description: string;
  content: string;
}

const newsList = ref<NewsItem[]>([]);
const router = useRouter();

onMounted(() => {
  const newsRef = dbRef(db, "news");

  const handleNews = (snapshot: any) => {
    const val = snapshot.val();
    if (val) {
      newsList.value = Object.entries(val).map(([id, item]: [string, any]) => ({
        id,
        ...item,
      }));
    }
  };

  onValue(newsRef, handleNews);
  return () => off(newsRef, "value", handleNews);
});

const navigateToNews = (id: string) => {
  router.push(`/news/${id}`);
};
</script>

<template>
  <div class="w-full mx-auto pt-10 px-4 space-y-10 pb-10">
    <h1 class="text-center text-2xl text-white mb-10">НОВОСТИ</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div
        v-for="item in newsList"
        :key="item.id"
        class="bg-white rounded-xl p-4 space-y-4 flex flex-col"
      >
        <h2 class="text-lg text-black">{{ item.title }}</h2>

        <img
          :src="item.preview"
          alt="preview"
          class="h-[90px] object-cover rounded-[15px]"
        />

        <p class="text-sm flex-grow text-[#9d9d9d]">
          {{ item.description }}
        </p>

        <button
          @click="navigateToNews(item.id)"
          class="bg-[#4D0538] self-start text-white py-3 px-6 rounded-lg hover:opacity-90"
        >
          Читать далее
        </button>
      </div>
    </div>
  </div>
</template>
