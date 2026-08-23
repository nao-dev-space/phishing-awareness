import { createApp, type App as VueApp } from "vue";
import App from "@/App.vue";
import { i18n, translateMessage } from "@/i18n";
import router from "@/router";
import { updateDescriptionMetadata } from "@/services/pageMetadata";

const APPLICATION_DESCRIPTION_MESSAGE_KEY: string = "app.description";
const application: VueApp<Element> = createApp(App);
application.use(i18n);
application.use(router);
const applicationDescription: string = translateMessage(APPLICATION_DESCRIPTION_MESSAGE_KEY);
updateDescriptionMetadata(applicationDescription);
application.mount("#app");
