<template>
  <PolicyPage
    :eyebrow="t(MESSAGE_KEYS.eyebrow)"
    :title="t(MESSAGE_KEYS.title)"
    :description="t(MESSAGE_KEYS.description)"
    :items="content.aboutItems"
    :notice-title="t(MESSAGE_KEYS.noticeTitle)"
    :notice-message="t(MESSAGE_KEYS.noticeMessage)"
  />
</template>
<script setup lang="ts">
import { type ComputedRef } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import PolicyPage from "@/components/organisms/PolicyPage.vue";
import { useContent } from "@/composables/useContent";
import type { AppContent } from "@/config/content";

interface AboutMessageKeys {
  readonly description: string;
  readonly eyebrow: string;
  readonly noticeMessage: string;
  readonly noticeTitle: string;
  readonly title: string;
}

const MESSAGE_KEYS: AboutMessageKeys = {
  description: "about.description",
  eyebrow: "about.eyebrow",
  noticeMessage: "about.noticeMessage",
  noticeTitle: "about.noticeTitle",
  title: "about.title",
};
const { t }: Composer = useI18n();
const content: ComputedRef<AppContent> = useContent();
</script>
