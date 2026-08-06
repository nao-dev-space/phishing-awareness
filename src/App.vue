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
  --color-cloud: #386f93;
  --color-cloud-soft: #e5f1f8;
  --color-cloud-page: #f4f8fb;
  --font-body: "Yu Gothic UI", "Hiragino Kaku Gothic ProN", sans-serif;
  --font-display: "Yu Gothic", "Hiragino Sans", sans-serif;
  --border-width: 1px;
  --radius-small: 10px;
  --radius-medium: 16px;
  --radius-large: 24px;
  --radius-pill: 999px;
  --content-wide: 1180px;
  --content-standard: 850px;
  --shadow-card: 0 12px 36px rgb(20 61 58 / 8%);
  --shadow-button: 0 8px 20px rgb(8 127 114 / 18%);
  --shadow-visual: 0 24px 60px rgb(20 61 58 / 16%);
  --motion-fast: 160ms ease;
  --motion-medium: 260ms ease;
}
* {
  box-sizing: border-box;
}
html {
  background: var(--color-page);
  color: var(--color-ink);
  font-family: var(--font-body);
  scroll-behavior: smooth;
}
body {
  margin: 0;
  min-width: 320px;
}
button,
input {
  font-family: inherit;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
