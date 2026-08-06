<template>
  <div class="form-field">
    <label class="form-field-label" :for="id">{{ label }}</label>
    <input
      :id="id"
      class="form-field-input"
      :name="name"
      :type="type"
      :value="modelValue"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :aria-describedby="describedBy"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly modelValue: string;
  readonly type?: "text" | "password";
  readonly autocomplete?: string;
  readonly inputmode?: "email" | "text";
  readonly describedBy?: string;
}

interface Emits {
  (event: "update:modelValue", value: string): void;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  autocomplete: "off",
  inputmode: "text",
});

const emit: Emits = defineEmits<Emits>();

/**
 * 入力欄の現在値を親へ通知する。
 * @param event ブラウザーが発行した入力イベント。
 * @returns 戻り値はなく、文字列だけをemitする。
 */
function handleInput(event: Event): void {
  const inputElement: HTMLInputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
}
</script>

<style scoped>
.form-field {
  display: grid;
  gap: 8px;
}
.form-field-label {
  color: var(--color-ink);
  font-size: 15px;
  font-weight: 750;
}
.form-field-input {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-small);
  color: var(--color-ink);
  font: inherit;
  min-height: 48px;
  padding: 10px 13px;
  width: 100%;
}
.form-field-input:focus {
  border-color: var(--color-primary);
  outline: 3px solid var(--color-focus-soft);
}
</style>
