<template>
  <div class="page-intro">
    <AppText v-if="eyebrow" :text="eyebrow" :tone="accentTone" />
    <AppHeading :level="headingLevel" :text="title" :size="headingSize" />
    <AppText :text="description" :size="leadSize" />
  </div>
</template>

<script setup lang="ts">
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

interface Props {
  readonly title: string;
  readonly description: string;
  readonly eyebrow?: string;
}

defineProps<Props>();
const headingLevel: HeadingLevel = 1;
const headingSize: "page" = "page";
const leadSize: "lead" = "lead";
const accentTone: "accent" = "accent";
</script>

<style scoped>
.page-intro {
  display: grid;
  gap: 14px;
  max-width: 790px;
}
</style>
