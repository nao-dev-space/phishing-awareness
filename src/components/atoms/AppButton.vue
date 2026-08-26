<template>
  <button
    :class="['app-action', 'app-button', `app-button-${variant}`]"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";

/** 共通ボタンの表示内容と操作状態を指定するプロパティを表す。 */
interface Props {
  readonly label: string;
  readonly type?: "button" | "submit";
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
}

/** 共通ボタンが親へ通知するイベントを表す。 */
interface Emits {
  (event: "click", mouseEvent: MouseEvent): void;
}

withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  disabled: false,
});

const emit: Emits = defineEmits<Emits>();

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
