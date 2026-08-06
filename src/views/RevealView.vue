<template>
  <div class="reveal-view">
    <div class="reveal-view-badge" aria-hidden="true">✓</div>
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
import { messageGroup } from "@/i18n";
import type { RouteName } from "@/types/app";

interface PsychologyPoint {
  readonly title: string;
  readonly body: string;
}
const messages = messageGroup("reveal");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const safetyTitle: string = messages.safetyTitle;
const safetyMessage: string = messages.safetyMessage;
const explanationTitle: string = messages.explanationTitle;
const realRisk: string = messages.realRisk;
const psychologyPoints: readonly PsychologyPoint[] = messages.points;
const reviewLabel: string = messages.review;
const retryLabel: string = messages.retry;
const homeLabel: string = messages.home;
const reviewRoute: RouteName = "experience-review";
const mailRoute: RouteName = "experience-mail";
const homeRoute: RouteName = "home";
const sectionLevel: HeadingLevel = 2;
const leadSize: "lead" = "lead";
const successTone: "success" = "success";
const secondaryVariant: "secondary" = "secondary";
const quietVariant: "quiet" = "quiet";
</script>

<style scoped>
.reveal-view {
  display: grid;
  gap: 30px;
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
