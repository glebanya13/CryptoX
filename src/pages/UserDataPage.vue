<script setup lang="ts">
import { ref } from "vue";

const cardNumber = ref("");
const fullName = ref("");
const sbpPhone = ref("");
const email = ref("");
const contactInfo = ref("");
const file = ref<File | null>(null);
const agreed = ref(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md bg-white text-black rounded-2xl p-6">
      <h2 class="text-center text-2xl mb-6">Данные</h2>

      <form class="space-y-4">
        <input
          v-model="cardNumber"
          type="text"
          placeholder="На карту*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="fullName"
          type="text"
          placeholder="ФИО держателя карты*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="sbpPhone"
          type="text"
          placeholder="Телефон СБП (карта)*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="email"
          type="email"
          placeholder="E-mail*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />
        <input
          v-model="contactInfo"
          type="text"
          placeholder="Контакты для связи*"
          class="w-full px-4 h-10 border rounded-lg text-sm border-purple-900 border-b-[3px] border-b-orange-500 bg-[#D9D9D9]"
        />

        <div class="text-xl text-gray-600">или</div>

        <div class="flex items-center gap-3">
          <label
            class="bg-[#4D0538] text-white py-3 px-6 rounded-lg cursor-pointer hover:opacity-90 text-sm"
          >
            Выберите файл
            <input type="file" class="hidden" @change="handleFileChange" />
          </label>
          <span class="text-sm text-gray-600">{{
            file?.name || "Файл не выбран"
          }}</span>
        </div>

        <label class="flex items-start gap-2 mt-4 text-xs text-gray-700">
          <input
            type="checkbox"
            v-model="agreed"
            class="accent-orange-500 mt-1"
          />
          <span
            >Я прочитал и согласен с условиями обмена и правилами AML
            проверки</span
          >
        </label>
      </form>
    </div>
  </div>
</template>
