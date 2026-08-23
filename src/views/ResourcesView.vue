<template>
  <div class="resources-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <NoticeBox :title="urgentTitle" :message="urgentMessage" :tone="warningTone" />
    <div class="resources-view-list">
      <a
        v-for="resource in resources"
        :key="resource.url"
        class="resources-view-card"
        :href="resource.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppHeading :level="cardHeadingLevel" :text="resource.name" :size="cardHeadingSize" />
        <AppText :text="resource.description" />
        <AppText :text="externalLinkLabel" :tone="accentTone" :size="smallSize" />
      </a>
    </div>
    <AppText :text="latestInfoMessage" :tone="mutedTone" :size="smallSize" />
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { EXTERNAL_RESOURCES } from "@/config/content";
import { translateMessage } from "@/i18n";
import type { ExternalResource } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "resources.eyebrow";
const TITLE_MESSAGE_KEY: string = "resources.title";
const DESCRIPTION_MESSAGE_KEY: string = "resources.description";
const URGENT_TITLE_MESSAGE_KEY: string = "resources.urgentTitle";
const URGENT_MESSAGE_KEY: string = "resources.urgentMessage";
const EXTERNAL_LINK_MESSAGE_KEY: string = "resources.externalLink";
const LATEST_INFORMATION_MESSAGE_KEY: string = "resources.latestInfo";
const resources: readonly ExternalResource[] = EXTERNAL_RESOURCES;
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const urgentTitle: string = translateMessage(URGENT_TITLE_MESSAGE_KEY);
const urgentMessage: string = translateMessage(URGENT_MESSAGE_KEY);
const externalLinkLabel: string = translateMessage(EXTERNAL_LINK_MESSAGE_KEY);
const latestInfoMessage: string = translateMessage(LATEST_INFORMATION_MESSAGE_KEY);
const cardHeadingLevel: HeadingLevel = 2;
const cardHeadingSize: "card" = "card";
const smallSize: "small" = "small";
const warningTone: "warning" = "warning";
const accentTone: "accent" = "accent";
const mutedTone: "muted" = "muted";
</script>

<style scoped>
.resources-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.resources-view-list {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, 1fr);
}
.resources-view-card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card);
  display: grid;
  gap: 10px;
  padding: 22px;
  text-decoration: none;
  transition:
    border-color var(--motion-fast),
    transform var(--motion-fast);
}
.resources-view-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}
.resources-view-card:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--focus-ring-offset);
}
@media (max-width: 700px) {
  .resources-view-list {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .resources-view-card {
    transition: none;
  }
  .resources-view-card:hover {
    transform: none;
  }
}
</style>
