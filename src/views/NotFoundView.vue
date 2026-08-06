<template>
  <div class="not-found-view">
    <div class="not-found-view-code">404</div>
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <RouteAction :label="homeLabel" :route-name="homeRoute" />
  </div>
</template>
<script setup lang="ts">
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { messageGroup } from "@/i18n";
import type { RouteName } from "@/types/app";
const messages = messageGroup("notFound");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const homeLabel: string = messages.home;
const homeRoute: RouteName = "home";
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
