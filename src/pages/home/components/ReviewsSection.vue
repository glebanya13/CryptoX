<script setup lang="ts">
import { ref, onMounted } from "vue";
import { db } from "../../../config/firebase";
import {
  ref as dbRef,
  query,
  orderByChild,
  limitToLast,
  onValue,
  off,
} from "firebase/database";

interface Review {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

const reviews = ref<Review[]>([]);
const isLoading = ref(true);

onMounted(() => {
  const reviewsQuery = query(
    dbRef(db, "reviews"),
    orderByChild("createdAt"),
    limitToLast(2)
  );

  const fetchReviews = (snapshot: any) => {
    const data = snapshot.val();
    if (data) {
      reviews.value = Object.entries(data)
        .map(([id, review]: [string, any]) => ({
          id,
          ...review,
        }))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); // сортируем по убыванию даты
    }
    isLoading.value = false;
  };

  onValue(reviewsQuery, fetchReviews);
  return () => off(reviewsQuery, "value", fetchReviews);
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    now.getMonth() -
    date.getMonth();

  if (diffInMonths > 0) {
    return `${diffInMonths} ${getMonthWord(diffInMonths)} назад`;
  }

  return "Недавно";
};

const getMonthWord = (months: number) => {
  if (months % 10 === 1 && months % 100 !== 11) return "месяц";
  if ([2, 3, 4].includes(months % 10) && ![12, 13, 14].includes(months % 100))
    return "месяца";
  return "месяцев";
};
</script>

<template>
  <section class="w-full mx-auto pt-10 px-4 space-y-6 pb-10 max-w-4xl">
    <h1 class="text-center text-2xl text-white mb-10">ОТЗЫВЫ</h1>

    <div v-if="isLoading" class="text-center text-white">Загрузка отзывов...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-xl p-4 flex flex-col"
      >
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center"
          >
            <span class="text-sm text-gray-600">
              {{ review.authorName.charAt(0) }}
            </span>
          </div>
          <span class="text-black font-semibold">{{ review.authorName }}</span>
        </div>

        <textarea
          disabled
          class="w-full bg-[#D9D9D9] rounded-xl p-3 resize-none text-[#9d9d9d] flex-grow"
          :value="review.text"
          rows="4"
        />

        <p class="text-gray-500 text-sm mt-3 text-right">{{ formatDate(review.createdAt) }}</p>
      </div>
    </div>

    <div class="text-center mt-10">
      <router-link
        to="/reviews"
        class="inline-block bg-[#F06000] text-black py-3 px-8 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Все отзывы
      </router-link>
    </div>
  </section>
</template>
