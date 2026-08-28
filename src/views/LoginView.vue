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
      :tone="NOTICE_TONES.WARNING"
      :is-alert="NOTICE_ANNOUNCEMENT_MODES.IMMEDIATE"
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
        <template v-if="simulationState === LOGIN_SIMULATION_STATES.AWAITING_ACTION">
          <AppHeading
            :level="HEADING_LEVELS.TWO"
            :text="t(MESSAGE_KEYS.panelTitle)"
            :size="HEADING_SIZES.CARD"
          />
          <div
            class="login-view-credential-preview"
            role="group"
            :aria-label="t(MESSAGE_KEYS.previewLabel)"
          >
            <div class="login-view-credential-row">
              <div class="login-view-credential-label">{{ t(MESSAGE_KEYS.emailLabel) }}</div>
              <div :class="getCredentialValueClasses()">
                {{
                  hasSimulatedCredentials
                    ? content.trainingCredentialPreview.email
                    : t(MESSAGE_KEYS.emptyValue)
                }}
              </div>
            </div>
            <div class="login-view-credential-row">
              <div class="login-view-credential-label">{{ t(MESSAGE_KEYS.passwordLabel) }}</div>
              <div
                :class="getCredentialValueClasses(IS_PASSWORD_FIELD)"
                :aria-label="
                  hasSimulatedCredentials
                    ? t(MESSAGE_KEYS.passwordMaskLabel)
                    : t(MESSAGE_KEYS.emptyValue)
                "
              >
                <span aria-hidden="true">
                  {{
                    hasSimulatedCredentials
                      ? content.trainingCredentialPreview.passwordMask
                      : t(MESSAGE_KEYS.emptyValue)
                  }}
                </span>
              </div>
            </div>
          </div>
          <AppText
            :text="t(MESSAGE_KEYS.previewDescription)"
            :size="TEXT_SIZES.SMALL"
            :tone="TEXT_TONES.MUTED"
          />
          <div ref="credentialActionContainer" :class="getCredentialActionClasses()">
            <AppButton
              :label="t(MESSAGE_KEYS.fillCredentialsLabel)"
              :variant="BUTTON_VARIANTS.SECONDARY"
              :aria-describedby="shouldPromptCredentials ? CREDENTIAL_PROMPT_ID : undefined"
              @click="fillSimulatedCredentials"
            />
          </div>
          <p
            v-if="shouldPromptCredentials"
            :id="CREDENTIAL_PROMPT_ID"
            class="login-view-credential-prompt"
            role="alert"
          >
            {{ t(MESSAGE_KEYS.credentialPrompt) }}
          </p>
          <p class="login-view-simulation-status" aria-live="polite">
            {{ hasSimulatedCredentials ? t(MESSAGE_KEYS.credentialsFilled) : "" }}
          </p>
          <AppButton :label="t(MESSAGE_KEYS.continueLabel)" @click="continueSimulation" />
        </template>
        <div v-else class="login-view-progress" role="status" aria-live="polite">
          <span
            v-if="simulationState === LOGIN_SIMULATION_STATES.CHECKING_CREDENTIALS"
            class="login-view-spinner"
            aria-hidden="true"
          ></span>
          <span v-else class="login-view-progress-check" aria-hidden="true">{{
            t(MESSAGE_KEYS.checkmark)
          }}</span>
          <AppHeading
            :level="HEADING_LEVELS.TWO"
            :text="
              t(
                simulationState === LOGIN_SIMULATION_STATES.CHECKING_CREDENTIALS
                  ? MESSAGE_KEYS.checkingTitle
                  : MESSAGE_KEYS.confirmedTitle,
              )
            "
            :size="HEADING_SIZES.CARD"
          />
          <AppText
            :text="
              t(
                simulationState === LOGIN_SIMULATION_STATES.CHECKING_CREDENTIALS
                  ? MESSAGE_KEYS.checkingDescription
                  : MESSAGE_KEYS.confirmedDescription,
              )
            "
            :tone="TEXT_TONES.MUTED"
          />
        </div>
      </div>
    </div>
    <div
      v-if="simulationState === LOGIN_SIMULATION_STATES.AWAITING_ACTION"
      class="login-view-alternatives"
    >
      <AppHeading :level="HEADING_LEVELS.TWO" :text="t(MESSAGE_KEYS.alternativesTitle)" />
      <AppText :text="t(MESSAGE_KEYS.alternativesDescription)" />
      <div class="login-view-alternative-actions">
        <AppButton
          :label="t(MESSAGE_KEYS.enterChoiceLabel)"
          :variant="BUTTON_VARIANTS.SECONDARY"
          @click="continueSimulation"
        />
        <AppButton
          :label="t(MESSAGE_KEYS.checkUrlLabel)"
          :variant="BUTTON_VARIANTS.SECONDARY"
          @click="chooseSafeAction(MESSAGE_KEYS.checkUrlExplanation)"
        />
        <AppButton
          :label="t(MESSAGE_KEYS.officialSiteLabel)"
          :variant="BUTTON_VARIANTS.SECONDARY"
          @click="chooseSafeAction(MESSAGE_KEYS.officialSiteExplanation)"
        />
      </div>
      <NoticeBox
        v-if="safeActionMessage"
        :title="t(MESSAGE_KEYS.safeChoiceTitle)"
        :message="safeActionMessage"
        :tone="NOTICE_TONES.SUCCESS"
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
import { nextTick, onBeforeUnmount, ref, type Ref } from "vue";
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
import { CHECKPOINT_ROUTE_NAME, REVEAL_ROUTE_NAME } from "@/config/routes";
import {
  BUTTON_VARIANTS,
  HEADING_LEVELS,
  HEADING_SIZES,
  NOTICE_ANNOUNCEMENT_MODES,
  NOTICE_TONES,
  TEXT_SIZES,
  TEXT_TONES,
} from "@/config/ui";

