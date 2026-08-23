<template>
  <div class="not-found-view">
    <div class="not-found-view-code">{{ notFoundCode }}</div>
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <RouteAction :label="homeLabel" :route-name="homeRoute" />
  </div>
</template>
<script setup lang="ts">
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { HOME_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { RouteName } from "@/types/app";

const NOT_FOUND_CODE_MESSAGE_KEY: string = "visuals.notFoundCode";
const EYEBROW_MESSAGE_KEY: string = "notFound.eyebrow";
const TITLE_MESSAGE_KEY: string = "notFound.title";
const DESCRIPTION_MESSAGE_KEY: string = "notFound.description";
const HOME_LABEL_MESSAGE_KEY: string = "notFound.home";
const notFoundCode: string = translateMessage(NOT_FOUND_CODE_MESSAGE_KEY);
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const homeLabel: string = translateMessage(HOME_LABEL_MESSAGE_KEY);
const homeRoute: RouteName = HOME_ROUTE_NAME;
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
