<template>
  <div class="mail-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <NoticeBox
      class="mail-view-safety-notice"
      :title="t(MESSAGE_KEYS.safetyTitle)"
      :message="t(MESSAGE_KEYS.safetyMessage)"
    />
    <div class="mail-view-mail" :aria-label="t(MESSAGE_KEYS.mailBodyLabel)">
      <div class="mail-view-toolbar">
        <CloudLetterLogo
          :service-name="content.serviceName"
          :accessible-label="t(MESSAGE_KEYS.logoLabel)"
          :mark="t(MESSAGE_KEYS.logoMark)"
        />
        <AppText :text="t(MESSAGE_KEYS.simulationLabel)" size="small" tone="muted" />
      </div>
      <dl class="mail-view-metadata">
        <div class="mail-view-metadata-row">
          <dt class="mail-view-term">{{ t(MESSAGE_KEYS.senderTerm) }}</dt>
          <dd class="mail-view-detail">{{ t(MESSAGE_KEYS.sender) }}</dd>
        </div>
        <div class="mail-view-metadata-row">
          <dt class="mail-view-term">{{ t(MESSAGE_KEYS.subjectTerm) }}</dt>
          <dd class="mail-view-detail">{{ t(MESSAGE_KEYS.subject) }}</dd>
        </div>
      </dl>
      <div class="mail-view-body">
        <AppText :text="t(MESSAGE_KEYS.greeting)" />
        <AppText :text="t(MESSAGE_KEYS.paragraphOne)" />
        <AppText :text="t(MESSAGE_KEYS.paragraphTwo)" />
        <AppText :text="t(MESSAGE_KEYS.paragraphThree)" />
        <AppButton
          class="mail-view-fake-link"
          :label="t(MESSAGE_KEYS.fakeLinkLabel)"
          @click="followMailLink"
        />
      </div>
    </div>
    <div class="mail-view-choices">
      <AppHeading :level="2" :text="t(MESSAGE_KEYS.choiceTitle)" />
      <div class="mail-view-choice-list">
        <AppButton
          v-for="choice in content.mailChoices"
          :key="choice.id"
          :label="choice.label"
          variant="secondary"
          @click="selectChoice(choice)"
        />
      </div>
      <NoticeBox
        v-if="selectedSafeChoice"
        :title="t(MESSAGE_KEYS.goodChoiceTitle)"
        :message="selectedSafeChoice.explanation"
        tone="success"
      />
      <RouteAction
        v-if="selectedSafeChoice"
        :label="t(MESSAGE_KEYS.reviewLabel)"
        :route-name="REVIEW_ROUTE_NAME"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import { useRouter, type Router } from "vue-router";
import AppButton from "@/components/atoms/AppButton.vue";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import CloudLetterLogo from "@/components/atoms/CloudLetterLogo.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { FOLLOW_LINK_CHOICE_ID, type AppContent } from "@/config/content";
import { LOGIN_ROUTE_NAME, REVIEW_ROUTE_NAME } from "@/config/routes";
import type { MailChoice, MailChoiceId } from "@/types/app";

interface MailMessageKeys {
  readonly choiceTitle: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly fakeLinkLabel: string;
  readonly goodChoiceTitle: string;
  readonly greeting: string;
  readonly logoLabel: string;
  readonly logoMark: string;
  readonly mailBodyLabel: string;
  readonly paragraphOne: string;
  readonly paragraphThree: string;
  readonly paragraphTwo: string;
  readonly reviewLabel: string;
  readonly safetyMessage: string;
  readonly safetyTitle: string;
  readonly sender: string;
  readonly senderTerm: string;
  readonly simulationLabel: string;
  readonly subject: string;
  readonly subjectTerm: string;
  readonly title: string;
}

