<template>
  <div :class="['notice-box', `notice-box-${tone}`]" :role="role">
    <div class="notice-box-icon" aria-hidden="true">{{ icon }}</div>
    <div class="notice-box-content">
      <AppText :text="title" :tone="titleTone" />
      <AppText :text="message" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import AppText, { type TextTone } from "@/components/atoms/AppText.vue";

type NoticeTone = "info" | "warning" | "success";

/** 通知ボックスの内容と通知種別を指定するプロパティを表す。 */
interface Props {
  readonly title: string;
  readonly message: string;
  readonly tone?: NoticeTone;
  readonly isAlert?: boolean;
}

const props: Props = withDefaults(defineProps<Props>(), { tone: "info", isAlert: false });
const { t }: Composer = useI18n();
const iconMessageKeys: Readonly<Record<NoticeTone, string>> = {
  info: "visuals.information",
  warning: "visuals.warning",
  success: "visuals.checkmark",
};
const titleTones: Readonly<Record<NoticeTone, TextTone>> = {
  info: "accent",
  warning: "warning",
  success: "success",
};
/** 通知の種類に対応する装飾アイコンを取得する。 */
const icon = computed((): string => {
  const noticeIcon: string = t(iconMessageKeys[props.tone]);
  return noticeIcon;
});

/** 通知の種類に対応する見出し色を取得する。 */
const titleTone = computed((): TextTone => {
  const noticeTitleTone: TextTone = titleTones[props.tone];
  return noticeTitleTone;
});

/** 即時通知の必要性に応じてアクセシビリティロールを選択する。 */
const role = computed((): "alert" | "status" => {
  const noticeRole: "alert" | "status" = props.isAlert ? "alert" : "status";
  return noticeRole;
});
</script>

<style scoped>
.notice-box {
  align-items: flex-start;
  background: var(--color-info-soft);
  border: var(--border-width) solid var(--color-info);
  border-radius: var(--radius-medium);
  display: flex;
  gap: var(--space-3);
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
  gap: var(--space-1);
}
</style>
