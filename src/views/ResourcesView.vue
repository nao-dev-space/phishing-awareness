<template>
  <div class="resources-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <NoticeBox
      :title="t(MESSAGE_KEYS.urgentTitle)"
      :message="t(MESSAGE_KEYS.urgentMessage)"
      :tone="NOTICE_TONES.WARNING"
    />
    <div class="resources-view-list">
      <a
        v-for="resource in content.externalResources"
        :key="resource.url"
        class="resources-view-card"
        :href="resource.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppHeading :level="HEADING_LEVELS.TWO" :text="resource.name" :size="HEADING_SIZES.CARD" />
        <AppText :text="resource.description" />
        <AppText
          :text="t(MESSAGE_KEYS.externalLink)"
          :tone="TEXT_TONES.ACCENT"
          :size="TEXT_SIZES.SMALL"
        />
      </a>
    </div>
    <AppText
      :text="t(MESSAGE_KEYS.latestInformation)"
      :tone="TEXT_TONES.MUTED"
      :size="TEXT_SIZES.SMALL"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { HEADING_LEVELS, HEADING_SIZES, NOTICE_TONES, TEXT_SIZES, TEXT_TONES } from "@/config/ui";

/** 外部情報源画面に表示する各文言の翻訳キーを表す。 */
interface ResourcesMessageKeys {
  readonly description: string;
  readonly externalLink: string;
  readonly eyebrow: string;
  readonly latestInformation: string;
  readonly title: string;
  readonly urgentMessage: string;
  readonly urgentTitle: string;
}

const MESSAGE_KEYS: ResourcesMessageKeys = {
  description: "resources.description",
  externalLink: "resources.externalLink",
  eyebrow: "resources.eyebrow",
  latestInformation: "resources.latestInfo",
  title: "resources.title",
  urgentMessage: "resources.urgentMessage",
  urgentTitle: "resources.urgentTitle",
};
const { t }: Composer = useI18n();
const content = useContent();
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
  gap: var(--space-4);
  grid-template-columns: repeat(2, 1fr);
}
.resources-view-card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card-subtle);
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
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
