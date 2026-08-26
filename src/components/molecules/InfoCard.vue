<template>
  <div class="info-card">
    <AppHeading :level="2" :text="props.title" size="card" />
    <AppText :text="props.body" />
    <AppText v-if="props.action" :text="props.action" tone="accent" size="small" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

/** 情報カードの見出しと本文を指定するプロパティを表す。 */
const props = defineProps<{
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
