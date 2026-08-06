<template>
  <div class="info-card">
    <AppHeading :level="headingLevel" :text="title" :size="headingSize" />
    <AppText :text="body" />
    <AppText v-if="action" :text="action" :tone="accentTone" :size="smallSize" />
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

interface Props {
  readonly title: string;
  readonly body: string;
  readonly action?: string;
}
defineProps<Props>();
const headingLevel: HeadingLevel = 2;
const headingSize: "card" = "card";
const accentTone: "accent" = "accent";
const smallSize: "small" = "small";
</script>

<style scoped>
.info-card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card);
  display: grid;
  gap: 10px;
  padding: 24px;
}
</style>
