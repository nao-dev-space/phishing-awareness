<template>
  <div class="page-intro">
    <AppText v-if="eyebrow" :text="eyebrow" tone="accent" />
    <AppHeading :level="1" :text="title" size="page" />
    <AppText :text="description" size="lead" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

interface Props {
  readonly title: string;
  readonly description: string;
  readonly eyebrow?: string;
}

defineProps<Props>();
</script>

<style scoped>
.page-intro {
  display: grid;
  gap: var(--space-4);
  max-width: var(--content-intro);
}
</style>
