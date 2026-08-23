<template>
  <div class="login-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <NoticeBox
      :title="warningTitle"
      :message="warningMessage"
      :tone="warningTone"
      :is-alert="true"
    />
    <div class="login-view-simulation">
      <div class="login-view-browser-bar">
        <div class="login-view-browser-dots" aria-hidden="true">{{ browserDots }}</div>
        <div class="login-view-address">{{ fakeAddress }}</div>
      </div>
      <div class="login-view-panel">
        <CloudLetterLogo
          :service-name="serviceName"
          :accessible-label="logoLabel"
          :mark="logoMark"
        />
        <AppHeading :level="panelHeadingLevel" :text="panelTitle" :size="cardHeadingSize" />
        <div :id="demoDescriptionId" class="login-view-demo-account">
          <AppText :text="demoTitle" :tone="accentTone" />
          <div class="login-view-credential-row">
            <code class="login-view-credential">{{ trainingAccount.email }}</code>
            <AppButton
              :label="copyEmailLabel"
              :variant="quietVariant"
              @click="copyTrainingValue(trainingAccount.email, emailCopiedMessage)"
            />
          </div>
          <div class="login-view-credential-row">
            <code class="login-view-credential">{{ trainingAccount.password }}</code>
            <AppButton
              :label="copyPasswordLabel"
              :variant="quietVariant"
              @click="copyTrainingValue(trainingAccount.password, passwordCopiedMessage)"
            />
          </div>
          <AppText
            class="login-view-copy-status"
            :text="copyStatus"
            :size="smallSize"
            role="status"
            aria-live="polite"
          />
        </div>
        <form class="login-view-form" autocomplete="off" novalidate @submit.prevent="handleSubmit">
          <AppFormField
            :id="emailFieldId"
            :model-value="emailInput"
            :name="emailFieldName"
            :label="emailLabel"
            :inputmode="emailInputMode"
            :described-by="demoDescriptionId"
            @update:model-value="updateEmailInput"
          />
          <AppFormField
            :id="passwordFieldId"
            :model-value="passwordInput"
            :name="passwordFieldName"
            :label="passwordLabel"
            :type="passwordFieldType"
            :autocomplete="passwordAutocomplete"
            :described-by="demoDescriptionId"
            @update:model-value="updatePasswordInput"
          />
          <AppButton :label="loginLabel" :type="submitType" @click="handleSubmitButtonClick" />
        </form>
      </div>
    </div>
    <div class="login-view-alternatives">
      <AppHeading :level="alternativesHeadingLevel" :text="alternativesTitle" />
      <AppText :text="alternativesDescription" />
      <div class="login-view-alternative-actions">
        <AppButton :label="enterChoiceLabel" :variant="secondaryVariant" @click="focusFirstField" />
        <AppButton
          :label="checkUrlLabel"
          :variant="secondaryVariant"
          @click="chooseSafeAction(checkUrlExplanation)"
        />
        <AppButton
          :label="officialSiteLabel"
          :variant="secondaryVariant"
          @click="chooseSafeAction(officialSiteExplanation)"
        />
      </div>
      <NoticeBox
        v-if="safeActionMessage"
        :title="safeChoiceTitle"
        :message="safeActionMessage"
        :tone="successTone"
      />
      <RouteAction v-if="safeActionMessage" :label="revealLabel" :route-name="revealRoute" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, type Ref } from "vue";
