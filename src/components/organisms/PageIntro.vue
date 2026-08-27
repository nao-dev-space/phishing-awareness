<template>
  <div class="page-intro">
    <AppText v-if="eyebrow" :text="eyebrow" :tone="TEXT_TONES.ACCENT" />
    <AppHeading :level="HEADING_LEVELS.ONE" :text="title" :size="HEADING_SIZES.PAGE" />
    <AppText :text="description" :size="TEXT_SIZES.LEAD" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import { HEADING_LEVELS, HEADING_SIZES, TEXT_SIZES, TEXT_TONES } from "@/config/ui";

/** ページ冒頭の見出しと説明を指定するプロパティを表す。 */
defineProps<{
  title: string;
  description: string;
  eyebrow?: string;
}>();
</script>

<style scoped>
.page-intro {
  display: grid;
  gap: var(--space-4);
  max-width: var(--content-intro);
}
</style>