/** 疑似ログインの進行段階を表す。 */
const LOGIN_SIMULATION_STATES = {
  AWAITING_ACTION: "idle",
  CHECKING_CREDENTIALS: "checking",
  CONFIRMED: "confirmed",
} as const;

type SimulationState = (typeof LOGIN_SIMULATION_STATES)[keyof typeof LOGIN_SIMULATION_STATES];

/** 疑似ログイン画面に表示する各文言の翻訳キーを表す。 */
const MESSAGE_KEYS = {
  alternativesDescription: "login.alternativesDescription",
  alternativesTitle: "login.alternativesTitle",
  browserDots: "visuals.browserDots",
  checkingDescription: "login.checkingDescription",
  checkingTitle: "login.checkingTitle",
  checkUrlExplanation: "login.checkUrlExplanation",
  checkUrlLabel: "login.checkUrl",
  checkmark: "visuals.checkmark",
  confirmedDescription: "login.confirmedDescription",
  confirmedTitle: "login.confirmedTitle",
  continueLabel: "login.continue",
  credentialPrompt: "login.credentialPrompt",
  credentialsFilled: "login.credentialsFilled",
  description: "login.description",
  emailLabel: "login.emailLabel",
  emptyValue: "login.emptyValue",
  enterChoiceLabel: "login.enter",
  eyebrow: "login.eyebrow",
  fakeAddress: "login.fakeAddress",
  fillCredentialsLabel: "login.fillCredentials",
  logoLabel: "login.logoLabel",
  logoMark: "visuals.envelope",
  officialSiteExplanation: "login.officialSiteExplanation",
  officialSiteLabel: "login.officialSite",
  panelTitle: "login.panelTitle",
  passwordMaskLabel: "login.passwordMaskLabel",
  passwordLabel: "login.passwordLabel",
  previewDescription: "login.previewDescription",
  previewLabel: "login.previewLabel",
  revealLabel: "login.reveal",
  safeChoiceTitle: "login.safeChoiceTitle",
  title: "login.title",
  warningTitle: "login.warningTitle",
} as const;
const router: Router = useRouter();
const { t }: Composer = useI18n();
const content = useContent();
const safeActionMessage: Ref<string> = ref("");
const hasSimulatedCredentials: Ref<boolean> = ref(false);
const shouldPromptCredentials: Ref<boolean> = ref(false);
const simulationState: Ref<SimulationState> = ref(LOGIN_SIMULATION_STATES.AWAITING_ACTION);
const credentialActionContainer: Ref<HTMLElement | null> = ref(null);
const CREDENTIAL_PROMPT_ID: string = "login-credential-prompt";
const IS_PASSWORD_FIELD: boolean = true;
const SIMULATION_STAGE_DURATION_MS: number = 2000;
let checkingTimer: ReturnType<typeof setTimeout> | undefined;
let confirmedTimer: ReturnType<typeof setTimeout> | undefined;

/** 認証情報の表示状態とパスワード表示に対応するクラスを取得する。 */
function getCredentialValueClasses(isPassword: boolean = false): string[] {
  const classes: string[] = ["login-view-credential-value"];
  if (isPassword) {
    classes.push("login-view-password-mask");
  }
  if (!hasSimulatedCredentials.value) {
    classes.push("login-view-credential-value-empty");
  }
  return classes;
}

