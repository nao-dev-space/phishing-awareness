<template>
  <div :class="['notice-box', `notice-box-${tone}`]" :role="role">
    <div class="notice-box-icon" aria-hidden="true">{{ icon }}</div>
    <div class="notice-box-content">
      <AppText :text="title" :tone="titleTone" />
      <AppText :text="message" :size="messageSize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import AppText, { type TextTone } from "@/components/atoms/AppText.vue";
import { translateMessage } from "@/i18n";

type NoticeTone = "info" | "warning" | "success";

interface Props {
  readonly title: string;
  readonly message: string;
  readonly tone?: NoticeTone;
  readonly isAlert?: boolean;
}

const props: Props = withDefaults(defineProps<Props>(), { tone: "info", isAlert: false });
const INFORMATION_ICON_MESSAGE_KEY: string = "visuals.information";
const WARNING_ICON_MESSAGE_KEY: string = "visuals.warning";
const SUCCESS_ICON_MESSAGE_KEY: string = "visuals.checkmark";
const icons: Readonly<Record<NoticeTone, string>> = {
  info: translateMessage(INFORMATION_ICON_MESSAGE_KEY),
  warning: translateMessage(WARNING_ICON_MESSAGE_KEY),
  success: translateMessage(SUCCESS_ICON_MESSAGE_KEY),
};
const titleTones: Readonly<Record<NoticeTone, TextTone>> = {
  info: "accent",
  warning: "warning",
  success: "success",
};
/**
 * 通知の種類に対応する装飾アイコンを取得する。
 * @returns 現在のtoneに対応する表示用アイコン。
 */
const icon: ComputedRef<string> = computed((): string => {
  const noticeIcon: string = icons[props.tone];
  return noticeIcon;
});

/**
 * 通知の種類に対応する見出し色を取得する。
 * @returns AppTextへ渡す見出し色の識別値。
 */
const titleTone: ComputedRef<TextTone> = computed((): TextTone => {
  const noticeTitleTone: TextTone = titleTones[props.tone];
  return noticeTitleTone;
});

/**
 * 即時通知の必要性に応じてアクセシビリティロールを選択する。
 * @returns 緊急通知ではalert、それ以外ではstatus。
 */
const role: ComputedRef<"alert" | "status"> = computed((): "alert" | "status" => {
  const noticeRole: "alert" | "status" = props.isAlert ? "alert" : "status";
  return noticeRole;
});
const messageSize: "small" = "small";
</script>

<style scoped>
.notice-box {
  align-items: flex-start;
  background: var(--color-info-soft);
  border: var(--border-width) solid var(--color-info);
  border-radius: var(--radius-medium);
  display: flex;
  gap: 13px;
  padding: 16px;
}
.notice-box-warning {
  background: var(--color-warning-soft);
  border-color: var(--color-warning);
}
.notice-box-success {
  background: var(--color-success-soft);
  border-color: var(--color-success);
}
.notice-box-icon {
  align-items: center;
  border: var(--border-width) solid currentcolor;
  border-radius: 50%;
  color: var(--color-primary-dark);
  display: flex;
  flex: 0 0 auto;
  font-weight: 800;
  height: 28px;
  justify-content: center;
  margin-top: 2px;
  width: 28px;
}
.notice-box-warning .notice-box-icon {
  color: var(--color-warning-ink);
}
.notice-box-success .notice-box-icon {
  color: var(--color-success-ink);
}
.notice-box-content {
  display: grid;
  gap: 3px;
}
</style>
