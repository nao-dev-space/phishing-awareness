<template>
  <div class="home-view">
    <div class="home-view-hero">
      <div class="home-view-hero-copy">
        <AppText :text="t(MESSAGE_KEYS.eyebrow)" tone="accent" />
        <AppHeading :level="1" :text="content.appName" size="hero" />
        <AppText :text="t(MESSAGE_KEYS.purpose)" size="lead" />
        <div class="home-view-actions">
          <RouteAction :label="t(MESSAGE_KEYS.startLabel)" :route-name="MAIL_ROUTE_NAME" />
          <RouteAction
            :label="t(MESSAGE_KEYS.learnLabel)"
            :route-name="LEARN_ROUTE_NAME"
            variant="secondary"
          />
        </div>
        <NoticeBox
          class="home-view-warning"
          :title="t(MESSAGE_KEYS.warningTitle)"
          :message="content.realCredentialWarning"
          tone="warning"
          is-alert
        />
      </div>
    </div>
    <div class="home-view-lesson">
      <AppText :text="t(MESSAGE_KEYS.psychology)" size="lead" />
      <div class="home-view-cards">
        <InfoCard
          v-for="card in content.homeCards"
          :key="card.title"
          :title="card.title"
          :body="card.body"
        />
      </div>
    </div>
    <AppText :text="t(MESSAGE_KEYS.independence)" tone="muted" size="small" />
  </div>
</template>

<script setup lang="ts">
import { type ComputedRef } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import InfoCard from "@/components/molecules/InfoCard.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import { useContent } from "@/composables/useContent";
import type { AppContent } from "@/config/content";
import { LEARN_ROUTE_NAME, MAIL_ROUTE_NAME } from "@/config/routes";

interface HomeMessageKeys {
  readonly eyebrow: string;
  readonly independence: string;
  readonly learnLabel: string;
  readonly psychology: string;
  readonly purpose: string;
  readonly startLabel: string;
  readonly warningTitle: string;
}

const MESSAGE_KEYS: HomeMessageKeys = {
  eyebrow: "home.eyebrow",
  independence: "home.independence",
  learnLabel: "home.learn",
  psychology: "home.psychology",
  purpose: "home.purpose",
  startLabel: "home.start",
  warningTitle: "home.warningTitle",
};
const { t }: Composer = useI18n();
const content: ComputedRef<AppContent> = useContent();
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
  gap: var(--space-5);
}
.home-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.home-view-warning {
  max-width: 760px;
  width: 100%;
}
.home-view-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 820px) {
  .home-view {
    gap: var(--space-14);
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
