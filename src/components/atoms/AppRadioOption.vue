<template>
  <label class="app-radio-option">
    <input
      class="app-radio-option-input"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="app-radio-option-label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

/** ラジオ選択肢の値と表示状態を指定するプロパティを表す。 */
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    label: string;
    modelValue: string;
    name: string;
    value: string;
  }>(),
  { disabled: false },
);

/** ラジオ選択肢が親へ通知する選択変更イベントを表す。 */
const emit = defineEmits<{
  (e: "update:modelValue", selectedValue: string): void;
}>();

/** 親から受け取った選択値とこの選択肢の値が一致するか判定する。 */
const isChecked = computed((): boolean => {
  const hasMatchingValue: boolean = props.modelValue === props.value;
  return hasMatchingValue;
});

/** ラジオ入力の変更を検証し、選択された値だけを親へ通知する。 */
function handleChange(event: Event): void {
  const eventTarget: EventTarget | null = event.target;

  // 外部イベントのtarget型を確認し、想定外の要素から値を読み取ることを防ぐ。
  if (!(eventTarget instanceof HTMLInputElement) || !eventTarget.checked) {
    return;
  }
  emit("update:modelValue", props.value);
}
</script>

<style scoped>
.app-radio-option {
  align-items: center;
  background: var(--color-surface-soft);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-medium);
  cursor: pointer;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  padding: var(--space-4);
}

.app-radio-option:has(.app-radio-option-input:checked) {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
}

.app-radio-option-input {
  height: 20px;
  width: 20px;
}

.app-radio-option-input:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--focus-ring-offset);
}

.app-radio-option-label {
  color: var(--color-ink-soft);
  font-size: var(--font-size-body);
  line-height: 1.75;
}
</style>
