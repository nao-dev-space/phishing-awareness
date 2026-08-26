<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-copy">
        <AppText :text="t(MESSAGE_KEYS.purpose)" />
        <AppText :text="t(MESSAGE_KEYS.independence)" size="small" />
        <AppText :text="content.realCredentialWarning" size="small" tone="warning" />
      </div>
      <nav class="site-footer-links" :aria-label="t(MESSAGE_KEYS.footerNav)">
        <RouterLink class="site-footer-link" :to="{ name: ABOUT_ROUTE_NAME }">{{
          t(MESSAGE_KEYS.aboutLabel)
        }}</RouterLink>
        <RouterLink class="site-footer-link" :to="{ name: DISCLAIMER_ROUTE_NAME }">{{
          t(MESSAGE_KEYS.disclaimerLabel)
        }}</RouterLink>
        <RouterLink class="site-footer-link" :to="{ name: PRIVACY_ROUTE_NAME }">{{
          t(MESSAGE_KEYS.privacyLabel)
        }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppText from "@/components/atoms/AppText.vue";
import { useContent } from "@/composables/useContent";
import { ABOUT_ROUTE_NAME, DISCLAIMER_ROUTE_NAME, PRIVACY_ROUTE_NAME } from "@/config/routes";

/** フッターに表示する各文言の翻訳キーを表す。 */
interface FooterMessageKeys {
  readonly aboutLabel: string;
  readonly disclaimerLabel: string;
  readonly footerNav: string;
  readonly independence: string;
  readonly privacyLabel: string;
  readonly purpose: string;
}

const MESSAGE_KEYS: FooterMessageKeys = {
  aboutLabel: "layout.about",
  disclaimerLabel: "layout.disclaimer",
  footerNav: "layout.footerNav",
  independence: "layout.footerIndependence",
  privacyLabel: "layout.privacy",
  purpose: "layout.footerPurpose",
};
const { t }: Composer = useI18n();
const content = useContent();
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
  gap: var(--space-3);
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
  padding: var(--space-1);
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
    padding: var(--space-8) var(--space-4);
  }
}
</style>
