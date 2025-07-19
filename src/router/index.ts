import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../pages/HomePage.vue'
import UserDataPage from '../pages/UserDataPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import SignInPage from '../pages/SignInPage.vue'
import ContactUsPage from '../pages/ContactUsPage.vue'
import AboutUsPage from '../pages/AboutUsPage.vue'
import ReviewsPage from '../pages/ReviewsPage.vue'
import NewsPage from '../pages/NewsPage.vue'

const routes = [
  { path: "/", component: HomePage },
  { path: "/user-data", component: UserDataPage },
  { path: "/sign-up", component: SignUpPage },
  { path: "/sign-in", component: SignInPage },
  { path: "/contact-us", component: ContactUsPage },
  { path: "/about-us", component: AboutUsPage },
  { path: "/reviews", component: ReviewsPage },
  { path: "/news", component: NewsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
