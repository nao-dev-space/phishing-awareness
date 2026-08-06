<template>
  <header class="site-header">
    <div class="site-header-inner">
      <RouterLink class="site-header-brand" :to="{ name: homeRouteName }">{{ appName }}</RouterLink>
      <nav class="site-header-desktop-nav" :aria-label="desktopNavLabel">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.routeName"
          class="site-header-nav-link"
          :to="{ name: item.routeName }"
          >{{ item.label }}</RouterLink
        >
      </nav>
      <AppButton
        class="site-header-menu-button"
        :label="menuButtonLabel"
        :variant="menuButtonVariant"
        :aria-expanded="isMenuOpen"
        :aria-controls="mobileMenuId"
        @click="toggleMenu"
      />
    </div>
    <nav
      v-if="isMenuOpen"
      :id="mobileMenuId"
      class="site-header-mobile-nav"
      :aria-label="mobileNavLabel"
    >
      <RouterLink
        v-for="item in navigationItems"
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
import { computed, ref, type ComputedRef, type Ref } from "vue";
import AppButton from "@/components/atoms/AppButton.vue";
import { APP_NAME, NAVIGATION_ITEMS } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { NavigationItem, RouteName } from "@/types/app";

const appName: string = APP_NAME;
const navigationItems: readonly NavigationItem[] = NAVIGATION_ITEMS;
const homeRouteName: RouteName = "home";
const messages = messageGroup("layout");
const desktopNavLabel: string = messages.desktopNav;
const mobileNavLabel: string = messages.mobileNav;
const mobileMenuId: string = "mobile-navigation";
const menuButtonVariant: "quiet" = "quiet";
const isMenuOpen: Ref<boolean> = ref(false);
const menuButtonLabel: ComputedRef<string> = computed((): string =>
  isMenuOpen.value ? messages.closeMenu : messages.openMenu,
);

/** メニューの開閉状態を反転する。@returns 戻り値はなく、ローカル表示状態だけを更新する。 */
function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value;
}
/** ページ遷移時にメニューを閉じる。@returns 戻り値はなく、ローカル表示状態だけを更新する。 */
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
  padding: 10px 24px;
}
.site-header-brand {
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 19px;
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
  padding: 9px 12px;
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
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
.site-header-menu-button {
  display: none;
}
.site-header-mobile-nav {
  border-top: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 4px;
  padding: 12px 24px 18px;
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
  }
  .site-header-inner {
    gap: 8px;
    min-height: 64px;
    padding: 8px 18px;
  }
  .site-header-brand {
    font-size: 15px;
    white-space: nowrap;
  }
  .site-header-menu-button :deep(.app-button) {
    font-size: 14px;
    padding: 9px 14px;
    white-space: nowrap;
  }
}
</style>