import { useRouter, type Router } from "vue-router";
import AppButton from "@/components/atoms/AppButton.vue";
import AppFormField from "@/components/atoms/AppFormField.vue";
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import CloudLetterLogo from "@/components/atoms/CloudLetterLogo.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { REAL_CREDENTIAL_WARNING, SERVICE_NAME, TRAINING_ACCOUNT } from "@/config/content";
import { REVEAL_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import { writeTrainingTextToClipboard, type ClipboardWriteResult } from "@/services/clipboard";
import { translateError } from "@/services/errors";
import type { RouteName, TrainingAccount } from "@/types/app";

const EYEBROW_MESSAGE_KEY: string = "login.eyebrow";
const TITLE_MESSAGE_KEY: string = "login.title";
const DESCRIPTION_MESSAGE_KEY: string = "login.description";
const WARNING_TITLE_MESSAGE_KEY: string = "login.warningTitle";
const FAKE_ADDRESS_MESSAGE_KEY: string = "login.fakeAddress";
const LOGO_LABEL_MESSAGE_KEY: string = "login.logoLabel";
const LOGO_MARK_MESSAGE_KEY: string = "visuals.envelope";
const BROWSER_DOTS_MESSAGE_KEY: string = "visuals.browserDots";
const PANEL_TITLE_MESSAGE_KEY: string = "login.panelTitle";
const DEMO_TITLE_MESSAGE_KEY: string = "login.demoTitle";
const COPY_EMAIL_LABEL_MESSAGE_KEY: string = "login.copyEmail";
const COPY_PASSWORD_LABEL_MESSAGE_KEY: string = "login.copyPassword";
const EMAIL_COPIED_MESSAGE_KEY: string = "login.emailCopied";
const PASSWORD_COPIED_MESSAGE_KEY: string = "login.passwordCopied";
const EMAIL_LABEL_MESSAGE_KEY: string = "login.emailLabel";
const PASSWORD_LABEL_MESSAGE_KEY: string = "login.passwordLabel";
const LOGIN_LABEL_MESSAGE_KEY: string = "login.login";
const ALTERNATIVES_TITLE_MESSAGE_KEY: string = "login.alternativesTitle";
const ALTERNATIVES_DESCRIPTION_MESSAGE_KEY: string = "login.alternativesDescription";
const ENTER_LABEL_MESSAGE_KEY: string = "login.enter";
const CHECK_URL_LABEL_MESSAGE_KEY: string = "login.checkUrl";
const OFFICIAL_SITE_LABEL_MESSAGE_KEY: string = "login.officialSite";
const CHECK_URL_EXPLANATION_MESSAGE_KEY: string = "login.checkUrlExplanation";
const OFFICIAL_SITE_EXPLANATION_MESSAGE_KEY: string = "login.officialSiteExplanation";
const SAFE_CHOICE_TITLE_MESSAGE_KEY: string = "login.safeChoiceTitle";
const REVEAL_LABEL_MESSAGE_KEY: string = "login.reveal";
const router: Router = useRouter();
const emailInput: Ref<string> = ref("");
const passwordInput: Ref<string> = ref("");
const copyStatus: Ref<string> = ref("");
const safeActionMessage: Ref<string> = ref("");
const trainingAccount: TrainingAccount = TRAINING_ACCOUNT;
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const warningTitle: string = translateMessage(WARNING_TITLE_MESSAGE_KEY);
const warningMessage: string = REAL_CREDENTIAL_WARNING;
const fakeAddress: string = translateMessage(FAKE_ADDRESS_MESSAGE_KEY);
const serviceName: string = SERVICE_NAME;
const logoLabel: string = translateMessage(LOGO_LABEL_MESSAGE_KEY);
const logoMark: string = translateMessage(LOGO_MARK_MESSAGE_KEY);
const browserDots: string = translateMessage(BROWSER_DOTS_MESSAGE_KEY);
const panelTitle: string = translateMessage(PANEL_TITLE_MESSAGE_KEY);
const demoTitle: string = translateMessage(DEMO_TITLE_MESSAGE_KEY);
const copyEmailLabel: string = translateMessage(COPY_EMAIL_LABEL_MESSAGE_KEY);
const copyPasswordLabel: string = translateMessage(COPY_PASSWORD_LABEL_MESSAGE_KEY);
const emailCopiedMessage: string = translateMessage(EMAIL_COPIED_MESSAGE_KEY);
const passwordCopiedMessage: string = translateMessage(PASSWORD_COPIED_MESSAGE_KEY);
const emailLabel: string = translateMessage(EMAIL_LABEL_MESSAGE_KEY);
const passwordLabel: string = translateMessage(PASSWORD_LABEL_MESSAGE_KEY);
const loginLabel: string = translateMessage(LOGIN_LABEL_MESSAGE_KEY);
const alternativesTitle: string = translateMessage(ALTERNATIVES_TITLE_MESSAGE_KEY);
const alternativesDescription: string = translateMessage(ALTERNATIVES_DESCRIPTION_MESSAGE_KEY);
const enterChoiceLabel: string = translateMessage(ENTER_LABEL_MESSAGE_KEY);
const checkUrlLabel: string = translateMessage(CHECK_URL_LABEL_MESSAGE_KEY);
const officialSiteLabel: string = translateMessage(OFFICIAL_SITE_LABEL_MESSAGE_KEY);
const checkUrlExplanation: string = translateMessage(CHECK_URL_EXPLANATION_MESSAGE_KEY);
const officialSiteExplanation: string = translateMessage(OFFICIAL_SITE_EXPLANATION_MESSAGE_KEY);
const safeChoiceTitle: string = translateMessage(SAFE_CHOICE_TITLE_MESSAGE_KEY);
const revealLabel: string = translateMessage(REVEAL_LABEL_MESSAGE_KEY);
const revealRoute: RouteName = REVEAL_ROUTE_NAME;
const emailFieldId: string = "training-user-identifier";
const passwordFieldId: string = "training-secret-phrase";
const emailFieldName: string = "training-user-identifier";
const passwordFieldName: string = "training-secret-phrase";
const demoDescriptionId: string = "training-account-description";
const passwordAutocomplete: string = "new-password";
const emailInputMode: "email" = "email";
const passwordFieldType: "password" = "password";
const submitType: "submit" = "submit";
const panelHeadingLevel: HeadingLevel = 2;
const alternativesHeadingLevel: HeadingLevel = 2;
const cardHeadingSize: "card" = "card";
const smallSize: "small" = "small";
const accentTone: "accent" = "accent";
const warningTone: "warning" = "warning";
const successTone: "success" = "success";
const quietVariant: "quiet" = "quiet";
const secondaryVariant: "secondary" = "secondary";

/**
 * メールアドレス欄の子コンポーネントから通知された値を一時状態へ反映する。
 * @param value 子コンポーネントがemitした現在の入力値。
 * @returns 戻り値はなく、画面内だけで保持するメールアドレス入力値を更新する。
 */
function updateEmailInput(value: string): void {
  emailInput.value = value;
}

/**
 * パスワード欄の子コンポーネントから通知された値を一時状態へ反映する。
 * @param value 子コンポーネントがemitした現在の入力値。
 * @returns 戻り値はなく、画面内だけで保持するパスワード入力値を更新する。
 */
function updatePasswordInput(value: string): void {
  passwordInput.value = value;
}

/**
 * 固定された体験用文字列だけをクリップボードへコピーする。
 * @param trainingValue 画面上に定義済みの体験用文字列。
 * @param successMessage コピー成功時の案内文。
 * @returns 完了を表すPromise。失敗時も入力内容は参照しない。
 */
async function copyTrainingValue(trainingValue: string, successMessage: string): Promise<void> {
  const writeResult: ClipboardWriteResult = await writeTrainingTextToClipboard(trainingValue);

  // コピーに成功した場合だけ成功文言を表示し、ブラウザー例外を画面へ直接渡さない。
  if (writeResult.isSuccessful) {
    copyStatus.value = successMessage;
    return;
  }
  copyStatus.value = translateError(writeResult.errorCode);
}

/**
 * 疑似送信をその場で終了し、入力を消去して種明かしへ進む。
 * @returns 戻り値はなく、通信・保存・検証をせず画面状態とルートだけを更新する。
 */
function handleSubmit(): void {
  emailInput.value = "";
  passwordInput.value = "";
  void router.push({ name: revealRoute });
}

/**
 * 子ボタンのクリック通知を受け、フォームの既定送信を止めて疑似送信処理を一度だけ実行する。
 * @param mouseEvent 子コンポーネントがemitしたクリックイベント。
 * @returns 戻り値はなく、既定送信を防止して疑似送信処理を呼び出す。
 */
function handleSubmitButtonClick(mouseEvent: MouseEvent): void {
  mouseEvent.preventDefault();
  handleSubmit();
}

/**
 * 入力を選んだ利用者へ最初の入力欄を示す。
 * @returns フォーカス移動の完了を表すPromise。
 */
async function focusFirstField(): Promise<void> {
  await nextTick();
  const field: HTMLElement | null = document.getElementById(emailFieldId);
  field?.focus();
}

/**
 * 安全な代替行動を選んだ理由を表示する。
 * @param explanation 選択した行動に対応する説明文。
 * @returns 戻り値はなく、ローカル表示状態だけを更新する。
 */
function chooseSafeAction(explanation: string): void {
  safeActionMessage.value = explanation;
}
</script>

<style scoped>
.login-view {
  display: grid;
  gap: 28px;
  margin: 0 auto;
  max-width: var(--content-standard);
}
.login-view-simulation {
  background: var(--color-ink);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-visual);
  overflow: hidden;
  padding: 0 14px 18px;
}
.login-view-browser-bar {
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  min-height: 54px;
}
.login-view-browser-dots {
  color: var(--color-muted-light);
  font-size: 10px;
  letter-spacing: 4px;
}
.login-view-address {
  background: var(--color-ink-soft);
  border-radius: var(--radius-small);
  color: var(--color-on-dark);
  font-size: 13px;
  overflow: hidden;
  padding: 8px 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.login-view-panel {
  background: var(--color-cloud-page);
  border-radius: var(--radius-medium);
  display: grid;
  gap: 22px;
  margin: 0 auto;
  max-width: 560px;
  padding: 40px;
}
.login-view-demo-account {
  background: var(--color-surface);
  border: var(--border-width) dashed var(--color-cloud);
  border-radius: var(--radius-medium);
  display: grid;
  gap: 10px;
  padding: 16px;
}
.login-view-credential-row {
  align-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr auto;
}
.login-view-credential {
  background: var(--color-surface-soft);
  border-radius: 6px;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  padding: 9px;
}
.login-view-form,
.login-view-alternatives {
  display: grid;
  gap: 18px;
}
.login-view-alternative-actions {
  display: grid;
  gap: 10px;
}
@media (max-width: 600px) {
  .login-view-browser-bar {
    grid-template-columns: 1fr;
    padding: 10px 0;
  }
  .login-view-browser-dots {
    display: none;
  }
  .login-view-panel {
    padding: 24px 18px;
  }
  .login-view-credential-row {
    grid-template-columns: 1fr;
  }
}
</style>
