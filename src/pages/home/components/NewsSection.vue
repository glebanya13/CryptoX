<script setup lang="ts">
import { ref, onMounted } from "vue";
import { db } from "../../../config/firebase";
import { ref as dbRef, onValue, off, query, limitToLast, orderByChild } from "firebase/database";
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
  const newsQuery = query(
  dbRef(db, "news"),
  orderByChild("id"),
  limitToLast(2)
);

  const handleNews = (snapshot: any) => {
    const val = snapshot.val();
    if (val) {
      newsList.value = Object.entries(val).map(([id, item]: [string, any]) => ({
        id,
        ...item,
      }));
    }
  };

  onValue(newsQuery, handleNews);
  return () => off(newsQuery, "value", handleNews);
});

const navigateToNews = (id: string) => {
  router.push(`/news/${id}`);
};

const viewAllNews = () => {
  router.push("/news");
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
          class="bg-[#4D0538] self-start text-white py-2 px-5 rounded-lg hover:opacity-90"
        >
          Читать далее
        </button>
      </div>
    </div>

    <div class="text-center">
      <button
        @click="viewAllNews"
        class="bg-[#F06000] text-black py-3 px-8 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Все новости
      </button>
    </div>
  </div>
</template>
