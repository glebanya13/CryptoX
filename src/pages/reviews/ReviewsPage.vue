<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { db } from "../../config/firebase";
import { ref as dbRef, push, onValue, off } from "firebase/database";
import { useAuth } from "../../composables/useAuth";
import { useRouter } from "vue-router";

interface Review {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
  userId?: string;
}

const { user: authUser } = useAuth();
const router = useRouter();
const reviews = ref<Review[]>([]);
const newReviewText = ref("");
const isLoading = ref(true);
const isAddingReview = ref(false);

onMounted(() => {
  const reviewsRef = dbRef(db, "reviews");

  const fetchReviews = (snapshot: any) => {
    const data = snapshot.val();
    if (data) {
      reviews.value = Object.entries(data).map(
        ([id, review]: [string, any]) => ({
          id,
          ...review,
        })
      );
    }
    isLoading.value = false;
  };

  onValue(reviewsRef, fetchReviews);
  return () => off(reviewsRef, "value", fetchReviews);
});

const addReview = async () => {
  if (!newReviewText.value.trim()) return;

  if (!authUser.value) {
    router.push("/login");
    return;
  }

  try {
    isAddingReview.value = true;

    const newReview: Omit<Review, "id"> = {
      authorName:
        authUser.value.displayName ||
        authUser.value.email?.split("@")[0] ||
        "Аноним",
      text: newReviewText.value.trim(),
      createdAt: new Date().toISOString(),
      userId: authUser.value.uid,
    };

    await push(dbRef(db, "reviews"), newReview);
    newReviewText.value = "";
  } catch (error) {
    throw error;
  } finally {
    isAddingReview.value = false;
  }
};

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
  <div class="w-full mx-auto pt-10 px-4 space-y-6 pb-10">
    <h1 class="text-center text-2xl text-white mb-10">ОТЗЫВЫ</h1>

    <div v-if="isLoading" class="text-center text-white">
      Загрузка отзывов...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-xl p-4 space-y-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center"
          >
            <span class="text-sm text-gray-600">
              {{ review.authorName.charAt(0) }}
            </span>
          </div>
          <span class="text-black">{{ review.authorName }}</span>
        </div>
        <textarea
          disabled
          class="w-full bg-[#D9D9D9] rounded-xl p-3 h-[75px] resize-none text-[#9d9d9d]"
          :value="review.text"
        />
        <p class="text-gray-500 text-sm">{{ formatDate(review.createdAt) }}</p>
      </div>
    </div>

    <div v-if="authUser" class="max-w-md mx-auto mt-10 bg-white rounded-xl p-6">
      <h2 class="text-lg font-medium mb-4 text-black">Оставить отзыв</h2>
      <textarea
        v-model="newReviewText"
        placeholder="Напишите ваш отзыв..."
        class="w-full text-black bg-[#D9D9D9] rounded-xl p-4 h-32 resize-none"
      ></textarea>
      <button
        @click="addReview"
        :disabled="!newReviewText.trim() || isAddingReview"
        class="mt-4 bg-[#4D0538] text-white py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        <span v-if="!isAddingReview">Отправить отзыв</span>
        <span v-else>Отправка...</span>
      </button>
    </div>

    <div
      v-else
      class="max-w-md mx-auto mt-10 bg-white rounded-xl p-6 text-center"
    >
      <p class="mb-4 text-black">
        Чтобы оставить отзыв, пожалуйста, авторизуйтесь
      </p>
      <router-link
        to="/login"
        class="bg-[#4D0538] text-white py-2 px-6 rounded-lg hover:opacity-90 inline-block"
      >
        Войти
      </router-link>
    </div>
  </div>
</template>
