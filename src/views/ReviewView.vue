<template>
  <div class="review-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div class="review-view-points">
      <div v-for="point in suspiciousPoints" :key="point.id" class="review-view-point">
        <div class="review-view-number" aria-hidden="true">{{ point.id }}</div>
        <div class="review-view-point-copy">
          <AppHeading :level="pointHeadingLevel" :text="point.location" :size="cardHeadingSize" />
          <AppText :text="`${riskPrefix}${point.risk}`" />
          <AppText :text="`${actionPrefix}${point.safeAction}`" :tone="accentTone" />
        </div>
      </div>
    </div>
    <NoticeBox :title="habitTitle" :message="habitMessage" :tone="successTone" />
    <div class="review-view-actions">
      <RouteAction :label="learnLabel" :route-name="learnRoute" />
      <RouteAction :label="quizLabel" :route-name="quizRoute" :variant="secondaryVariant" />
      <RouteAction :label="retryLabel" :route-name="mailRoute" :variant="quietVariant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { SUSPICIOUS_POINTS } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { RouteName, SuspiciousPoint } from "@/types/app";

const messages = messageGroup("review");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const suspiciousPoints: readonly SuspiciousPoint[] = SUSPICIOUS_POINTS;
const riskPrefix: string = messages.riskPrefix;
const actionPrefix: string = messages.actionPrefix;
const habitTitle: string = messages.habitTitle;
const habitMessage: string = messages.habitMessage;
const learnLabel: string = messages.learn;
const quizLabel: string = messages.quiz;
const retryLabel: string = messages.retry;
const learnRoute: RouteName = "learn";
const quizRoute: RouteName = "quiz";
const mailRoute: RouteName = "experience-mail";
const pointHeadingLevel: HeadingLevel = 2;
const cardHeadingSize: "card" = "card";
const accentTone: "accent" = "accent";
const successTone: "success" = "success";
const secondaryVariant: "secondary" = "secondary";
const quietVariant: "quiet" = "quiet";
</script>

<style scoped>
.review-view {
  display: grid;
  gap: 30px;
  margin: 0 auto;
  max-width: var(--content-standard);
}
.review-view-points {
  display: grid;
  gap: 14px;
}
.review-view-point {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  display: grid;
  gap: 18px;
  grid-template-columns: auto 1fr;
  padding: 22px;
}
.review-view-number {
  align-items: center;
  background: var(--color-primary);
  border-radius: 50%;
  color: var(--color-on-primary);
  display: flex;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 900;
  height: 42px;
  justify-content: center;
  width: 42px;
}
.review-view-point-copy {
  display: grid;
  gap: 8px;
}
.review-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
