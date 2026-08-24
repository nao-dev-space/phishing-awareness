import { createApp, watch, type App as VueApp } from "vue";
import App from "@/App.vue";
import { i18n, translateMessage } from "@/i18n";
import router from "@/router";
import { updateDescriptionMetadata } from "@/services/pageMetadata";
import "@/styles/actions.css";

const APPLICATION_DESCRIPTION_MESSAGE_KEY: string = "app.description";
const application: VueApp<Element> = createApp(App);
application.use(i18n);
application.use(router);

/** 現在のロケールに対応するアプリ説明をメタデータへ反映する。 */
function updateApplicationDescription(): void {
  const applicationDescription: string = translateMessage(APPLICATION_DESCRIPTION_MESSAGE_KEY);
  updateDescriptionMetadata(applicationDescription);
}

updateApplicationDescription();
watch(i18n.global.locale, updateApplicationDescription);
application.mount("#app");
