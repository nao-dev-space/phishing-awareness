<template>
  <div class="learn-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <div class="learn-view-topics">
      <details v-for="topic in content.learningTopics" :key="topic.title" class="learn-view-topic">
        <summary class="learn-view-summary">{{ topic.title }}</summary>
        <div class="learn-view-topic-body">
          <AppText :text="topic.summary" />
          <div class="learn-view-action-detail">
            <div class="learn-view-action-label">{{ t(MESSAGE_KEYS.actionLabel) }}</div>
            <div class="learn-view-action-description">
              <AppText :text="topic.action" />
            </div>
          </div>
        </div>
      </details>
    </div>
    <div class="learn-view-basics">
      <AppHeading :level="HEADING_LEVELS.TWO" :text="t(MESSAGE_KEYS.basicsTitle)" />
      <ul class="learn-view-action-list">
        <li v-for="action in content.basicActions" :key="action" class="learn-view-action-item">
          <div class="learn-view-check" aria-hidden="true">{{ t(MESSAGE_KEYS.checkmark) }}</div>
          <AppText :text="action" />
        </li>
      </ul>
    </div>
    <div class="learn-view-actions">
      <RouteAction :label="t(MESSAGE_KEYS.experienceLabel)" :route-name="MAIL_ROUTE_NAME" />
      <RouteAction
        :label="t(MESSAGE_KEYS.quizLabel)"
        :route-name="QUIZ_ROUTE_NAME"
        :variant="ROUTE_ACTION_VARIANTS.SECONDARY"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { MAIL_ROUTE_NAME, QUIZ_ROUTE_NAME } from "@/config/routes";
import { HEADING_LEVELS, ROUTE_ACTION_VARIANTS } from "@/config/ui";

/** 学習画面に表示する各文言の翻訳キーを表す。 */
const MESSAGE_KEYS = {
  actionLabel: "learn.actionLabel",
  basicsTitle: "learn.basicsTitle",
  checkmark: "visuals.checkmark",
  description: "learn.description",
  eyebrow: "learn.eyebrow",
  experienceLabel: "learn.experience",
  quizLabel: "learn.quiz",
  title: "learn.title",
} as const;
const { t }: Composer = useI18n();
const content = useContent();
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
  font-size: var(--font-size-summary);
  font-weight: 800;
  padding: var(--space-5) var(--space-6);
}
.learn-view-summary:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: -3px;
}
.learn-view-topic-body {
  border-top: var(--border-width) solid var(--color-border);
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6) var(--space-6);
}
.learn-view-action-detail {
  display: grid;
  gap: var(--space-1);
  margin: 0;
}
.learn-view-action-label {
  color: var(--color-primary-dark);
  font-size: var(--font-size-small);
  font-weight: 700;
  line-height: 1.5;
}
.learn-view-action-description {
  margin: 0;
}
.learn-view-action-description :deep(.app-text) {
  color: var(--color-ink);
  font-weight: 400;
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
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}
.learn-view-action-item {
  align-items: flex-start;
  display: grid;
  gap: var(--space-3);
  grid-template-columns: auto 1fr;
}
.learn-view-check {
  align-items: center;
  background: var(--color-surface);
  border-radius: 50%;
  color: var(--color-primary-dark);
  display: flex;
  font-weight: 900;
  height: var(--space-7);
  justify-content: center;
  margin-top: 2px;
  width: var(--space-7);
}
.learn-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
