<template>
  <div class="reveal-view">
    <div class="reveal-view-badge" aria-hidden="true">{{ checkmark }}</div>
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <NoticeBox :title="safetyTitle" :message="safetyMessage" :tone="successTone" />
    <div class="reveal-view-explanation">
      <AppHeading :level="sectionLevel" :text="explanationTitle" />
      <AppText :text="realRisk" :size="leadSize" />
      <div class="reveal-view-cards">
        <InfoCard
          v-for="point in psychologyPoints"
          :key="point.title"
          :title="point.title"
          :body="point.body"
        />
      </div>
    </div>
    <div class="reveal-view-actions">
      <RouteAction :label="reviewLabel" :route-name="reviewRoute" />
      <RouteAction :label="retryLabel" :route-name="mailRoute" :variant="secondaryVariant" />
      <RouteAction :label="homeLabel" :route-name="homeRoute" :variant="quietVariant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import InfoCard from "@/components/molecules/InfoCard.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { REVEAL_POINTS } from "@/config/content";
import { HOME_ROUTE_NAME, MAIL_ROUTE_NAME, REVIEW_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { PsychologyPoint, RouteName } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "reveal.eyebrow";
const TITLE_MESSAGE_KEY: string = "reveal.title";
const DESCRIPTION_MESSAGE_KEY: string = "reveal.description";
const SAFETY_TITLE_MESSAGE_KEY: string = "reveal.safetyTitle";
const SAFETY_MESSAGE_KEY: string = "reveal.safetyMessage";
const EXPLANATION_TITLE_MESSAGE_KEY: string = "reveal.explanationTitle";
const REAL_RISK_MESSAGE_KEY: string = "reveal.realRisk";
const REVIEW_LABEL_MESSAGE_KEY: string = "reveal.review";
const RETRY_LABEL_MESSAGE_KEY: string = "reveal.retry";
const HOME_LABEL_MESSAGE_KEY: string = "reveal.home";
const CHECKMARK_MESSAGE_KEY: string = "visuals.checkmark";
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const safetyTitle: string = translateMessage(SAFETY_TITLE_MESSAGE_KEY);
const safetyMessage: string = translateMessage(SAFETY_MESSAGE_KEY);
const explanationTitle: string = translateMessage(EXPLANATION_TITLE_MESSAGE_KEY);
const realRisk: string = translateMessage(REAL_RISK_MESSAGE_KEY);
const psychologyPoints: readonly PsychologyPoint[] = REVEAL_POINTS;
const reviewLabel: string = translateMessage(REVIEW_LABEL_MESSAGE_KEY);
const retryLabel: string = translateMessage(RETRY_LABEL_MESSAGE_KEY);
const homeLabel: string = translateMessage(HOME_LABEL_MESSAGE_KEY);
const checkmark: string = translateMessage(CHECKMARK_MESSAGE_KEY);
const reviewRoute: RouteName = REVIEW_ROUTE_NAME;
const mailRoute: RouteName = MAIL_ROUTE_NAME;
const homeRoute: RouteName = HOME_ROUTE_NAME;
const sectionLevel: HeadingLevel = 2;
const leadSize: "lead" = "lead";
const successTone: "success" = "success";
const secondaryVariant: "secondary" = "secondary";
const quietVariant: "quiet" = "quiet";
</script>

<style scoped>
.reveal-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.reveal-view-badge {
  align-items: center;
  background: var(--color-success-soft);
  border: var(--border-width) solid var(--color-success);
  border-radius: 50%;
  color: var(--color-success-ink);
  display: flex;
  font-size: 36px;
  font-weight: 900;
  height: 72px;
  justify-content: center;
  width: 72px;
}
.reveal-view-explanation {
  display: grid;
  gap: 18px;
}
.reveal-view-cards {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, 1fr);
}
.reveal-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (max-width: 700px) {
  .reveal-view-cards {
    grid-template-columns: 1fr;
  }
}
</style>
