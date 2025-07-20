import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/home/HomePage.vue";
import ProfilePage from "../pages/profile/ProfilePage.vue";
import ConfirmPage from "../pages/confirm/ConfirmPage.vue";
import SignUpPage from "../pages/auth/SignUpPage.vue";
import SignInPage from "../pages/auth/SignInPage.vue";
import ContactUsPage from "../pages/contact/ContactUsPage.vue";
import AboutUsPage from "../pages/about/AboutUsPage.vue";
import ReviewsPage from "../pages/reviews/ReviewsPage.vue";
import NewsPage from "../pages/news/NewsPage.vue";
import NewsDetailPage from "../pages/news/NewsDetailPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/user-data", component: ConfirmPage },
  { path: "/sign-up", component: SignUpPage },
  { path: "/sign-in", component: SignInPage },
  { path: "/contact-us", component: ContactUsPage },
  { path: "/about-us", component: AboutUsPage },
  { path: "/reviews", component: ReviewsPage },
  { path: "/news", component: NewsPage },
  { path: "/news/:id", component: NewsDetailPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
