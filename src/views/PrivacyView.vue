<template>
  <PolicyPage
    :eyebrow="eyebrow"
    :title="title"
    :description="description"
    :items="items"
    :notice-title="noticeTitle"
    :notice-message="noticeMessage"
  />
</template>
<script setup lang="ts">
import PolicyPage from "@/components/organisms/PolicyPage.vue";
import { PRIVACY_ITEMS } from "@/config/content";
import { translateMessage } from "@/i18n";
import type { PolicyItem } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "privacy.eyebrow";
const TITLE_MESSAGE_KEY: string = "privacy.title";
const DESCRIPTION_MESSAGE_KEY: string = "privacy.description";
const NOTICE_TITLE_MESSAGE_KEY: string = "privacy.noticeTitle";
const NOTICE_MESSAGE_KEY: string = "privacy.noticeMessage";
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const items: readonly PolicyItem[] = PRIVACY_ITEMS;
const noticeTitle: string = translateMessage(NOTICE_TITLE_MESSAGE_KEY);
const noticeMessage: string = translateMessage(NOTICE_MESSAGE_KEY);
</script>
