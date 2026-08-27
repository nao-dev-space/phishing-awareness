<template>
  <button :class="getButtonClasses()" :type="type" :disabled="disabled" @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { BUTTON_TYPES, BUTTON_VARIANTS } from "@/config/ui";
import type { ButtonType, ButtonVariant } from "@/config/ui";

/** 共通ボタンの表示内容と操作状態を指定するプロパティを表す。 */
const props = withDefaults(
  defineProps<{
    label: string;
    type?: ButtonType;
    variant?: ButtonVariant;
    disabled?: boolean;
  }>(),
  { type: BUTTON_TYPES.BUTTON, variant: BUTTON_VARIANTS.PRIMARY, disabled: false },
);

/** 共通ボタンが親へ通知するイベントを表す。 */
const emit = defineEmits<{
  (e: "click", mouseEvent: MouseEvent): void;
}>();

/** ボタンの表示種別に対応するクラスを取得する。 */
function getButtonClasses(): string[] {
  return ["app-action", "app-button", `app-button-${props.variant}`];
}

/** ボタンのクリックを、元のイベントとともに親へ通知する。 */
function handleClick(mouseEvent: MouseEvent): void {
  emit("click", mouseEvent);
}
</script>

<style scoped>
.app-button {
  cursor: pointer;
  font: inherit;
  transition-property: transform, box-shadow, background;
  white-space: pre-line;
}

.app-button:disabled {
  background: var(--color-disabled-background);
  border-color: var(--color-disabled-border);
  color: var(--color-disabled-ink);
  cursor: not-allowed;
}
.app-button-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
.app-button-secondary {
  background: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary-dark);
}
.app-button-quiet {
  background: var(--color-surface-soft);
  color: var(--color-ink);
}
.app-button-danger {
  background: var(--color-warning-soft);
  border-color: var(--color-warning);
  color: var(--color-warning-ink);
}
</style>
