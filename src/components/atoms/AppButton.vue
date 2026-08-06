<template>
  <button
    :class="['app-button', `app-button-${variant}`]"
    :type="type"
    :disabled="disabled"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";

interface Props {
  readonly label: string;
  readonly type?: "button" | "submit";
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
}

interface Emits {
  (event: "click"): void;
}

withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  disabled: false,
});

const emit: Emits = defineEmits<Emits>();
</script>

<style scoped>
.app-button {
  align-items: center;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 750;
  justify-content: center;
  min-height: 48px;
  padding: 11px 22px;
  transition:
    transform var(--motion-fast),
    box-shadow var(--motion-fast),
    background var(--motion-fast);
  white-space: pre-line;
}

.app-button:hover:not(:disabled) {
  box-shadow: var(--shadow-button);
  transform: translateY(-2px);
}
.app-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
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

@media (prefers-reduced-motion: reduce) {
  .app-button {
    transition: none;
  }
  .app-button:hover:not(:disabled) {
    transform: none;
  }
}
</style>
