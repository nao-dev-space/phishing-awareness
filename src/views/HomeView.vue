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
import { APP_NAME, REAL_CREDENTIAL_WARNING } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { RouteName } from "@/types/app";

interface HomeCard {
  readonly title: string;
  readonly body: string;
}
const messages = messageGroup("home");
const eyebrow: string = messages.eyebrow;
const appName: string = APP_NAME;
const purpose: string = messages.purpose;
const warningTitle: string = messages.warningTitle;
const credentialWarning: string = REAL_CREDENTIAL_WARNING;
const psychologyText: string = messages.psychology;
const cards: readonly HomeCard[] = messages.cards;
const startLabel: string = messages.start;
const learnLabel: string = messages.learn;
const independenceText: string = messages.independence;
const mailRoute: RouteName = "experience-mail";
const learnRoute: RouteName = "learn";
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
