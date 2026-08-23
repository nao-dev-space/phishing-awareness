<template>
  <div class="home-view">
    <div class="home-view-hero">
      <div class="home-view-hero-copy">
        <AppText :text="eyebrow" :tone="accentTone" />
        <AppHeading :level="heroLevel" :text="appName" :size="heroSize" />
        <AppText :text="purpose" :size="leadSize" />
        <div class="home-view-actions">
          <RouteAction :label="startLabel" :route-name="mailRoute" />
          <RouteAction :label="learnLabel" :route-name="learnRoute" :variant="secondaryVariant" />
        </div>
        <NoticeBox
          class="home-view-warning"
          :title="warningTitle"
          :message="credentialWarning"
          :tone="warningTone"
          :is-alert="true"
        />
      </div>
    </div>
    <div class="home-view-lesson">
      <AppText :text="psychologyText" :size="leadSize" />
      <div class="home-view-cards">
        <InfoCard v-for="card in cards" :key="card.title" :title="card.title" :body="card.body" />
      </div>
    </div>
    <AppText :text="independenceText" :tone="mutedTone" :size="smallSize" />
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import InfoCard from "@/components/molecules/InfoCard.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import { APP_NAME, HOME_CARDS, REAL_CREDENTIAL_WARNING } from "@/config/content";
import { LEARN_ROUTE_NAME, MAIL_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { InformationCard, RouteName } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "home.eyebrow";
const PURPOSE_MESSAGE_KEY: string = "home.purpose";
const WARNING_TITLE_MESSAGE_KEY: string = "home.warningTitle";
const PSYCHOLOGY_MESSAGE_KEY: string = "home.psychology";
const START_LABEL_MESSAGE_KEY: string = "home.start";
const LEARN_LABEL_MESSAGE_KEY: string = "home.learn";
const INDEPENDENCE_MESSAGE_KEY: string = "home.independence";
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const appName: string = APP_NAME;
const purpose: string = translateMessage(PURPOSE_MESSAGE_KEY);
const warningTitle: string = translateMessage(WARNING_TITLE_MESSAGE_KEY);
const credentialWarning: string = REAL_CREDENTIAL_WARNING;
const psychologyText: string = translateMessage(PSYCHOLOGY_MESSAGE_KEY);
const cards: readonly InformationCard[] = HOME_CARDS;
const startLabel: string = translateMessage(START_LABEL_MESSAGE_KEY);
const learnLabel: string = translateMessage(LEARN_LABEL_MESSAGE_KEY);
const independenceText: string = translateMessage(INDEPENDENCE_MESSAGE_KEY);
const mailRoute: RouteName = MAIL_ROUTE_NAME;
const learnRoute: RouteName = LEARN_ROUTE_NAME;
const heroLevel: HeadingLevel = 1;
const heroSize: "hero" = "hero";
const leadSize: "lead" = "lead";
const smallSize: "small" = "small";
const accentTone: "accent" = "accent";
const mutedTone: "muted" = "muted";
const warningTone: "warning" = "warning";
const secondaryVariant: "secondary" = "secondary";
</script>

<style scoped>
.home-view {
  display: grid;
  gap: 72px;
}
.home-view-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}
.home-view-hero-copy,
.home-view-lesson {
  display: grid;
  gap: 18px;
}
.home-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.home-view-warning {
  width: calc(66.6667% - 5.3333px);
}
.home-view-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 820px) {
  .home-view {
    gap: 54px;
  }
  .home-view-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .home-view-cards {
    grid-template-columns: 1fr;
  }
  .home-view-warning {
    width: 100%;
  }
}
</style>
