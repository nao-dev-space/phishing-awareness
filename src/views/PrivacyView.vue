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
import PolicyPage, { type PolicyItem } from "@/components/organisms/PolicyPage.vue";
import { messageGroup } from "@/i18n";
const messages = messageGroup("privacy");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const items: readonly PolicyItem[] = messages.items;
const noticeTitle: string = messages.noticeTitle;
const noticeMessage: string = messages.noticeMessage;
</script>
