import { createI18n, type Composer, type I18n } from "vue-i18n";
import jaMessages from "@/i18n/locales/ja.json";

export type MessageParameters = Readonly<Record<string, string | number>>;

const DEFAULT_LOCALE: string = "ja";

export const i18n: I18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { ja: jaMessages },
});

/**
 * 完全な翻訳キーパスから利用者向け文言を取得する。
 * @param messageKey JSONに定義された、分割や連結をしていない完全なキーパス。
 * @param parameters 文言内の名前付きプレースホルダーへ渡す値。不要な場合は省略する。
 * @returns 現在のロケールで翻訳された文字列。
 */
export function translateMessage(messageKey: string, parameters?: MessageParameters): string {
  const composer: Composer = i18n.global;
  const translatedMessage: string = parameters
    ? composer.t(messageKey, parameters)
    : composer.t(messageKey);
  return translatedMessage;
}
