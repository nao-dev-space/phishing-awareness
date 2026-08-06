import { createApp, type App as VueApp } from "vue";
import App from "@/App.vue";
import { i18n, messageGroup } from "@/i18n";
import router from "@/router";

const application: VueApp<Element> = createApp(App);
application.use(i18n);
application.use(router);
const descriptionMeta: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
if (descriptionMeta) {
  descriptionMeta.content = messageGroup("app").description;
}
application.mount("#app");
