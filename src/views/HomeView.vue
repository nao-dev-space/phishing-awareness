<template>
  <div class="home-view">
    <div class="home-view-hero">
      <div class="home-view-hero-copy">
        <AppText :text="t(MESSAGE_KEYS.eyebrow)" :tone="TEXT_TONES.ACCENT" />
        <AppHeading
          :level="HEADING_LEVELS.ONE"
          :text="content.appName"
          :size="HEADING_SIZES.HERO"
        />
        <AppText :text="t(MESSAGE_KEYS.purpose)" :size="TEXT_SIZES.LEAD" />
        <div class="home-view-actions">
          <RouteAction :label="t(MESSAGE_KEYS.startLabel)" :route-name="MAIL_ROUTE_NAME" />
          <RouteAction
            :label="t(MESSAGE_KEYS.learnLabel)"
            :route-name="LEARN_ROUTE_NAME"
            :variant="ROUTE_ACTION_VARIANTS.SECONDARY"
          />
        </div>
        <NoticeBox
          class="home-view-warning"
          :title="t(MESSAGE_KEYS.warningTitle)"
          :message="content.realCredentialWarning"
          :tone="NOTICE_TONES.WARNING"
          :is-alert="NOTICE_ANNOUNCEMENT_MODES.IMMEDIATE"
        />
      </div>
    </div>
    <div class="home-view-lesson">
      <AppText :text="t(MESSAGE_KEYS.psychology)" :size="TEXT_SIZES.LEAD" />
      <div class="home-view-cards">
        <InfoCard
          v-for="card in content.homeCards"
          :key="card.title"
          :title="card.title"
          :body="card.body"
        />
      </div>
    </div>
    <AppText
      :text="t(MESSAGE_KEYS.independence)"
      :tone="TEXT_TONES.MUTED"
      :size="TEXT_SIZES.SMALL"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import InfoCard from "@/components/molecules/InfoCard.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import { useContent } from "@/composables/useContent";
import { LEARN_ROUTE_NAME, MAIL_ROUTE_NAME } from "@/config/routes";
import {
  HEADING_LEVELS,
  HEADING_SIZES,
  NOTICE_ANNOUNCEMENT_MODES,
  NOTICE_TONES,
  ROUTE_ACTION_VARIANTS,
  TEXT_SIZES,
  TEXT_TONES,
} from "@/config/ui";

/** ホーム画面に表示する各文言の翻訳キーを表す。 */
const MESSAGE_KEYS = {
  eyebrow: "home.eyebrow",
  independence: "home.independence",
  learnLabel: "home.learn",
  psychology: "home.psychology",
  purpose: "home.purpose",
  startLabel: "home.start",
  warningTitle: "home.warningTitle",
} as const;
const { t }: Composer = useI18n();
const content = useContent();
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
