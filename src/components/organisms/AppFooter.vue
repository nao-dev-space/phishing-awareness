<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-copy">
        <AppText :text="purposeText" />
        <AppText :text="independenceText" :size="smallTextSize" />
        <AppText :text="warningText" :size="smallTextSize" :tone="warningTone" />
      </div>
      <nav class="site-footer-links" :aria-label="footerNavLabel">
        <RouterLink class="site-footer-link" :to="{ name: aboutRouteName }">{{
          aboutLabel
        }}</RouterLink>
        <RouterLink class="site-footer-link" :to="{ name: disclaimerRouteName }">{{
          disclaimerLabel
        }}</RouterLink>
        <RouterLink class="site-footer-link" :to="{ name: privacyRouteName }">{{
          privacyLabel
        }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppText from "@/components/atoms/AppText.vue";
import { REAL_CREDENTIAL_WARNING } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { RouteName } from "@/types/app";

const messages = messageGroup("layout");
const purposeText: string = messages.footerPurpose;
const independenceText: string = messages.footerIndependence;
const warningText: string = REAL_CREDENTIAL_WARNING;
const footerNavLabel: string = messages.footerNav;
const aboutLabel: string = messages.about;
const disclaimerLabel: string = messages.disclaimer;
const privacyLabel: string = messages.privacy;
const aboutRouteName: RouteName = "about";
const disclaimerRouteName: RouteName = "disclaimer";
const privacyRouteName: RouteName = "privacy";
const smallTextSize: "small" = "small";
const warningTone: "warning" = "warning";
</script>

<style scoped>
.site-footer {
  background: var(--color-ink);
  color: var(--color-on-dark);
  margin-top: 80px;
}
.site-footer-inner {
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
  margin: 0 auto;
  max-width: var(--content-wide);
  padding: 40px 24px;
}
.site-footer-copy {
  display: grid;
  gap: 10px;
}
.site-footer-copy :deep(.app-text) {
  color: var(--color-on-dark);
}
.site-footer-links {
  align-content: start;
  display: grid;
  gap: 8px;
}
.site-footer-link {
  color: var(--color-on-dark);
  padding: 5px;
  text-underline-offset: 4px;
}
.site-footer-link:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
@media (max-width: 700px) {
  .site-footer {
    margin-top: 56px;
  }
  .site-footer-inner {
    grid-template-columns: 1fr;
    padding: 32px 18px;
  }
}
</style>
