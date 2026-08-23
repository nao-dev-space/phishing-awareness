<template>
  <component :is="tag" :class="['app-text', `app-text-${tone}`, `app-text-${size}`]">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
export type TextTag = "p" | "span";
export type TextTone = "default" | "muted" | "accent" | "warning" | "success";
export type TextSize = "small" | "body" | "lead";

interface Props {
  readonly text: string;
  readonly tag?: TextTag;
  readonly tone?: TextTone;
  readonly size?: TextSize;
}

withDefaults(defineProps<Props>(), {
  tag: "p",
  tone: "default",
  size: "body",
});
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
  font-size: 16px;
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
