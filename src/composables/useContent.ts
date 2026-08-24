import { computed, type ComputedRef } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import { createContent, type AppContent, type ContentTranslator } from "@/config/content";

/** 現在のロケールに追従する構造化コンテンツを提供する。 */
export function useContent(): ComputedRef<AppContent> {
  const { t }: Composer = useI18n();
  const translate: ContentTranslator = (
    messageKey: string,
    parameters?: Readonly<Record<string, string | number>>,
  ): string => (parameters ? t(messageKey, parameters) : t(messageKey));

  const content: ComputedRef<AppContent> = computed((): AppContent => createContent(translate));
  return content;
}
