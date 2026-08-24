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

/** 入力欄の現在値を親へ通知する。 */
function handleInput(event: Event): void {
  const eventTarget: EventTarget | null = event.target;

  // 外部イベントのtarget型を確認し、想定外の要素から値を読み取ることを防ぐ。
  if (!(eventTarget instanceof HTMLInputElement)) {
    return;
  }
  emit("update:modelValue", eventTarget.value);
}
</script>

<style scoped>
.form-field {
  display: grid;
  gap: 8px;
}
.form-field-label {
  color: var(--color-ink);
  font-size: var(--font-size-label);
  font-weight: 750;
}
.form-field-input {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-small);
  color: var(--color-ink);
  font: inherit;
  min-height: var(--control-min-height);
  padding: var(--space-3);
  width: 100%;
}
.form-field-input:focus {
  border-color: var(--color-primary);
  outline: var(--focus-ring-width) solid var(--color-focus-soft);
}
</style>
