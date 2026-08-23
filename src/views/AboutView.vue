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
import { ABOUT_ITEMS } from "@/config/content";
import { translateMessage } from "@/i18n";
import type { PolicyItem } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "about.eyebrow";
const TITLE_MESSAGE_KEY: string = "about.title";
const DESCRIPTION_MESSAGE_KEY: string = "about.description";
const NOTICE_TITLE_MESSAGE_KEY: string = "about.noticeTitle";
const NOTICE_MESSAGE_KEY: string = "about.noticeMessage";
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const items: readonly PolicyItem[] = ABOUT_ITEMS;
const noticeTitle: string = translateMessage(NOTICE_TITLE_MESSAGE_KEY);
const noticeMessage: string = translateMessage(NOTICE_MESSAGE_KEY);
</script>
