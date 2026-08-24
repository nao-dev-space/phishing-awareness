<template>
  <component :is="tag" :class="['app-heading', `app-heading-${size}`]">{{ text }}</component>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = "hero" | "page" | "section" | "card";

interface Props {
  readonly level: HeadingLevel;
  readonly text: string;
  readonly size?: HeadingSize;
}

const props: Props = withDefaults(defineProps<Props>(), { size: "section" });
const tag: ComputedRef<string> = computed((): string => `h${props.level}`);
</script>

<style scoped>
.app-heading {
  color: var(--color-ink);
  font-family: var(--font-display);
  line-height: 1.25;
  margin: 0;
  overflow-wrap: anywhere;
  word-break: auto-phrase;
  text-wrap: balance;
  white-space: pre-line;
}

.app-heading-hero {
  font-size: clamp(36px, 7vw, 72px);
  letter-spacing: -2px;
}
.app-heading-page {
  font-size: clamp(30px, 5vw, 48px);
  letter-spacing: -1px;
}
.app-heading-section {
  font-size: clamp(24px, 4vw, 34px);
}
.app-heading-card {
  font-size: var(--font-size-card-title);
}
</style>
