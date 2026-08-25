<template>
  <AppLayout><RouterView /></AppLayout>
</template>
<script setup lang="ts">
import AppLayout from "@/components/templates/AppLayout.vue";
</script>
<style>
:root {
  --color-page: #f6faf8;
  --color-surface: #ffffff;
  --color-surface-soft: #edf3f1;
  --color-ink: #102b2a;
  --color-ink-soft: #294847;
  --color-muted: #5f7472;
  --color-muted-light: #aab9b7;
  --color-on-dark: #f4fffc;
  --color-primary: #087f72;
  --color-primary-dark: #056258;
  --color-primary-soft: #d9f3ed;
  --color-on-primary: #ffffff;
  --color-border: #ccdcda;
  --color-border-strong: #809b98;
  --color-focus: #f4a72c;
  --color-focus-soft: #ffe5b9;
  --color-warning: #d98a12;
  --color-warning-soft: #fff3d8;
  --color-warning-ink: #734500;
  --color-success: #2a8b59;
  --color-success-soft: #def4e7;
  --color-success-ink: #155d38;
  --color-info: #4b8fb1;
  --color-info-soft: #e4f3fa;
  --color-disabled-background: #dfe8e6;
  --color-disabled-border: #b9cbc8;
  --color-disabled-ink: #405856;
  --color-cloud: #386f93;
  --color-cloud-soft: #e5f1f8;
  --color-cloud-page: #f4f8fb;
  --font-body: "Yu Gothic UI", "Hiragino Kaku Gothic ProN", sans-serif;
  --font-display: "Yu Gothic", "Hiragino Sans", sans-serif;
  --border-width: 1px;
  --radius-small: 8px;
  --radius-medium: 16px;
  --radius-large: 24px;
  --radius-pill: 999px;
  --content-wide: 1180px;
  --content-standard: 848px;
  --content-intro: 792px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-18: 72px;
  --space-page-section: var(--space-8);
  --font-size-browser-chrome: 10px;
  --font-size-caption: 13px;
  --font-size-small: 14px;
  --font-size-label: 15px;
  --font-size-body: 16px;
  --font-size-brand: 19px;
  --font-size-summary: 19px;
  --font-size-card-title: 20px;
  --font-size-logo: 21px;
  --font-size-symbol-large: 36px;
  --control-min-height: 48px;
  --focus-ring-width: 3px;
  --focus-ring-offset: 3px;
  --shadow-card-subtle: 0 8px 24px rgb(20 61 58 / 7%);
  --shadow-card-prominent: 0 16px 48px rgb(20 61 58 / 14%);
  --shadow-button: 0 8px 20px rgb(8 127 114 / 18%);
  --motion-fast: 160ms ease;
  --motion-medium: 260ms ease;
}
.app-body,
.app-body * {
  box-sizing: border-box;
}
.app-document {
  background: var(--color-page);
  color: var(--color-ink);
  font-family: var(--font-body);
  scroll-behavior: smooth;
}
.app-body {
  margin: 0;
}
@media (prefers-reduced-motion: reduce) {
  .app-document {
    scroll-behavior: auto;
  }
  .app-body *,
  .app-body *::before,
  .app-body *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
