<template>
  <div class="app-layout">
    <a class="app-layout-skip-link" :href="mainTarget">{{ t(SKIP_LINK_MESSAGE_KEY) }}</a>
    <AppHeader />
    <main :id="mainId" class="app-layout-main" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "@/components/organisms/AppFooter.vue";
import AppHeader from "@/components/organisms/AppHeader.vue";
import { useI18n, type Composer } from "vue-i18n";

const SKIP_LINK_MESSAGE_KEY: string = "layout.skip";
const mainId: string = "main-content";
const mainTarget: string = `#${mainId}`;
const { t }: Composer = useI18n();
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}
.app-layout-main {
  margin: 0 auto;
  max-width: var(--content-wide);
  padding: 48px 24px 0;
}
.app-layout-skip-link {
  background: var(--color-ink);
  color: var(--color-on-dark);
  left: 12px;
  padding: var(--space-3) var(--space-4);
  position: fixed;
  top: -80px;
  z-index: 100;
}
.app-layout-skip-link:focus {
  top: 12px;
}
@media (max-width: 700px) {
  .app-layout-main {
    padding: var(--space-8) var(--space-4) 0;
  }
}
</style>
