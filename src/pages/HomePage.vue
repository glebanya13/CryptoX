<script setup lang="ts">
import { ref } from "vue";

const rubAmount = ref("");
const cnyAmount = ref("");
const exchangeRate = 0.081001;
const method = ref("Alipay");
const fromCurrency = ref("RUB");
const toCurrency = ref("CNY");

const convertToCNY = () => {
  const rub = parseFloat(rubAmount.value);
  if (!isNaN(rub)) {
    cnyAmount.value = (rub * exchangeRate).toFixed(6);
  } else {
    cnyAmount.value = "";
  }
};
</script>

<template>
  <div
    class="min-h-screen w-full bg-gradient-to-b from-[#360036] via-[#4D0538] via-[80%] to-[#F06000] flex items-center justify-center px-4 py-6"
  >
    <div
      class="w-full max-w-md bg-white text-black rounded-2xl px-5 pt-10 pb-6 relative shadow-md"
    >
      <div class="absolute top-4 left-0 right-0">
        <div
          class="mx-0 -translate-y-1/2 rounded-t-xl border border-white bg-[#360036] text-white text-center text-xs py-2"
        >
          Присоединяйтесь к нашему Telegram каналу
        </div>
      </div>

      <h2 class="text-center text-base font-medium mb-6 mt-2">
        ОБМЕН РУБЛЕЙ НА ЮАНИ/СОМЫ
      </h2>

      <div class="mb-4">
        <div class="gradient-border p-[2px] rounded-xl">
          <div
            class="flex items-center justify-between bg-[#EAEAEA] rounded-xl h-[80px] px-4"
          >
            <input
              v-model="rubAmount"
              @input="convertToCNY"
              type="number"
              placeholder="Введите сумму"
              class="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
            <select v-model="fromCurrency" class="select-style ml-2">
              <option value="RUB">RUB</option>
              <option value="KGS">KGS</option>
            </select>
          </div>
        </div>
      </div>

      <div class="text-center text-gray-500 my-2">↓ ↑</div>

      <div class="mb-6">
        <div class="gradient-border p-[2px] rounded-xl">
          <div
            class="flex items-center justify-between bg-[#EAEAEA] rounded-xl h-[80px] px-4"
          >
            <input
              :value="cnyAmount"
              disabled
              placeholder="Введите сумму"
              class="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
            <select v-model="toCurrency" class="select-style ml-2">
              <option value="CNY">CNY</option>
              <option value="UZS">UZS</option>
            </select>
          </div>
        </div>
      </div>

      <div class="text-center mb-4">
        <div class="text-sm mb-2 font-normal">СПОСОБ ПОЛУЧЕНИЯ</div>
        <select v-model="method" class="select-method">
          <option value="Alipay">Alipay</option>
          <option value="WeChat Pay">WeChat Pay</option>
          <option value="ЮMoney">ЮMoney</option>
        </select>
      </div>

      <div class="text-center text-sm text-black mb-6">
        1 RUB = {{ exchangeRate }} CNY
      </div>

      <button
        class="w-full py-4 rounded-xl bg-[#4D0538] text-white text-base hover:opacity-90 transition"
      >
        Обменять
      </button>
    </div>
  </div>
</template>

<style scoped>
.gradient-border {
  background: linear-gradient(90deg, #f06000 0%, #360036 100%);
}
.select-style {
  width: 81px;
  height: 35px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  color: black;
  padding-left: 6px;
}
.select-method {
  height: 35px;
  background-color: #eaeaea;
  border: 1px solid #ccc;
  font-size: 14px;
  color: black;
  border-radius: 16px;
  padding: 0 12px;
  width: 170px;
  margin: 0 auto;
  display: block;
  text-align: center;
}
input:disabled {
  cursor: not-allowed;
}
</style>