/** 疑似入力の案内状態に対応するボタン領域のクラスを取得する。 */
function getCredentialActionClasses(): string[] {
  const classes: string[] = ["login-view-credential-action"];
  if (shouldPromptCredentials.value) {
    classes.push("login-view-credential-action-required");
  }
  return classes;
}

/** 固定された架空の認証情報を画面上だけに表示する。 */
function fillSimulatedCredentials(): void {
  hasSimulatedCredentials.value = true;
  shouldPromptCredentials.value = false;
}

/** 疑似認証の処理中表示を開始し、中間画面まで順に進める。 */
async function continueSimulation(): Promise<void> {
  if (simulationState.value !== LOGIN_SIMULATION_STATES.AWAITING_ACTION) {
    return;
  }
  if (!hasSimulatedCredentials.value) {
    shouldPromptCredentials.value = true;
    await nextTick();
    credentialActionContainer.value?.querySelector<HTMLButtonElement>("button")?.focus();
    return;
  }

  simulationState.value = LOGIN_SIMULATION_STATES.CHECKING_CREDENTIALS;
  checkingTimer = setTimeout((): void => {
    simulationState.value = LOGIN_SIMULATION_STATES.CONFIRMED;
    confirmedTimer = setTimeout((): void => {
      hasSimulatedCredentials.value = false;
      router.push({ name: CHECKPOINT_ROUTE_NAME });
    }, SIMULATION_STAGE_DURATION_MS);
  }, SIMULATION_STAGE_DURATION_MS);
}

/** 安全な代替行動を選んだ理由を表示する。 */
function chooseSafeAction(explanationMessageKey: string): void {
  safeActionMessage.value = t(explanationMessageKey);
}

/** 画面離脱時に疑似情報の表示状態と待機中の遷移を破棄する。 */
function clearSimulation(): void {
  if (checkingTimer !== undefined) {
    clearTimeout(checkingTimer);
  }
  if (confirmedTimer !== undefined) {
    clearTimeout(confirmedTimer);
  }
  hasSimulatedCredentials.value = false;
}

onBeforeUnmount(clearSimulation);
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
.login-view-credential-preview {
  display: grid;
  gap: var(--space-3);
  margin: 0;
}
.login-view-credential-row {
  display: grid;
  gap: var(--space-2);
}
.login-view-credential-label {
  color: var(--color-ink);
  font-size: var(--font-size-label);
  font-weight: 750;
}
.login-view-credential-value {
  align-items: center;
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-small);
  color: var(--color-ink);
  display: flex;
  min-height: var(--control-min-height);
  margin: 0;
  overflow-wrap: anywhere;
  padding: var(--space-3);
}
.login-view-password-mask {
  letter-spacing: var(--space-1);
}
.login-view-credential-value-empty {
  color: var(--color-muted);
  font-style: italic;
  letter-spacing: normal;
}
.login-view-credential-action {
  border: var(--focus-ring-width) solid transparent;
  border-radius: var(--radius-medium);
  display: grid;
  margin: calc(var(--focus-ring-width) * -1);
  transition:
    background var(--motion-fast),
    border-color var(--motion-fast);
}
.login-view-credential-action-required {
  background: var(--color-focus-soft);
  border-color: var(--color-focus);
  padding: var(--space-2);
}
.login-view-credential-prompt {
  color: var(--color-warning-ink);
  font-size: var(--font-size-small);
  font-weight: 750;
  margin: 0;
}
.login-view-simulation-status {
  color: var(--color-success-ink);
  font-size: var(--font-size-small);
  min-height: var(--space-5);
  margin: 0;
}
.login-view-progress {
  display: grid;
  gap: var(--space-5);
  min-height: 320px;
  place-items: center;
  text-align: center;
}
.login-view-spinner {
  animation: login-view-spin 800ms linear infinite;
  border: var(--space-1) solid var(--color-cloud-soft);
  border-radius: 50%;
  border-top-color: var(--color-cloud);
  height: var(--space-12);
  width: var(--space-12);
}
.login-view-progress-check {
  align-items: center;
  background: var(--color-success-soft);
  border: var(--border-width) solid var(--color-success);
  border-radius: 50%;
  color: var(--color-success-ink);
  display: flex;
  font-size: var(--font-size-symbol-large);
  font-weight: 900;
  height: var(--space-18);
  justify-content: center;
  width: var(--space-18);
}
@keyframes login-view-spin {
  to {
    transform: rotate(360deg);
  }
}
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
</style>
