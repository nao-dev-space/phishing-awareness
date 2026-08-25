<template>
  <div class="login-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <NoticeBox
      :title="t(MESSAGE_KEYS.warningTitle)"
      :message="content.realCredentialWarning"
      tone="warning"
      is-alert
    />
    <div class="login-view-simulation">
      <div class="login-view-browser-bar">
        <div class="login-view-browser-dots" aria-hidden="true">
          {{ t(MESSAGE_KEYS.browserDots) }}
        </div>
        <div class="login-view-address">{{ t(MESSAGE_KEYS.fakeAddress) }}</div>
      </div>
      <div class="login-view-panel">
        <CloudLetterLogo
          :service-name="content.serviceName"
          :accessible-label="t(MESSAGE_KEYS.logoLabel)"
          :mark="t(MESSAGE_KEYS.logoMark)"
        />
        <AppHeading :level="2" :text="t(MESSAGE_KEYS.panelTitle)" size="card" />
        <form
          :class="['login-view-form', { 'login-view-form-autofilled': hasAutofilled }]"
          autocomplete="off"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <AppFormField
            :id="emailFieldId"
            v-model="emailInput"
            name="training-user-identifier"
            :label="t(MESSAGE_KEYS.emailLabel)"
            inputmode="email"
          />
          <AppFormField
            id="training-secret-phrase"
            v-model="passwordInput"
            name="training-secret-phrase"
            :label="t(MESSAGE_KEYS.passwordLabel)"
            type="password"
            autocomplete="new-password"
          />
          <div class="login-view-autofill">
            <AppButton
              :label="t(MESSAGE_KEYS.autofillLabel)"
              variant="secondary"
              @click="fillTrainingAccount"
            />
            <AppText :text="autofillStatus" size="small" role="status" aria-live="polite" />
          </div>
          <AppButton :label="t(MESSAGE_KEYS.loginLabel)" type="submit" />
        </form>
      </div>
    </div>
    <div class="login-view-alternatives">
      <AppHeading :level="2" :text="t(MESSAGE_KEYS.alternativesTitle)" />
      <AppText :text="t(MESSAGE_KEYS.alternativesDescription)" />
      <div class="login-view-alternative-actions">
        <AppButton
          :label="t(MESSAGE_KEYS.enterChoiceLabel)"
          variant="secondary"
          @click="focusFirstField"
        />
        <AppButton
          :label="t(MESSAGE_KEYS.checkUrlLabel)"
          variant="secondary"
          @click="chooseSafeAction(MESSAGE_KEYS.checkUrlExplanation)"
        />
        <AppButton
          :label="t(MESSAGE_KEYS.officialSiteLabel)"
          variant="secondary"
          @click="chooseSafeAction(MESSAGE_KEYS.officialSiteExplanation)"
        />
      </div>
      <NoticeBox
        v-if="safeActionMessage"
        :title="t(MESSAGE_KEYS.safeChoiceTitle)"
        :message="safeActionMessage"
        tone="success"
      />
      <RouteAction
        v-if="safeActionMessage"
        :label="t(MESSAGE_KEYS.revealLabel)"
        :route-name="REVEAL_ROUTE_NAME"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, type ComputedRef, type Ref } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import { useRouter, type Router } from "vue-router";
import AppButton from "@/components/atoms/AppButton.vue";
import AppFormField from "@/components/atoms/AppFormField.vue";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppText from "@/components/atoms/AppText.vue";
import CloudLetterLogo from "@/components/atoms/CloudLetterLogo.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import type { AppContent } from "@/config/content";
import { REVEAL_ROUTE_NAME } from "@/config/routes";

interface LoginMessageKeys {
  readonly alternativesDescription: string;
  readonly alternativesTitle: string;
  readonly autofilled: string;
  readonly autofillLabel: string;
  readonly browserDots: string;
  readonly checkUrlExplanation: string;
  readonly checkUrlLabel: string;
  readonly description: string;
  readonly emailLabel: string;
  readonly enterChoiceLabel: string;
  readonly eyebrow: string;
  readonly fakeAddress: string;
  readonly loginLabel: string;
  readonly logoLabel: string;
  readonly logoMark: string;
  readonly officialSiteExplanation: string;
  readonly officialSiteLabel: string;
  readonly panelTitle: string;
  readonly passwordLabel: string;
  readonly revealLabel: string;
  readonly safeChoiceTitle: string;
  readonly title: string;
  readonly warningTitle: string;
}

