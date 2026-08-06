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
import { messageGroup } from "@/i18n";
import type { ExternalResource } from "@/types/app";

const resources: readonly ExternalResource[] = EXTERNAL_RESOURCES;
const messages = messageGroup("resources");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const urgentTitle: string = messages.urgentTitle;
const urgentMessage: string = messages.urgentMessage;
const externalLinkLabel: string = messages.externalLink;
const latestInfoMessage: string = messages.latestInfo;
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
  gap: 30px;
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
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
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
