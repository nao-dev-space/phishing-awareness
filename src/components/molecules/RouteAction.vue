<template>
  <RouterLink :class="['route-action', `route-action-${variant}`]" :to="{ name: routeName }">
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteName } from "@/types/app";

interface Props {
  readonly label: string;
  readonly routeName: RouteName;
  readonly variant?: "primary" | "secondary" | "quiet";
}

withDefaults(defineProps<Props>(), { variant: "primary" });
</script>

<style scoped>
.route-action {
  align-items: center;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-pill);
  display: inline-flex;
  font-weight: 750;
  justify-content: center;
  min-height: var(--control-min-height);
  padding: 11px 22px;
  text-decoration: none;
  transition:
    transform var(--motion-fast),
    box-shadow var(--motion-fast);
}
.route-action:hover {
  box-shadow: var(--shadow-button);
  transform: translateY(-2px);
}
.route-action:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--focus-ring-offset);
}
.route-action-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
.route-action-secondary {
  background: var(--color-surface);
  border-color: var(--color-primary);
  color: var(--color-primary-dark);
}
.route-action-quiet {
  background: var(--color-surface-soft);
  color: var(--color-ink);
}
@media (prefers-reduced-motion: reduce) {
  .route-action {
    transition: none;
  }
  .route-action:hover {
    transform: none;
  }
}
</style>
