<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { db } from "../config/firebase";
import { ref as dbRef, onValue, off } from "firebase/database";

type Currency = {
  Name: string;
  Value: number;
  Previous: number;
  Nominal: number;
};

const RECEIVING_OPTIONS: Record<string, string[]> = {
  CNY: ["Alipay", "WeChat", "1688", "Карго/услуги"],
  KGS: ["Банковский перевод (МБанк, ОптимаБанк, БакайБанк и пр.)", "Наличными"],
};

const router = useRouter();

const rates = ref<Record<string, Currency>>({});
const minAmount = 50000;
const fromCurrency = ref("RUB");
const toCurrency = ref("");
const method = ref("");
const rubAmount = ref(minAmount.toString());
const cnyAmount = ref("");

onMounted(() => {
  const rateRef = dbRef(db, "exchangeRates/Valute");
  const handleValue = (snapshot: any) => {
    const val = snapshot.val();
    if (val) {
      rates.value = val;
    }
  };
  onValue(rateRef, handleValue);
  return () => off(rateRef, "value", handleValue);
});

watch(toCurrency, (newVal) => {
  if (newVal) {
    const options = RECEIVING_OPTIONS[newVal];
    const defaultMethod = options?.[0] || "";
    method.value = defaultMethod;
    localStorage.setItem("toAsset", newVal);
    localStorage.setItem("receive_method", defaultMethod);
    updateCnyAmount();
  }
});

const getRate = (symbol: string) => {
  if (symbol === "RUB") return 1;
  const currency = rates.value?.[symbol];
  return currency ? currency.Value / currency.Nominal : 0;
};

const availableToCurrencies = computed(() => {
  return Object.entries(rates.value)
    .filter(([key]) => key !== "RUB")
    .map(([key]) => key);
});

const exchangeRate = computed(() => {
  if (fromCurrency.value && toCurrency.value) {
    return getRate(fromCurrency.value) / getRate(toCurrency.value);
  }
  return 0;
});

const updateCnyAmount = () => {
  const rub = parseFloat(rubAmount.value);
  if (!isNaN(rub) && exchangeRate.value) {
    const result = (rub * exchangeRate.value).toFixed(6);
    cnyAmount.value = result;
    localStorage.setItem("amount_to", result);
  }
};

const handleFromInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = parseFloat(target.value);
  if (isNaN(val) || val < minAmount) {
    val = minAmount;
  }

  rubAmount.value = val.toString();
  localStorage.setItem("amount_from", val.toString());
  updateCnyAmount();
};

const handleReceiveMethodChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  method.value = val;
  localStorage.setItem("receive_method", val);
};

const submitForm = () => {
  if (isFormValid.value) {
    localStorage.setItem("fromCurrency", fromCurrency.value);
    localStorage.setItem("toCurrency", toCurrency.value);
    localStorage.setItem("exchangeRate", exchangeRate.value.toString());

    router.push("/user-data");
  }
};

const isFormValid = computed(() => {
  return (
    parseFloat(rubAmount.value) >= minAmount &&
    toCurrency.value !== "" &&
    method.value !== ""
  );
});
</script>

<template>
  <div class="flex w-full pr-3 items-center justify-center">
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
              :value="rubAmount"
              @input="handleFromInput"
              type="number"
              placeholder="Введите сумму"
              class="bg-transparent outline-none w-full text-sm placeholder-gray-500"
              min="50000"
            />
            <select v-model="fromCurrency" class="select-style ml-2" disabled>
              <option value="RUB">RUB</option>
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
              <option
                v-for="key in availableToCurrencies"
                :key="key"
                :value="key"
              >
                {{ key }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="text-center mb-4">
        <div class="text-sm mb-2 font-normal">СПОСОБ ПОЛУЧЕНИЯ</div>
        <select
          v-model="method"
          @change="handleReceiveMethodChange"
          class="select-method"
        >
          <option disabled value="">Выберите способ</option>
          <option
            v-for="item in RECEIVING_OPTIONS[toCurrency]"
            :key="item"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <div class="text-center text-sm text-black mb-6">
        1 RUB = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}
      </div>

      <button
        @click="submitForm"
        class="w-full py-4 rounded-xl bg-[#4D0538] text-white text-base hover:opacity-90 transition disabled:opacity-50"
        :disabled="!isFormValid"
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
  width: 220px;
  margin: 0 auto;
  display: block;
  text-align: center;
}
input:disabled {
  cursor: not-allowed;
}
</style>