const MESSAGE_KEYS: MailMessageKeys = {
  choiceTitle: "mail.choiceTitle",
  description: "mail.description",
  eyebrow: "mail.eyebrow",
  fakeLinkLabel: "mail.fakeLink",
  goodChoiceTitle: "mail.goodChoiceTitle",
  greeting: "mail.greeting",
  logoLabel: "mail.logoLabel",
  logoMark: "visuals.envelope",
  mailBodyLabel: "mail.mailBodyLabel",
  paragraphOne: "mail.paragraphOne",
  paragraphThree: "mail.paragraphThree",
  paragraphTwo: "mail.paragraphTwo",
  reviewLabel: "mail.review",
  safetyMessage: "mail.safetyMessage",
  safetyTitle: "mail.safetyTitle",
  sender: "mail.sender",
  senderTerm: "mail.senderTerm",
  simulationLabel: "mail.simulationLabel",
  subject: "mail.subject",
  subjectTerm: "mail.subjectTerm",
  title: "mail.title",
};
const router: Router = useRouter();
const { t }: Composer = useI18n();
const content: ComputedRef<AppContent> = useContent();
const selectedSafeChoiceId: Ref<MailChoiceId | null> = ref(null);
const selectedSafeChoice: ComputedRef<MailChoice | null> = computed((): MailChoice | null => {
  const choice: MailChoice | undefined = content.value.mailChoices.find(
    (candidate: MailChoice): boolean => candidate.id === selectedSafeChoiceId.value,
  );
  return choice ?? null;
});

/** 疑似メールで選んだ行動に応じて、安全な説明または疑似ログインへ進める。 */
function selectChoice(choice: MailChoice): void {
  // 危険な選択肢では外部サイトを開かず、学習用の疑似ログイン画面だけへ遷移する。
  if (!choice.isSafe) {
    void router.push({ name: LOGIN_ROUTE_NAME });
    return;
  }
  selectedSafeChoiceId.value = choice.id;
}

/** 疑似メール本文のリンク操作を、危険な選択肢と同じ疑似ログイン遷移へ接続する。 */
function followMailLink(): void {
  const followLinkChoice: MailChoice | undefined = content.value.mailChoices.find(
    (choice: MailChoice): boolean => choice.id === FOLLOW_LINK_CHOICE_ID,
  );
  // 設定に疑似リンク用の選択肢が存在する場合だけ、共通の選択処理へ渡す。
  if (followLinkChoice) {
    selectChoice(followLinkChoice);
  }
}
</script>

<style scoped>
.mail-view {
  display: grid;
  gap: 28px;
  margin: 0 auto;
  max-width: var(--content-standard);
}
.mail-view-mail {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-cloud);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card-prominent);
  overflow: hidden;
}
.mail-view-safety-notice {
  border-color: var(--color-border);
}
.mail-view-toolbar {
  align-items: center;
  background: var(--color-cloud-page);
  border-bottom: var(--border-width) solid var(--color-border);
  display: flex;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
}
.mail-view-metadata {
  display: grid;
  margin: 0;
  padding: var(--space-5) var(--space-6) 0;
}
.mail-view-metadata-row {
  border-bottom: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 12px;
  grid-template-columns: 80px 1fr;
  padding: var(--space-3) 0;
}
.mail-view-term {
  color: var(--color-muted);
  font-size: var(--font-size-small);
  font-weight: 700;
}
.mail-view-detail {
  color: var(--color-ink);
  margin: 0;
  overflow-wrap: anywhere;
}
.mail-view-body {
  display: grid;
  gap: var(--space-5);
  padding: 28px 24px 32px;
}
.mail-view-fake-link {
  background: var(--color-cloud);
  border-radius: var(--radius-small);
  color: var(--color-on-primary);
  font-weight: 750;
  justify-self: start;
  text-align: center;
}
.mail-view-choices {
  display: grid;
  gap: var(--space-5);
}
.mail-view-choice-list {
  display: grid;
  gap: var(--space-3);
}
.mail-view-choice-list :deep(.app-button) {
  justify-content: flex-start;
  text-align: left;
  width: 100%;
}
@media (min-width: 800px) {
  .mail-view-choice-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .mail-view-choice-list :deep(.app-button) {
    justify-content: center;
    text-align: center;
  }
}
@media (max-width: 560px) {
  .mail-view-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
  .mail-view-metadata-row {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
}
</style>
