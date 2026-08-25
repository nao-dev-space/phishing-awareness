import { watch, type Component } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
  type Router,
  type RouterScrollBehavior,
} from "vue-router";
import AboutView from "@/views/AboutView.vue";
import CheckpointView from "@/views/CheckpointView.vue";
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
import {
  ABOUT_ROUTE_NAME,
  CHECKPOINT_ROUTE_NAME,
  DISCLAIMER_ROUTE_NAME,
  HOME_ROUTE_NAME,
  LEARN_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  MAIL_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  PRIVACY_ROUTE_NAME,
  QUIZ_ROUTE_NAME,
  RESOURCES_ROUTE_NAME,
  REVEAL_ROUTE_NAME,
  REVIEW_ROUTE_NAME,
  ROUTE_CONFIGURATIONS,
} from "@/config/routes";
import { i18n, translateMessage } from "@/i18n";
import { updateDocumentTitle } from "@/services/pageMetadata";
import type { RouteConfiguration, RouteDefinition, RouteName } from "@/types/app";

const ROUTE_COMPONENTS: Readonly<Record<RouteName, Component>> = {
  [HOME_ROUTE_NAME]: HomeView,
  [MAIL_ROUTE_NAME]: MailView,
  [LOGIN_ROUTE_NAME]: LoginView,
  [CHECKPOINT_ROUTE_NAME]: CheckpointView,
  [REVEAL_ROUTE_NAME]: RevealView,
  [REVIEW_ROUTE_NAME]: ReviewView,
  [LEARN_ROUTE_NAME]: LearnView,
  [QUIZ_ROUTE_NAME]: QuizView,
  [RESOURCES_ROUTE_NAME]: ResourcesView,
  [ABOUT_ROUTE_NAME]: AboutView,
  [DISCLAIMER_ROUTE_NAME]: DisclaimerView,
  [PRIVACY_ROUTE_NAME]: PrivacyView,
  [NOT_FOUND_ROUTE_NAME]: NotFoundView,
};
const APP_NAME_MESSAGE_KEY: string = "app.name";

// configに集約した制御値へ表示コンポーネントと翻訳済みタイトルを対応させる。
export const ROUTE_DEFINITIONS: readonly RouteDefinition[] = ROUTE_CONFIGURATIONS.map(
  (configuration: RouteConfiguration): RouteDefinition => {
    const definition: RouteDefinition = {
      name: configuration.name,
      path: configuration.path,
      titleMessageKey: configuration.titleMessageKey,
      component: ROUTE_COMPONENTS[configuration.name],
    };
    return definition;
  },
);

// Vue Routerへ渡す形式へ限定して変換し、アプリ独自のtitleフィールドをmetaへ格納する。
const routeRecords: RouteRecordRaw[] = ROUTE_DEFINITIONS.map(
  (definition: RouteDefinition): RouteRecordRaw => {
    const routeRecord: RouteRecordRaw = {
      name: definition.name,
      path: definition.path,
      component: definition.component,
      meta: { titleMessageKey: definition.titleMessageKey },
    };
    return routeRecord;
  },
);

/** 画面遷移後にページ先頭を表示し、前画面のスクロール位置を持ち越さない。 */
const scrollToPageTop: RouterScrollBehavior = (): { top: number } => {
  const topPosition: { top: number } = { top: 0 };
  return topPosition;
};

/** ルートメタデータのフルパスキーからページタイトルを取得して反映する。 */
function updateRouteTitle(destinationRoute: RouteLocationNormalized): void {
  const titleMessageKey: string =
    typeof destinationRoute.meta.titleMessageKey === "string"
      ? destinationRoute.meta.titleMessageKey
      : APP_NAME_MESSAGE_KEY;
  const pageTitle: string = translateMessage(titleMessageKey);
  const applicationName: string = translateMessage(APP_NAME_MESSAGE_KEY);
  updateDocumentTitle(pageTitle, applicationName);
}

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior: scrollToPageTop,
});

router.afterEach(updateRouteTitle);
watch(i18n.global.locale, (): void => updateRouteTitle(router.currentRoute.value));

export default router;
