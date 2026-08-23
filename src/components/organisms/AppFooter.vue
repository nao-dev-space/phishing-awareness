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
import { ABOUT_ROUTE_NAME, DISCLAIMER_ROUTE_NAME, PRIVACY_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { RouteName } from "@/types/app";

const PURPOSE_MESSAGE_KEY: string = "layout.footerPurpose";
const INDEPENDENCE_MESSAGE_KEY: string = "layout.footerIndependence";
const FOOTER_NAV_MESSAGE_KEY: string = "layout.footerNav";
const ABOUT_LABEL_MESSAGE_KEY: string = "layout.about";
const DISCLAIMER_LABEL_MESSAGE_KEY: string = "layout.disclaimer";
const PRIVACY_LABEL_MESSAGE_KEY: string = "layout.privacy";
const purposeText: string = translateMessage(PURPOSE_MESSAGE_KEY);
const independenceText: string = translateMessage(INDEPENDENCE_MESSAGE_KEY);
const warningText: string = REAL_CREDENTIAL_WARNING;
const footerNavLabel: string = translateMessage(FOOTER_NAV_MESSAGE_KEY);
const aboutLabel: string = translateMessage(ABOUT_LABEL_MESSAGE_KEY);
const disclaimerLabel: string = translateMessage(DISCLAIMER_LABEL_MESSAGE_KEY);
const privacyLabel: string = translateMessage(PRIVACY_LABEL_MESSAGE_KEY);
const aboutRouteName: RouteName = ABOUT_ROUTE_NAME;
const disclaimerRouteName: RouteName = DISCLAIMER_ROUTE_NAME;
const privacyRouteName: RouteName = PRIVACY_ROUTE_NAME;
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
  gap: var(--space-page-section);
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
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--focus-ring-offset);
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
