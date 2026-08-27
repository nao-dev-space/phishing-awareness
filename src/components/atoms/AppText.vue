<template>
  <component :is="tag" :class="getTextClasses()">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { TEXT_SIZES, TEXT_TAGS, TEXT_TONES } from "@/config/ui";
import type { TextSize, TextTag, TextTone } from "@/config/ui";

/** 共通テキストの内容と表示形式を指定するプロパティを表す。 */
const props = withDefaults(
  defineProps<{
    text: string;
    tag?: TextTag;
    tone?: TextTone;
    size?: TextSize;
  }>(),
  { tag: TEXT_TAGS.PARAGRAPH, tone: TEXT_TONES.DEFAULT, size: TEXT_SIZES.BODY },
);

/** テキストの色とサイズに対応するクラスを取得する。 */
function getTextClasses(): string[] {
  return ["app-text", `app-text-${props.tone}`, `app-text-${props.size}`];
}
</script>

<style scoped>
.app-text {
  color: var(--color-ink-soft);
  line-height: 1.75;
  margin: 0;
  white-space: pre-line;
}
.app-text-small {
  font-size: var(--font-size-small);
}
.app-text-body {
  font-size: var(--font-size-body);
}
.app-text-lead {
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.7;
}
.app-text-muted {
  color: var(--color-muted);
}
.app-text-accent {
  color: var(--color-primary-dark);
  font-weight: 700;
}
.app-text-warning {
  color: var(--color-warning-ink);
  font-weight: 700;
}
.app-text-success {
  color: var(--color-success-ink);
  font-weight: 700;
}
</style>
