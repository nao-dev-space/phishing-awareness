<template>
  <div class="not-found-view">
    <div class="not-found-view-code">{{ t(MESSAGE_KEYS.notFoundCode) }}</div>
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <RouteAction :label="t(MESSAGE_KEYS.homeLabel)" :route-name="HOME_ROUTE_NAME" />
  </div>
</template>
<script setup lang="ts">
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { HOME_ROUTE_NAME } from "@/config/routes";
import { useI18n, type Composer } from "vue-i18n";

interface NotFoundMessageKeys {
  readonly description: string;
  readonly eyebrow: string;
  readonly homeLabel: string;
  readonly notFoundCode: string;
  readonly title: string;
}

const MESSAGE_KEYS: NotFoundMessageKeys = {
  description: "notFound.description",
  eyebrow: "notFound.eyebrow",
  homeLabel: "notFound.home",
  notFoundCode: "visuals.notFoundCode",
  title: "notFound.title",
};
const { t }: Composer = useI18n();
</script>
<style scoped>
.not-found-view {
  align-items: start;
  display: grid;
  gap: 24px;
  margin: 60px auto;
  max-width: var(--content-standard);
}
.not-found-view-code {
  color: var(--color-primary-soft);
  font-family: var(--font-display);
  font-size: clamp(100px, 25vw, 230px);
  font-weight: 900;
  letter-spacing: -10px;
  line-height: 0.8;
}
</style>
