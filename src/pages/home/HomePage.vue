<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import ExchangeSection from "./components/ExchangeSection.vue";
import NewsSection from "./components/NewsSection.vue";
import ReviewsSection from "./components/ReviewsSection.vue";
import ContactsSection from "./components/ContactsSection.vue";
import AboutSection from "./components/AboutSection.vue";

const route = useRoute();

onMounted(() => {
  if (route.query.scrollTo) {
    const id = route.query.scrollTo as string;
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
});

</script>

<template>
  <div class="w-full">
    <section id="exchange">
      <ExchangeSection />
    </section>
    <section id="about-us">
      <AboutSection />
    </section>
    <section id="news">
      <NewsSection />
    </section>
    <section id="reviews">
      <ReviewsSection />
    </section>
    <section id="contact-us">
      <ContactsSection />
    </section>
  </div>
</template>
