<template>
  <PolicyPage
    :eyebrow="t(MESSAGE_KEYS.eyebrow)"
    :title="t(MESSAGE_KEYS.title)"
    :description="t(MESSAGE_KEYS.description)"
    :items="content.disclaimerItems"
    :notice-title="t(MESSAGE_KEYS.noticeTitle)"
    :notice-message="t(MESSAGE_KEYS.noticeMessage)"
  />
</template>
<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import PolicyPage from "@/components/organisms/PolicyPage.vue";
import { useContent } from "@/composables/useContent";

/** 免責事項画面に表示する各文言の翻訳キーを表す。 */
const MESSAGE_KEYS = {
  description: "disclaimer.description",
  eyebrow: "disclaimer.eyebrow",
  noticeMessage: "disclaimer.noticeMessage",
  noticeTitle: "disclaimer.noticeTitle",
  title: "disclaimer.title",
} as const;
const { t }: Composer = useI18n();
const content = useContent();
</script>
