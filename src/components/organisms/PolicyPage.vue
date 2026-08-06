<template>
  <div class="policy-page">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div class="policy-page-content">
      <div v-for="item in items" :key="item.title" class="policy-page-item">
        <AppHeading :level="itemHeadingLevel" :text="item.title" :size="cardHeadingSize" />
        <AppText :text="item.body" />
      </div>
    </div>
    <NoticeBox :title="noticeTitle" :message="noticeMessage" />
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";

export interface PolicyItem {
  readonly title: string;
  readonly body: string;
}
interface Props {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly PolicyItem[];
  readonly noticeTitle: string;
  readonly noticeMessage: string;
}
defineProps<Props>();
const itemHeadingLevel: HeadingLevel = 2;
const cardHeadingSize: "card" = "card";
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
  gap: 22px;
}
.policy-page-item {
  border-bottom: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 8px;
  padding-bottom: 22px;
}
</style>
