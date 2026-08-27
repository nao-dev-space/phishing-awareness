<template>
  <div class="cloud-logo" :aria-label="accessibleLabel" role="img">
    <span class="cloud-logo-mark" aria-hidden="true">{{ mark }}</span>
    <span class="cloud-logo-name">{{ serviceName }}</span>
  </div>
</template>

<script setup lang="ts">
/** 架空サービスのロゴに表示する名称と読み上げ名を表す。 */
defineProps<{
  serviceName: string;
  accessibleLabel: string;
  mark: string;
}>();
</script>

<style scoped>
.cloud-logo {
  align-items: center;
  color: var(--color-cloud);
  display: inline-flex;
  font-weight: 800;
  gap: var(--space-3);
  letter-spacing: 0.2px;
}
.cloud-logo-mark {
  align-items: center;
  background: var(--color-cloud-soft);
  border: var(--border-width) solid var(--color-cloud);
  border-radius: 12px 12px 12px 4px;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  width: 44px;
}
.cloud-logo-name {
  font-family: var(--font-display);
  font-size: var(--font-size-logo);
}
</style>
