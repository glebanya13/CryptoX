<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cardNumber = ref("");
const fullName = ref("");
const sbpPhone = ref("");
const email = ref("");
const contactInfo = ref("");
const file = ref<File | null>(null);
const agreed = ref(false);
const isSwapping = ref(false);
const errors = ref<Record<string, string>>({});

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string) =>
  /^\+?[0-9]{10,15}$/.test(phone.replace(/\s+/g, ""));

const validateCardNumber = (number: string) =>
  /^[0-9]{12,20}$/.test(number.replace(/\s+/g, ""));

const validateCardNumberField = () => {
  if (!cardNumber.value) {
    errors.value.cardNumber = "Введите номер карты";
  } else if (!validateCardNumber(cardNumber.value)) {
    errors.value.cardNumber = "Номер карты должен содержать 12-20 цифр";
  } else {
    delete errors.value.cardNumber;
  }
};

const validateFullNameField = () => {
  if (!fullName.value.trim()) {
    errors.value.fullName = "Введите ФИО держателя карты";
  } else {
    delete errors.value.fullName;
  }
};

const validateSbpPhoneField = () => {
  if (!sbpPhone.value) {
    errors.value.sbpPhone = "Введите номер телефона";
  } else if (!validatePhone(sbpPhone.value)) {
    errors.value.sbpPhone = "Введите корректный номер телефона";
  } else {
    delete errors.value.sbpPhone;
  }
};

const validateEmailField = () => {
  if (!email.value) {
    errors.value.email = "Введите email";
  } else if (!validateEmail(email.value)) {
    errors.value.email = "Введите корректный email";
  } else {
    delete errors.value.email;
  }
};

const validateContactInfoField = () => {
  if (!contactInfo.value.trim()) {
    errors.value.contactInfo = "Введите контактные данные";
  } else {
    delete errors.value.contactInfo;
  }
};

const validateAgreement = () => {
  if (!agreed.value) {
    errors.value.agreement = "Необходимо согласие с условиями";
  } else {
    delete errors.value.agreement;
  }
};

const validateForm = () => {
  errors.value = {};

  if (!file.value) {
    validateCardNumberField();
    validateFullNameField();
    validateSbpPhoneField();
    validateEmailField();
    validateContactInfoField();
  }

  validateAgreement();

  return Object.keys(errors.value).length === 0;
};

