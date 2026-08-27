<template>
  <div class="review-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <div class="review-view-points">
      <div v-for="point in content.suspiciousPoints" :key="point.id" class="review-view-point">
        <div class="review-view-number" aria-hidden="true">{{ point.id }}</div>
        <div class="review-view-point-copy">
          <AppHeading
            :level="HEADING_LEVELS.TWO"
            :text="point.location"
            :size="HEADING_SIZES.CARD"
          />
          <dl class="review-view-details">
            <div class="review-view-detail">
              <dt class="review-view-detail-label review-view-detail-label-risk">
                {{ t(MESSAGE_KEYS.riskLabel) }}
              </dt>
              <dd class="review-view-detail-description">
                <AppText :text="point.risk" />
              </dd>
            </div>
            <div class="review-view-detail">
              <dt class="review-view-detail-label review-view-detail-label-action">
                {{ t(MESSAGE_KEYS.actionLabel) }}
              </dt>
              <dd class="review-view-detail-description">
                <AppText :text="point.safeAction" />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <NoticeBox
      :title="t(MESSAGE_KEYS.habitTitle)"
      :message="t(MESSAGE_KEYS.habitMessage)"
      :tone="NOTICE_TONES.SUCCESS"
    />
    <div class="review-view-actions">
      <RouteAction :label="t(MESSAGE_KEYS.learnLabel)" :route-name="LEARN_ROUTE_NAME" />
      <RouteAction
        :label="t(MESSAGE_KEYS.quizLabel)"
        :route-name="QUIZ_ROUTE_NAME"
        :variant="ROUTE_ACTION_VARIANTS.SECONDARY"
      />
      <RouteAction
        :label="t(MESSAGE_KEYS.retryLabel)"
        :route-name="MAIL_ROUTE_NAME"
        :variant="ROUTE_ACTION_VARIANTS.QUIET"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, type Composer } from "vue-i18n";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { LEARN_ROUTE_NAME, MAIL_ROUTE_NAME, QUIZ_ROUTE_NAME } from "@/config/routes";
import { HEADING_LEVELS, HEADING_SIZES, NOTICE_TONES, ROUTE_ACTION_VARIANTS } from "@/config/ui";

/** 振り返り画面に表示する各文言の翻訳キーを表す。 */
interface ReviewMessageKeys {
  readonly actionLabel: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly habitMessage: string;
  readonly habitTitle: string;
  readonly learnLabel: string;
  readonly quizLabel: string;
  readonly retryLabel: string;
  readonly riskLabel: string;
  readonly title: string;
}

const MESSAGE_KEYS: ReviewMessageKeys = {
  actionLabel: "review.actionLabel",
  description: "review.description",
  eyebrow: "review.eyebrow",
  habitMessage: "review.habitMessage",
  habitTitle: "review.habitTitle",
  learnLabel: "review.learn",
  quizLabel: "review.quiz",
  retryLabel: "review.retry",
  riskLabel: "review.riskLabel",
  title: "review.title",
};
const { t }: Composer = useI18n();
const content = useContent();
</script>

<style scoped>
.review-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.review-view-points {
  display: grid;
  gap: var(--space-4);
}
.review-view-point {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  display: grid;
  gap: var(--space-5);
  grid-template-columns: auto 1fr;
  padding: var(--space-6);
}
.review-view-number {
  align-items: center;
  background: var(--color-primary);
  border-radius: 50%;
  color: var(--color-on-primary);
  display: flex;
  font-family: var(--font-display);
  font-size: var(--font-size-card-title);
  font-weight: 900;
  height: var(--space-10);
  justify-content: center;
  width: var(--space-10);
}
.review-view-point-copy {
  display: grid;
  gap: var(--space-4);
}
.review-view-details {
  display: grid;
  gap: var(--space-3);
  margin: 0;
}
.review-view-detail {
  display: grid;
  gap: var(--space-1);
}
.review-view-detail-label {
  font-size: var(--font-size-small);
  font-weight: 700;
  line-height: 1.5;
}
.review-view-detail-label-risk {
  color: var(--color-warning-ink);
}
.review-view-detail-label-action {
  color: var(--color-primary-dark);
}
.review-view-detail-description {
  margin: 0;
}
.review-view-detail-description :deep(.app-text) {
  color: var(--color-ink);
  font-weight: 400;
}
.review-view-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
