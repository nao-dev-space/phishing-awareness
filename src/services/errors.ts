import { CLIPBOARD_WRITE_FAILED, type AppErrorCode } from "@/config/errorCodes";
import { translateMessage } from "@/i18n";

const CLIPBOARD_WRITE_FAILED_MESSAGE_KEY: string = "errors.CLIPBOARD_WRITE_FAILED";

const ERROR_MESSAGE_KEYS: Readonly<Record<AppErrorCode, string>> = {
  [CLIPBOARD_WRITE_FAILED]: CLIPBOARD_WRITE_FAILED_MESSAGE_KEY,
};

/**
 * 安定したアプリケーションエラーコードを完全な翻訳キーパスへ変換する。
 * @param errorCode 利用者へ通知するエラー原因を表すコード。
 * @returns エラーコードに対応する完全な翻訳キーパス。
 */
export function getErrorMessageKey(errorCode: AppErrorCode): string {
  const messageKey: string = ERROR_MESSAGE_KEYS[errorCode];
  return messageKey;
}

/**
 * 安定したエラーコードから、次の操作を含む利用者向け文言を取得する。
 * @param errorCode 利用者へ通知するエラー原因を表すコード。
 * @returns 現在のロケールで翻訳されたエラーメッセージ。
 */
export function translateError(errorCode: AppErrorCode): string {
  const messageKey: string = getErrorMessageKey(errorCode);
  const translatedError: string = translateMessage(messageKey);
  return translatedError;
}
