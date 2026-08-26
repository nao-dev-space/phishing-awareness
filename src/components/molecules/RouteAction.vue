<template>
  <RouterLink
    :class="['app-action', 'route-action', `route-action-${variant}`]"
    :to="{ name: routeName }"
  >
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteName } from "@/types/app";

/** アプリ内の画面遷移リンクを指定するプロパティを表す。 */
interface Props {
  readonly label: string;
  readonly routeName: RouteName;
  readonly variant?: "primary" | "secondary" | "quiet";
}

withDefaults(defineProps<Props>(), { variant: "primary" });
</script>

<style scoped>
.route-action {
  text-decoration: none;
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
</style>
