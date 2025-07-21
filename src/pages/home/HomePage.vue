<script setup lang="ts">
import ExchangeSection from "./components/ExchangeSection.vue";
import NewsSection from "./components/NewsSection.vue";
import ReviewsSection from "./components/ReviewsSection.vue";
import ContactsSection from "./components/ContactsSection.vue";
import AboutSection from "./components/AboutSection.vue";
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
