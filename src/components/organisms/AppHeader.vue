<template>
  <header class="site-header">
    <div class="site-header-inner">
      <RouterLink class="site-header-brand" :to="{ name: HOME_ROUTE_NAME }">{{
        content.appName
      }}</RouterLink>
      <nav class="site-header-desktop-nav" :aria-label="t(MESSAGE_KEYS.desktopNav)">
        <RouterLink
          v-for="item in content.navigationItems"
          :key="item.routeName"
          class="site-header-nav-link"
          :to="{ name: item.routeName }"
          >{{ item.label }}</RouterLink
        >
      </nav>
      <AppButton
        class="site-header-menu-button"
        :label="menuButtonLabel"
        variant="quiet"
        :aria-expanded="isMenuOpen"
        :aria-controls="mobileMenuId"
        @click="toggleMenu"
      />
    </div>
    <nav
      v-if="isMenuOpen"
      :id="mobileMenuId"
      class="site-header-mobile-nav"
      :aria-label="t(MESSAGE_KEYS.mobileNav)"
    >
      <RouterLink
        v-for="item in content.navigationItems"
        :key="item.routeName"
        class="site-header-mobile-link"
        :to="{ name: item.routeName }"
        @click="closeMenu"
        >{{ item.label }}</RouterLink
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import AppButton from "@/components/atoms/AppButton.vue";
import { useContent } from "@/composables/useContent";
import { HOME_ROUTE_NAME } from "@/config/routes";

/** ヘッダーとナビゲーションに表示する各文言の翻訳キーを表す。 */
interface HeaderMessageKeys {
  readonly closeMenu: string;
  readonly desktopNav: string;
  readonly mobileNav: string;
  readonly openMenu: string;
}

const MESSAGE_KEYS: HeaderMessageKeys = {
  closeMenu: "layout.closeMenu",
  desktopNav: "layout.desktopNav",
  mobileNav: "layout.mobileNav",
  openMenu: "layout.openMenu",
};
const { t }: Composer = useI18n();
const content = useContent();
const mobileMenuId: string = "mobile-navigation";
const isMenuOpen: Ref<boolean> = ref(false);
/** 現在の開閉状態に対応するメニューボタンの操作名を返す。 */
const menuButtonLabel = computed((): string => {
  const messageKey: string = isMenuOpen.value ? MESSAGE_KEYS.closeMenu : MESSAGE_KEYS.openMenu;
  const label: string = t(messageKey);
  return label;
});

/** メニューの開閉状態を反転する。 */
function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
}
/** ページ遷移時にメニューを閉じる。 */
function closeMenu(): void {
  isMenuOpen.value = false;
}
</script>

<style scoped>
.site-header {
  backdrop-filter: blur(14px);
  background: color-mix(in srgb, var(--color-page) 90%, transparent);
  border-bottom: var(--border-width) solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 20;
}
.site-header-inner {
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--content-wide);
  min-height: 72px;
  padding: var(--space-3) var(--space-6);
}
.site-header-brand {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: var(--font-size-brand);
  font-weight: 850;
  text-decoration: none;
}
.site-header-desktop-nav {
  display: flex;
  gap: 4px;
}
.site-header-nav-link,
.site-header-mobile-link {
  border-radius: var(--radius-small);
  color: var(--color-ink-soft);
  font-weight: 650;
  padding: var(--space-2) var(--space-3);
  text-decoration: none;
}
.site-header-nav-link:hover,
.site-header-mobile-link:hover,
.site-header-nav-link.router-link-active,
.site-header-mobile-link.router-link-active {
  background: var(--color-primary-soft);
  color: var(--color-primary-dark);
}
.site-header-nav-link:focus-visible,
.site-header-mobile-link:focus-visible,
.site-header-brand:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus);
  outline-offset: var(--focus-ring-offset);
}
.site-header-menu-button {
  display: none;
}
.site-header-mobile-nav {
  border-top: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 4px;
  padding: var(--space-3) var(--space-6) var(--space-4);
}
@media (min-width: 761px) {
  .site-header-mobile-nav {
    display: none;
  }
}
@media (max-width: 760px) {
  .site-header-desktop-nav {
    display: none;
  }
  .site-header-menu-button {
    display: inline-flex;
    flex: 0 0 auto;
    font-size: var(--font-size-small);
    padding: var(--space-2) var(--space-3);
    white-space: nowrap;
  }
  .site-header-inner {
    gap: 8px;
    min-height: 64px;
    padding: var(--space-2) var(--space-4);
  }
  .site-header-brand {
    font-size: var(--font-size-label);
    white-space: nowrap;
  }
}
@media (max-width: 340px) {
  .site-header-inner {
    gap: var(--space-1);
    padding-inline: var(--space-2);
  }
}
</style>
