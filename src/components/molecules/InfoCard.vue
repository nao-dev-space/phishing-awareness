<template>
  <div class="info-card">
    <AppHeading :level="2" :text="title" size="card" />
    <AppText :text="body" />
    <AppText v-if="action" :text="action" tone="accent" size="small" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

interface Props {
  readonly title: string;
  readonly body: string;
  readonly action?: string;
}
defineProps<Props>();
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
