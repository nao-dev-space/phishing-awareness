<template>
  <div class="app-layout">
    <a class="app-layout-skip-link" :href="mainTarget">{{ skipLabel }}</a>
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
import { translateMessage } from "@/i18n";

const SKIP_LINK_MESSAGE_KEY: string = "layout.skip";
const mainId: string = "main-content";
const mainTarget: string = `#${mainId}`;
const skipLabel: string = translateMessage(SKIP_LINK_MESSAGE_KEY);
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
  padding: 10px 14px;
  position: fixed;
  top: -80px;
  z-index: 100;
}
.app-layout-skip-link:focus {
  top: 12px;
}
@media (max-width: 700px) {
  .app-layout-main {
    padding: 32px 18px 0;
  }
}
</style>
