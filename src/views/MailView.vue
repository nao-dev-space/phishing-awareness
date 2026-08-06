<template>
  <div class="mail-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <NoticeBox class="mail-view-safety-notice" :title="safetyTitle" :message="safetyMessage" />
    <div class="mail-view-mail" :aria-label="mailBodyLabel">
      <div class="mail-view-toolbar">
        <CloudLetterLogo :service-name="serviceName" :accessible-label="logoLabel" />
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
import { MAIL_CHOICES, SERVICE_NAME } from "@/config/content";
import { messageGroup } from "@/i18n";
import type { MailChoice, RouteName } from "@/types/app";

const router: Router = useRouter();
const selectedSafeChoice: Ref<MailChoice | null> = ref(null);
const mailChoices: readonly MailChoice[] = MAIL_CHOICES;
const messages = messageGroup("mail");
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const safetyTitle: string = messages.safetyTitle;
const safetyMessage: string = messages.safetyMessage;
const serviceName: string = SERVICE_NAME;
const logoLabel: string = messages.logoLabel;
const simulationLabel: string = messages.simulationLabel;
const mailBodyLabel: string = messages.mailBodyLabel;
const senderTerm: string = messages.senderTerm;
const sender: string = messages.sender;
const subjectTerm: string = messages.subjectTerm;
const subject: string = messages.subject;
const greeting: string = messages.greeting;
const mailParagraphOne: string = messages.paragraphOne;
const mailParagraphTwo: string = messages.paragraphTwo;
const mailParagraphThree: string = messages.paragraphThree;
const fakeLinkButtonLabel: string = messages.fakeLink;
const choiceTitle: string = messages.choiceTitle;
const goodChoiceTitle: string = messages.goodChoiceTitle;
const reviewLabel: string = messages.review;
const reviewRoute: RouteName = "experience-review";
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
  if (!choice.isSafe) {
    void router.push({ name: "experience-login" });
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
    (choice: MailChoice): boolean => choice.id === "follow-link",
  );
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
  font-size: 14px;
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
  color: white;
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
