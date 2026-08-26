<template>
  <PolicyPage
    :eyebrow="t(MESSAGE_KEYS.eyebrow)"
    :title="t(MESSAGE_KEYS.title)"
    :description="t(MESSAGE_KEYS.description)"
    :items="content.privacyItems"
    :notice-title="t(MESSAGE_KEYS.noticeTitle)"
    :notice-message="t(MESSAGE_KEYS.noticeMessage)"
  />
</template>
<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import PolicyPage from "@/components/organisms/PolicyPage.vue";
import { useContent } from "@/composables/useContent";

/** プライバシー方針画面に表示する各文言の翻訳キーを表す。 */
interface PrivacyMessageKeys {
  readonly description: string;
  readonly eyebrow: string;
  readonly noticeMessage: string;
  readonly noticeTitle: string;
  readonly title: string;
}

const MESSAGE_KEYS: PrivacyMessageKeys = {
  description: "privacy.description",
  eyebrow: "privacy.eyebrow",
  noticeMessage: "privacy.noticeMessage",
  noticeTitle: "privacy.noticeTitle",
  title: "privacy.title",
};
const { t }: Composer = useI18n();
const content = useContent();
</script>