const MESSAGE_KEYS: LoginMessageKeys = {
  alternativesDescription: "login.alternativesDescription",
  alternativesTitle: "login.alternativesTitle",
  autofilled: "login.autofilled",
  autofillLabel: "login.autofill",
  browserDots: "visuals.browserDots",
  checkUrlExplanation: "login.checkUrlExplanation",
  checkUrlLabel: "login.checkUrl",
  description: "login.description",
  emailLabel: "login.emailLabel",
  enterChoiceLabel: "login.enter",
  eyebrow: "login.eyebrow",
  fakeAddress: "login.fakeAddress",
  loginLabel: "login.login",
  logoLabel: "login.logoLabel",
  logoMark: "visuals.envelope",
  officialSiteExplanation: "login.officialSiteExplanation",
  officialSiteLabel: "login.officialSite",
  panelTitle: "login.panelTitle",
  passwordLabel: "login.passwordLabel",
  revealLabel: "login.reveal",
  safeChoiceTitle: "login.safeChoiceTitle",
  title: "login.title",
  warningTitle: "login.warningTitle",
};
const router: Router = useRouter();
const { t }: Composer = useI18n();
const content: ComputedRef<AppContent> = useContent();
const emailInput: Ref<string> = ref("");
const passwordInput: Ref<string> = ref("");
const autofillStatus: Ref<string> = ref("");
const hasAutofilled: Ref<boolean> = ref(false);
const safeActionMessage: Ref<string> = ref("");
const emailFieldId: string = "training-user-identifier";

/** 固定された体験用アカウントだけを疑似ログインフォームへ入力する。 */
async function fillTrainingAccount(): Promise<void> {
  hasAutofilled.value = false;
  emailInput.value = content.value.trainingAccount.email;
  passwordInput.value = content.value.trainingAccount.password;
  autofillStatus.value = t(MESSAGE_KEYS.autofilled);
  await nextTick();
  hasAutofilled.value = true;
}

/** 疑似送信をその場で終了し、入力を消去して種明かしへ進む。 */
function handleSubmit(): void {
  emailInput.value = "";
  passwordInput.value = "";
  void router.push({ name: REVEAL_ROUTE_NAME });
}

/** 入力を選んだ利用者へ最初の入力欄を示す。 */
async function focusFirstField(): Promise<void> {
  await nextTick();
  const field: HTMLElement | null = document.getElementById(emailFieldId);
  field?.focus();
}

/** 安全な代替行動を選んだ理由を表示する。 */
function chooseSafeAction(explanationMessageKey: string): void {
  safeActionMessage.value = t(explanationMessageKey);
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
  box-shadow: var(--shadow-card-prominent);
  overflow: hidden;
  padding: 0 var(--space-4) var(--space-5);
}
.login-view-browser-bar {
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  min-height: var(--space-14);
}
.login-view-browser-dots {
  color: var(--color-muted-light);
  font-size: var(--font-size-browser-chrome);
  letter-spacing: 4px;
}
.login-view-address {
  background: var(--color-ink-soft);
  border-radius: var(--radius-small);
  color: var(--color-on-dark);
  font-size: var(--font-size-caption);
  overflow: hidden;
  padding: 8px 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.login-view-panel {
  background: var(--color-cloud-page);
  border-radius: var(--radius-medium);
  display: grid;
  gap: var(--space-6);
  margin: 0 auto;
  max-width: 560px;
  padding: 40px;
}
.login-view-autofill {
  display: grid;
  gap: var(--space-2);
}
.login-view-form-autofilled :deep(.form-field-input) {
  animation: login-view-autofill-highlight var(--motion-medium);
}
.login-view-form,
.login-view-alternatives {
  display: grid;
  gap: var(--space-5);
}
.login-view-alternative-actions {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
@media (max-width: 700px) {
  .login-view-alternative-actions {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .login-view-browser-bar {
    grid-template-columns: 1fr;
    padding: var(--space-3) 0;
  }
  .login-view-browser-dots {
    display: none;
  }
  .login-view-panel {
    padding: var(--space-6) var(--space-4);
  }
}
@keyframes login-view-autofill-highlight {
  from {
    background: var(--color-primary-soft);
    border-color: var(--color-primary);
  }
  to {
    background: var(--color-surface);
    border-color: var(--color-border-strong);
  }
}
</style>
