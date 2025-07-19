<script lang="ts" setup></script>

<template>
  <div class="w-full mx-auto pt-10 px-4 space-y-6 pb-10">
    <h1 class="text-center text-2xl text-white mb-10">ОТЗЫВЫ</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div class="bg-white rounded-xl p-4 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#D9D9D9]"></div>
          <span class="text-black">Денис Денисович</span>
        </div>
        <textarea
          disabled
          class="w-full bg-[#D9D9D9] rounded-xl p-3 h-[75px] resize-none text-[#9d9d9d]"
          value="Отличный и быстрый сервис!"
        >
Отличный и быстрый сервис!</textarea
        >
        <p class="text-gray-500 text-sm">5 месяцев назад</p>
      </div>

      <!-- Карточка 2 -->
      <div class="bg-white rounded-xl p-4 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#D9D9D9]"></div>
          <span class="text-black">Денис Денисович</span>
        </div>
        <textarea
          disabled
          class="w-full bg-[#D9D9D9] rounded-xl p-3 h-[75px] resize-none text-[#9d9d9d]"
          value="Отличный и быстрый сервис!"
        >
Отличный и быстрый сервис!</textarea
        >
        <p class="text-gray-500 text-sm">5 месяцев назад</p>
      </div>

      <div class="bg-white rounded-xl p-4 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#D9D9D9]"></div>
          <span class="text-black">Денис Денисович</span>
        </div>
        <textarea
          disabled
          class="w-full bg-[#D9D9D9] rounded-xl p-3 h-[75px] resize-none text-[#9d9d9d]"
          value="Отличный и быстрый сервис!"
        >
Отличный и быстрый сервис!</textarea
        >
        <p class="text-gray-500 text-sm">5 месяцев назад</p>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <button
        class="bg-[#4D0538] w-full text-white py-4 rounded-lg hover:opacity-90"
      >
        Добавить отзыв
      </button>
    </div>
  </div>
</template>
