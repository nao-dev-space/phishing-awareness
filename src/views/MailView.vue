<template>
  <div class="mail-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <NoticeBox class="mail-view-safety-notice" :title="safetyTitle" :message="safetyMessage" />
    <div class="mail-view-mail" :aria-label="mailBodyLabel">
      <div class="mail-view-toolbar">
        <CloudLetterLogo
          :service-name="serviceName"
          :accessible-label="logoLabel"
          :mark="logoMark"
        />
        <AppText :text="simulationLabel" :size="smallSize" :tone="mutedTone" />
      </div>
      <dl class="mail-view-metadata">
        <div class="mail-view-metadata-row">
          <dt class="mail-view-term">{{ senderTerm }}</dt>
          <dd class="mail-view-detail">{{ sender }}</dd>
        </div>
        <div class="mail-view-metadata-row">
          <dt class="mail-view-term">{{ subjectTerm }}</dt>
          <dd class="mail-view-detail">{{ subject }}</dd>
        </div>
      </dl>
      <div class="mail-view-body">
        <AppText :text="greeting" />
        <AppText :text="mailParagraphOne" />
        <AppText :text="mailParagraphTwo" />
        <AppText :text="mailParagraphThree" />
        <AppButton
          class="mail-view-fake-link"
          :label="fakeLinkButtonLabel"
          @click="followMailLink"
        />
      </div>
    </div>
    <div class="mail-view-choices">
      <AppHeading :level="choiceHeadingLevel" :text="choiceTitle" />
      <div class="mail-view-choice-list">
        <AppButton
          v-for="choice in mailChoices"
          :key="choice.id"
          :label="choice.label"
          :variant="secondaryVariant"
          @click="selectChoice(choice)"
        />
      </div>
      <NoticeBox
        v-if="selectedSafeChoice"
        :title="goodChoiceTitle"
        :message="selectedSafeChoice.explanation"
        :tone="successTone"
      />
      <RouteAction v-if="selectedSafeChoice" :label="reviewLabel" :route-name="reviewRoute" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useRouter, type Router } from "vue-router";
