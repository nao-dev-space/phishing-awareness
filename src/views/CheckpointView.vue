<template>
  <div class="checkpoint-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <section class="checkpoint-view-reflection" :aria-labelledby="REFLECTION_TITLE_ID">
      <AppHeading
        :id="REFLECTION_TITLE_ID"
        :level="HEADING_LEVELS.TWO"
        :text="t(MESSAGE_KEYS.hypotheticalQuestion)"
        :size="HEADING_SIZES.CARD"
      />
      <AppText :text="t(MESSAGE_KEYS.reflectionQuestion)" :size="TEXT_SIZES.LEAD" />
    </section>
    <AppButton :label="t(MESSAGE_KEYS.nextLabel)" @click="continueToReveal" />
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import { useRouter, type Router } from "vue-router";
import AppButton from "@/components/atoms/AppButton.vue";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { REVEAL_ROUTE_NAME } from "@/config/routes";
import { HEADING_LEVELS, HEADING_SIZES, TEXT_SIZES } from "@/config/ui";

/** 立ち止まり画面に表示する各文言の翻訳キーを表す。 */
interface CheckpointMessageKeys {
  readonly description: string;
  readonly eyebrow: string;
  readonly hypotheticalQuestion: string;
  readonly nextLabel: string;
  readonly reflectionQuestion: string;
  readonly title: string;
}

const MESSAGE_KEYS: CheckpointMessageKeys = {
  description: "checkpoint.description",
  eyebrow: "checkpoint.eyebrow",
  hypotheticalQuestion: "checkpoint.hypotheticalQuestion",
  nextLabel: "checkpoint.next",
  reflectionQuestion: "checkpoint.reflectionQuestion",
  title: "checkpoint.title",
};
const REFLECTION_TITLE_ID: string = "checkpoint-reflection-title";
const router: Router = useRouter();
const { t }: Composer = useI18n();

/** 立ち止まる画面から種明かしへ進む。 */
function continueToReveal(): void {
  void router.push({ name: REVEAL_ROUTE_NAME });
}
</script>

<style scoped>
.checkpoint-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.checkpoint-view-reflection {
  background: var(--color-warning-soft);
  border: var(--border-width) solid var(--color-warning);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-card-subtle);
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
}
.checkpoint-view > .app-button {
  justify-self: start;
}
@media (max-width: 600px) {
  .checkpoint-view-reflection {
    padding: var(--space-5) var(--space-4);
  }
  .checkpoint-view > .app-button {
    justify-self: stretch;
  }
}
</style>
