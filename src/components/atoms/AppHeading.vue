<template>
  <component :is="tag" :class="getHeadingClasses()">{{ props.text }}</component>
</template>

<script setup lang="ts">
import { computed } from "vue";
export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = "hero" | "page" | "section" | "card";

/** 共通見出しの階層と表示内容を指定するプロパティを表す。 */
const props = withDefaults(
  defineProps<{
    level: HeadingLevel;
    text: string;
    size?: HeadingSize;
  }>(),
  { size: "section" },
);
const tag = computed((): string => `h${props.level}`);

/** 見出しのサイズに対応するクラスを取得する。 */
function getHeadingClasses(): string[] {
  return ["app-heading", `app-heading-${props.size}`];
}
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
