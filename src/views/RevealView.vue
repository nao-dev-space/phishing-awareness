<template>
  <div class="reveal-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <NoticeBox
      :title="t(MESSAGE_KEYS.safetyTitle)"
      :message="t(MESSAGE_KEYS.safetyMessage)"
      :tone="NOTICE_TONES.SUCCESS"
    />
    <div class="reveal-view-explanation">
      <AppHeading :level="HEADING_LEVELS.TWO" :text="t(MESSAGE_KEYS.explanationTitle)" />
      <AppText :text="t(MESSAGE_KEYS.realRisk)" :size="TEXT_SIZES.LEAD" />
      <div class="reveal-view-cards">
        <InfoCard
          v-for="point in content.revealPoints"
          :key="point.title"
          :title="point.title"
          :body="point.body"
        />
      </div>
    </div>
    <div class="reveal-view-actions">
      <RouteAction :label="t(MESSAGE_KEYS.reviewLabel)" :route-name="REVIEW_ROUTE_NAME" />
      <RouteAction
        :label="t(MESSAGE_KEYS.retryLabel)"
        :route-name="MAIL_ROUTE_NAME"
        :variant="ROUTE_ACTION_VARIANTS.SECONDARY"
      />
      <RouteAction
        :label="t(MESSAGE_KEYS.homeLabel)"
        :route-name="HOME_ROUTE_NAME"
        :variant="ROUTE_ACTION_VARIANTS.QUIET"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import InfoCard from "@/components/molecules/InfoCard.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { HOME_ROUTE_NAME, MAIL_ROUTE_NAME, REVIEW_ROUTE_NAME } from "@/config/routes";
import { HEADING_LEVELS, NOTICE_TONES, ROUTE_ACTION_VARIANTS, TEXT_SIZES } from "@/config/ui";

/** 種明かし画面に表示する各文言の翻訳キーを表す。 */
interface RevealMessageKeys {
  readonly description: string;
  readonly eyebrow: string;
  readonly explanationTitle: string;
  readonly homeLabel: string;
  readonly realRisk: string;
  readonly retryLabel: string;
  readonly reviewLabel: string;
  readonly safetyMessage: string;
  readonly safetyTitle: string;
  readonly title: string;
}

const MESSAGE_KEYS: RevealMessageKeys = {
  description: "reveal.description",
  eyebrow: "reveal.eyebrow",
  explanationTitle: "reveal.explanationTitle",
  homeLabel: "reveal.home",
  realRisk: "reveal.realRisk",
  retryLabel: "reveal.retry",
  reviewLabel: "reveal.review",
  safetyMessage: "reveal.safetyMessage",
  safetyTitle: "reveal.safetyTitle",
  title: "reveal.title",
};
const { t }: Composer = useI18n();
const content = useContent();
</script>

<style scoped>
.reveal-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.reveal-view-explanation {
  display: grid;
  gap: var(--space-5);
}
.reveal-view-cards {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(2, 1fr);
}
.reveal-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (max-width: 700px) {
  .reveal-view-cards {
    grid-template-columns: 1fr;
  }
}
</style>