import AppButton from "@/components/atoms/AppButton.vue";
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import CloudLetterLogo from "@/components/atoms/CloudLetterLogo.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { FOLLOW_LINK_CHOICE_ID, MAIL_CHOICES, SERVICE_NAME } from "@/config/content";
import { LOGIN_ROUTE_NAME, REVIEW_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import type { MailChoice, RouteName } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "mail.eyebrow";
const TITLE_MESSAGE_KEY: string = "mail.title";
const DESCRIPTION_MESSAGE_KEY: string = "mail.description";
const SAFETY_TITLE_MESSAGE_KEY: string = "mail.safetyTitle";
const SAFETY_MESSAGE_KEY: string = "mail.safetyMessage";
const LOGO_LABEL_MESSAGE_KEY: string = "mail.logoLabel";
const LOGO_MARK_MESSAGE_KEY: string = "visuals.envelope";
const SIMULATION_LABEL_MESSAGE_KEY: string = "mail.simulationLabel";
const MAIL_BODY_LABEL_MESSAGE_KEY: string = "mail.mailBodyLabel";
const SENDER_TERM_MESSAGE_KEY: string = "mail.senderTerm";
const SENDER_MESSAGE_KEY: string = "mail.sender";
const SUBJECT_TERM_MESSAGE_KEY: string = "mail.subjectTerm";
const SUBJECT_MESSAGE_KEY: string = "mail.subject";
const GREETING_MESSAGE_KEY: string = "mail.greeting";
const PARAGRAPH_ONE_MESSAGE_KEY: string = "mail.paragraphOne";
const PARAGRAPH_TWO_MESSAGE_KEY: string = "mail.paragraphTwo";
const PARAGRAPH_THREE_MESSAGE_KEY: string = "mail.paragraphThree";
const FAKE_LINK_MESSAGE_KEY: string = "mail.fakeLink";
const CHOICE_TITLE_MESSAGE_KEY: string = "mail.choiceTitle";
const GOOD_CHOICE_TITLE_MESSAGE_KEY: string = "mail.goodChoiceTitle";
const REVIEW_LABEL_MESSAGE_KEY: string = "mail.review";
const router: Router = useRouter();
const selectedSafeChoice: Ref<MailChoice | null> = ref(null);
const mailChoices: readonly MailChoice[] = MAIL_CHOICES;
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const safetyTitle: string = translateMessage(SAFETY_TITLE_MESSAGE_KEY);
const safetyMessage: string = translateMessage(SAFETY_MESSAGE_KEY);
const serviceName: string = SERVICE_NAME;
const logoLabel: string = translateMessage(LOGO_LABEL_MESSAGE_KEY);
const logoMark: string = translateMessage(LOGO_MARK_MESSAGE_KEY);
const simulationLabel: string = translateMessage(SIMULATION_LABEL_MESSAGE_KEY);
const mailBodyLabel: string = translateMessage(MAIL_BODY_LABEL_MESSAGE_KEY);
const senderTerm: string = translateMessage(SENDER_TERM_MESSAGE_KEY);
const sender: string = translateMessage(SENDER_MESSAGE_KEY);
const subjectTerm: string = translateMessage(SUBJECT_TERM_MESSAGE_KEY);
const subject: string = translateMessage(SUBJECT_MESSAGE_KEY);
const greeting: string = translateMessage(GREETING_MESSAGE_KEY);
const mailParagraphOne: string = translateMessage(PARAGRAPH_ONE_MESSAGE_KEY);
const mailParagraphTwo: string = translateMessage(PARAGRAPH_TWO_MESSAGE_KEY);
const mailParagraphThree: string = translateMessage(PARAGRAPH_THREE_MESSAGE_KEY);
const fakeLinkButtonLabel: string = translateMessage(FAKE_LINK_MESSAGE_KEY);
const choiceTitle: string = translateMessage(CHOICE_TITLE_MESSAGE_KEY);
const goodChoiceTitle: string = translateMessage(GOOD_CHOICE_TITLE_MESSAGE_KEY);
const reviewLabel: string = translateMessage(REVIEW_LABEL_MESSAGE_KEY);
const reviewRoute: RouteName = REVIEW_ROUTE_NAME;
const choiceHeadingLevel: HeadingLevel = 2;
const smallSize: "small" = "small";
const mutedTone: "muted" = "muted";
const secondaryVariant: "secondary" = "secondary";
const successTone: "success" = "success";

/**
 * 疑似メールで選んだ行動に応じて、安全な説明または疑似ログインへ進める。
 * @param choice 利用者が選択した行動。
 * @returns 戻り値はなく、表示状態または現在ルートを更新する。
 */
function selectChoice(choice: MailChoice): void {
  // 危険な選択肢では外部サイトを開かず、学習用の疑似ログイン画面だけへ遷移する。
  if (!choice.isSafe) {
    void router.push({ name: LOGIN_ROUTE_NAME });
    return;
  }
  selectedSafeChoice.value = choice;
}

/**
 * 疑似メール本文のリンク操作を、危険な選択肢と同じ疑似ログイン遷移へ接続する。
 * @returns 戻り値はなく、外部通信せず疑似ログインへ遷移する。
 */
function followMailLink(): void {
  const followLinkChoice: MailChoice | undefined = mailChoices.find(
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
  box-shadow: var(--shadow-card);
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
  padding: 18px 22px;
}
.mail-view-metadata {
  display: grid;
  margin: 0;
  padding: 18px 24px 0;
}
.mail-view-metadata-row {
  border-bottom: var(--border-width) solid var(--color-border);
  display: grid;
  gap: 12px;
  grid-template-columns: 80px 1fr;
  padding: 11px 0;
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
  gap: 18px;
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
  gap: 18px;
}
.mail-view-choice-list {
  display: grid;
  gap: 10px;
}
.mail-view-choice-list :deep(.app-button) {
  justify-content: flex-start;
  text-align: left;
  width: 100%;
}
@media (max-width: 560px) {
  .mail-view-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
  .mail-view-metadata-row {
    grid-template-columns: 1fr;
    gap: 3px;
  }
}
</style>
