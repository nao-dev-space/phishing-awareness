<template>
  <div class="info-card">
    <AppHeading :level="HEADING_LEVELS.TWO" :text="title" :size="HEADING_SIZES.CARD" />
    <AppText :text="body" />
    <AppText v-if="action" :text="action" :tone="TEXT_TONES.ACCENT" :size="TEXT_SIZES.SMALL" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import { HEADING_LEVELS, HEADING_SIZES, TEXT_SIZES, TEXT_TONES } from "@/config/ui";

/** 情報カードの見出しと本文を指定するプロパティを表す。 */
defineProps<{
  title: string;
  body: string;
  action?: string;
}>();
</script>

<style scoped>
.info-card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card-subtle);
  display: grid;
  gap: var(--space-3);
  padding: 24px;
}
</style>
