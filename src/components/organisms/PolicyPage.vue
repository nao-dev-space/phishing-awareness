<template>
  <div class="policy-page">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div class="policy-page-content">
      <div v-for="item in items" :key="item.title" class="policy-page-item">
        <AppHeading :level="HEADING_LEVELS.TWO" :text="item.title" :size="HEADING_SIZES.CARD" />
        <AppText :text="item.body" />
      </div>
    </div>
    <NoticeBox :title="noticeTitle" :message="noticeMessage" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { HEADING_LEVELS, HEADING_SIZES } from "@/config/ui";
import type { PolicyItem } from "@/types/app";

/** 方針ページの導入文と項目一覧を指定するプロパティを表す。 */
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  items: readonly PolicyItem[];
  noticeTitle: string;
  noticeMessage: string;
}>();
</script>

<style scoped>
.policy-page {
  display: grid;
  gap: 32px;
  margin: 0 auto;
  max-width: var(--content-standard);
}
.policy-page-content {
  display: grid;
  gap: var(--space-6);
}
.policy-page-item {
  border-bottom: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 8px;
  padding-bottom: var(--space-6);
}
</style>
