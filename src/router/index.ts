import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import DisclaimerView from "@/views/DisclaimerView.vue";
import HomeView from "@/views/HomeView.vue";
import LearnView from "@/views/LearnView.vue";
import LoginView from "@/views/LoginView.vue";
import MailView from "@/views/MailView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import QuizView from "@/views/QuizView.vue";
import ResourcesView from "@/views/ResourcesView.vue";
import RevealView from "@/views/RevealView.vue";
import ReviewView from "@/views/ReviewView.vue";
import { APP_NAME } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { RouteDefinition } from "@/types/app";

const titles = messageGroup("routeTitles");
export const ROUTE_DEFINITIONS: readonly RouteDefinition[] = [
  { name: "home", path: "/", title: titles.home, component: HomeView },
  { name: "experience-mail", path: "/experience/mail", title: titles.mail, component: MailView },
  {
    name: "experience-login",
    path: "/experience/login",
    title: titles.login,
    component: LoginView,
  },
  {
    name: "experience-reveal",
    path: "/experience/reveal",
    title: titles.reveal,
    component: RevealView,
  },
  {
    name: "experience-review",
    path: "/experience/review",
    title: titles.review,
    component: ReviewView,
  },
  { name: "learn", path: "/learn", title: titles.learn, component: LearnView },
  { name: "quiz", path: "/quiz", title: titles.quiz, component: QuizView },
  { name: "resources", path: "/resources", title: titles.resources, component: ResourcesView },
  { name: "about", path: "/about", title: titles.about, component: AboutView },
  { name: "disclaimer", path: "/disclaimer", title: titles.disclaimer, component: DisclaimerView },
  { name: "privacy", path: "/privacy", title: titles.privacy, component: PrivacyView },
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    title: titles.notFound,
    component: NotFoundView,
  },
];

const routeRecords: RouteRecordRaw[] = ROUTE_DEFINITIONS.map(
  (definition: RouteDefinition): RouteRecordRaw => ({
    name: definition.name,
    path: definition.path,
    component: definition.component,
    meta: { title: definition.title },
  }),
);

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior: (): { top: number } => ({ top: 0 }),
});

router.afterEach((to): void => {
  const pageTitle: string = typeof to.meta.title === "string" ? to.meta.title : APP_NAME;
  document.title = `${pageTitle} | ${APP_NAME}`;
});

export default router;
