<template>
  <div class="learn-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div class="learn-view-topics">
      <details v-for="topic in topics" :key="topic.title" class="learn-view-topic">
        <summary class="learn-view-summary">{{ topic.title }}</summary>
        <div class="learn-view-topic-body">
          <AppText :text="topic.summary" />
          <AppText :text="`${actionPrefix}${topic.action}`" :tone="accentTone" />
        </div>
      </details>
    </div>
    <div class="learn-view-basics">
      <AppHeading :level="basicsHeadingLevel" :text="basicsTitle" />
      <ul class="learn-view-action-list">
        <li v-for="action in basicActions" :key="action" class="learn-view-action-item">
          <div class="learn-view-check" aria-hidden="true">{{ checkmark }}</div>
          <AppText :text="action" />
        </li>
      </ul>
    </div>
    <div class="learn-view-actions">
      <RouteAction :label="experienceLabel" :route-name="mailRoute" />
      <RouteAction :label="quizLabel" :route-name="quizRoute" :variant="secondaryVariant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { BASIC_ACTIONS, LEARNING_TOPICS } from "@/config/content";
import { MAIL_ROUTE_NAME, QUIZ_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { LearningTopic, RouteName } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "learn.eyebrow";
const TITLE_MESSAGE_KEY: string = "learn.title";
const DESCRIPTION_MESSAGE_KEY: string = "learn.description";
const ACTION_PREFIX_MESSAGE_KEY: string = "learn.actionPrefix";
const BASICS_TITLE_MESSAGE_KEY: string = "learn.basicsTitle";
const EXPERIENCE_LABEL_MESSAGE_KEY: string = "learn.experience";
const QUIZ_LABEL_MESSAGE_KEY: string = "learn.quiz";
const CHECKMARK_MESSAGE_KEY: string = "visuals.checkmark";
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const topics: readonly LearningTopic[] = LEARNING_TOPICS;
const basicActions: readonly string[] = BASIC_ACTIONS;
const actionPrefix: string = translateMessage(ACTION_PREFIX_MESSAGE_KEY);
const basicsTitle: string = translateMessage(BASICS_TITLE_MESSAGE_KEY);
const experienceLabel: string = translateMessage(EXPERIENCE_LABEL_MESSAGE_KEY);
const quizLabel: string = translateMessage(QUIZ_LABEL_MESSAGE_KEY);
const checkmark: string = translateMessage(CHECKMARK_MESSAGE_KEY);
const mailRoute: RouteName = MAIL_ROUTE_NAME;
const quizRoute: RouteName = QUIZ_ROUTE_NAME;
const basicsHeadingLevel: HeadingLevel = 2;
const accentTone: "accent" = "accent";
const secondaryVariant: "secondary" = "secondary";
</script>

<style scoped>
.learn-view {
  display: grid;
  gap: 36px;
  margin: 0 auto;
  max-width: var(--content-standard);
}
.learn-view-topics {
  display: grid;
  gap: 12px;
}
.learn-view-topic {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-medium);
  overflow: hidden;
}
.learn-view-summary {
  color: var(--color-ink);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 800;
  padding: 18px 22px;
}
.learn-view-summary:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: -3px;
}
.learn-view-topic-body {
  border-top: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 10px;
  padding: 18px 22px 22px;
}
.learn-view-basics {
  background: var(--color-primary-soft);
  border-radius: var(--radius-large);
  display: grid;
  gap: 20px;
  padding: 28px;
}
.learn-view-action-list {
  display: grid;
  gap: 11px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.learn-view-action-item {
  align-items: flex-start;
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
}
.learn-view-check {
  align-items: center;
  background: var(--color-surface);
  border-radius: 50%;
  color: var(--color-primary-dark);
  display: flex;
  font-weight: 900;
  height: 26px;
  justify-content: center;
  margin-top: 2px;
  width: 26px;
}
.learn-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