const uploadToCloudinary = async (file: File): Promise<string> => {
  const url = `https://api.cloudinary.com/v1_1/db7tgqxq1/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const res = await fetch(url, { method: "POST", body: formData });
  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  return data.secure_url;
};

const handleSwap = async () => {
  if (!validateForm()) return;

  isSwapping.value = true;
  try {
    const amount_from = localStorage.getItem("amount_from") || "";
    const amount_to = localStorage.getItem("amount_to") || "";
    const receive_method = localStorage.getItem("receive_method") || "";
    const fromCurrency = localStorage.getItem("fromCurrency") || "";
    const toCurrency = localStorage.getItem("toCurrency") || "";

    let message = `Новый обмен:\n\nСумма: ${amount_from} ${fromCurrency} ➝ ${amount_to} ${toCurrency}\nМетод получения: ${receive_method}`;

    if (file.value) {
      const uploadedUrl = await uploadToCloudinary(file.value);
      message = `Новый обмен с файлом:\nСсылка: ${uploadedUrl}\n\n${message}`;
    } else {
      message += `\n\nКарта: ${cardNumber.value}\nФИО: ${fullName.value}\nТел: ${sbpPhone.value}\nEmail: ${email.value}\nКонтакты: ${contactInfo.value}`;
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    alert("Данные успешно отправлены!");
    resetForm();
    router.push("/");
  } catch (error) {
    alert("Ошибка при отправке данных");
    throw error;
  } finally {
    isSwapping.value = false;
  }
};

const resetForm = () => {
  file.value = null;
  cardNumber.value = "";
  fullName.value = "";
  sbpPhone.value = "";
  email.value = "";
  contactInfo.value = "";
  agreed.value = false;
  errors.value = {};
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) file.value = target.files[0];
};

// Очистка ошибок при вводе, если данные становятся валидными
const onInputCardNumber = () => {
  if (errors.value.cardNumber && validateCardNumber(cardNumber.value)) {
    delete errors.value.cardNumber;
  }
};

const onInputFullName = () => {
  if (errors.value.fullName && fullName.value.trim()) {
    delete errors.value.fullName;
  }
};

const onInputSbpPhone = () => {
  if (errors.value.sbpPhone && validatePhone(sbpPhone.value)) {
    delete errors.value.sbpPhone;
  }
};

const onInputEmail = () => {
  if (errors.value.email && validateEmail(email.value)) {
    delete errors.value.email;
  }
};

const onInputContactInfo = () => {
  if (errors.value.contactInfo && contactInfo.value.trim()) {
    delete errors.value.contactInfo;
  }
};

const onInputAgreement = () => {
  if (errors.value.agreement && agreed.value) {
    delete errors.value.agreement;
  }
};

const isFormValid = computed(() => {
  const fieldsValid =
    !!file.value ||
    (validateCardNumber(cardNumber.value) &&
      fullName.value.trim() &&
      validatePhone(sbpPhone.value) &&
      validateEmail(email.value) &&
      contactInfo.value.trim());

  return fieldsValid && agreed.value && !isSwapping.value;
});

const BOT_TOKEN = "7873307517:AAF0f-GZG4qCol-NvAvaU6AhLyQSt41I-0E";
const CHAT_ID = "572193621";
</script>

<template>
  <div class="flex w-full items-center justify-center px-4 py-8">
    <div class="w-full max-w-md md:max-w-xl bg-white text-black rounded-2xl p-6 shadow-lg">
      <h2 class="text-center text-2xl mb-6">Данные</h2>

      <form class="space-y-4" @submit.prevent="handleSwap">
        <div class="relative">
          <input
            v-model="cardNumber"
            type="text"
            placeholder="На карту*"
            @blur="validateCardNumberField"
            @input="onInputCardNumber"
            :class="[
              'w-full px-4 h-10 border rounded-lg text-sm bg-[#D9D9D9]',
              errors.cardNumber
                ? 'border-red-500'
                : cardNumber && validateCardNumber(cardNumber)
                ? 'border-green-500'
                : 'border-purple-900 border-b-[3px] border-b-orange-500',
            ]"
          />
          <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">
            {{ errors.cardNumber }}
          </p>
        </div>

        <div class="relative">
          <input
            v-model="fullName"
            type="text"
            placeholder="ФИО держателя карты*"
            @blur="validateFullNameField"
            @input="onInputFullName"
            :class="[
              'w-full px-4 h-10 border rounded-lg text-sm bg-[#D9D9D9]',
              errors.fullName
                ? 'border-red-500'
                : fullName && fullName.trim()
                ? 'border-green-500'
                : 'border-purple-900 border-b-[3px] border-b-orange-500',
            ]"
          />
          <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">
            {{ errors.fullName }}
          </p>
        </div>

        <div class="relative">
          <input
            v-model="sbpPhone"
            type="text"
            placeholder="Телефон СБП (карта)*"
            @blur="validateSbpPhoneField"
            @input="onInputSbpPhone"
            :class="[
              'w-full px-4 h-10 border rounded-lg text-sm bg-[#D9D9D9]',
              errors.sbpPhone
                ? 'border-red-500'
                : sbpPhone && validatePhone(sbpPhone)
                ? 'border-green-500'
                : 'border-purple-900 border-b-[3px] border-b-orange-500',
            ]"
          />
          <p v-if="errors.sbpPhone" class="text-red-500 text-xs mt-1">
            {{ errors.sbpPhone }}
          </p>
        </div>

        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="E-mail*"
            @blur="validateEmailField"
            @input="onInputEmail"
            :class="[
              'w-full px-4 h-10 border rounded-lg text-sm bg-[#D9D9D9]',
              errors.email
                ? 'border-red-500'
                : email && validateEmail(email)
                ? 'border-green-500'
                : 'border-purple-900 border-b-[3px] border-b-orange-500',
            ]"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div class="relative">
          <input
            v-model="contactInfo"
            type="text"
            placeholder="Контакты для связи*"
            @blur="validateContactInfoField"
            @input="onInputContactInfo"
            :class="[
              'w-full px-4 h-10 border rounded-lg text-sm bg-[#D9D9D9]',
              errors.contactInfo
                ? 'border-red-500'
                : contactInfo && contactInfo.trim()
                ? 'border-green-500'
                : 'border-purple-900 border-b-[3px] border-b-orange-500',
            ]"
          />
          <p v-if="errors.contactInfo" class="text-red-500 text-xs mt-1">
            {{ errors.contactInfo }}
          </p>
        </div>

        <div class="text-xl text-gray-600 text-center">или</div>
        <div class="flex items-center gap-3">
          <label
            class="bg-[#4D0538] text-white py-3 px-6 rounded-lg cursor-pointer hover:opacity-90 text-sm"
          >
            Выберите файл
            <input type="file" class="hidden" @change="handleFileChange" />
          </label>
          <span class="text-sm text-gray-600">
            {{ file?.name || "Файл не выбран" }}
          </span>
        </div>

        <div class="relative">
          <label class="flex items-start gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              v-model="agreed"
              @change="onInputAgreement"
              class="accent-orange-500 mt-1"
            />
            <span>Я прочитал и согласен с условиями обмена и правилами AML проверки</span>
          </label>
          <p v-if="errors.agreement" class="text-red-500 text-xs mt-1">
            {{ errors.agreement }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-[#4D0538] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          :disabled="!isFormValid"
        >
          <span v-if="!isSwapping">Подтвердить обмен</span>
          <span v-else>Отправка...</span>
        </button>
      </form>
    </div>
  </div>
</template>
