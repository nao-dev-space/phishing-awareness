<template>
  <RouterLink :class="getRouteActionClasses()" :to="{ name: routeName }">
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
import { ROUTE_ACTION_VARIANTS } from "@/config/ui";
import type { RouteActionVariant } from "@/config/ui";
import type { RouteName } from "@/types/app";

/** アプリ内の画面遷移リンクを指定するプロパティを表す。 */
const props = withDefaults(
  defineProps<{
    label: string;
    routeName: RouteName;
    variant?: RouteActionVariant;
  }>(),
  { variant: ROUTE_ACTION_VARIANTS.PRIMARY },
);

/** 画面遷移リンクの表示種別に対応するクラスを取得する。 */
function getRouteActionClasses(): string[] {
  return ["app-action", "route-action", `route-action-${props.variant}`];
}
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
