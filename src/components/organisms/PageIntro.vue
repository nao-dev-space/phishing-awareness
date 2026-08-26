<template>
  <div class="page-intro">
    <AppText v-if="props.eyebrow" :text="props.eyebrow" tone="accent" />
    <AppHeading :level="1" :text="props.title" size="page" />
    <AppText :text="props.description" size="lead" />
  </div>
</template>

<script setup lang="ts">
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";

/** ページ冒頭の見出しと説明を指定するプロパティを表す。 */
const props = defineProps<{
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
