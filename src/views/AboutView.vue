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
import { useI18n, type Composer } from "vue-i18n";
import PolicyPage from "@/components/organisms/PolicyPage.vue";
import { useContent } from "@/composables/useContent";

/** アプリ紹介画面に表示する各文言の翻訳キーを表す。 */
const MESSAGE_KEYS = {
  description: "about.description",
  eyebrow: "about.eyebrow",
  noticeMessage: "about.noticeMessage",
  noticeTitle: "about.noticeTitle",
  title: "about.title",
} as const;
const { t }: Composer = useI18n();
const content = useContent();
</script>
