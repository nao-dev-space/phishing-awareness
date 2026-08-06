import { createI18n, type VueMessageType } from "vue-i18n";
import jaMessages from "@/i18n/locales/ja.json";

export const i18n = createI18n({
  legacy: false,
  locale: "ja",
  fallbackLocale: "ja",
  messages: { ja: jaMessages },
});

type MessageGroups = typeof jaMessages;

/**
 * Vue I18nから型付きの文言グループを取得する。
 * @param key 日本語ロケールJSONの最上位キー。
 * @returns 指定したキーに対応する文言または構造化文言。
 */
export function messageGroup<Key extends keyof MessageGroups>(key: Key): MessageGroups[Key] {
  return i18n.global.tm(key) as MessageGroups[Key] & VueMessageType;
}
