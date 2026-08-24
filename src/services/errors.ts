import { CLIPBOARD_WRITE_FAILED, type AppErrorCode } from "@/config/errorCodes";

const CLIPBOARD_WRITE_FAILED_MESSAGE_KEY: string = "errors.CLIPBOARD_WRITE_FAILED";

const ERROR_MESSAGE_KEYS: Readonly<Record<AppErrorCode, string>> = {
  [CLIPBOARD_WRITE_FAILED]: CLIPBOARD_WRITE_FAILED_MESSAGE_KEY,
};

/** 安定したアプリケーションエラーコードを完全な翻訳キーパスへ変換する。 */
export function getErrorMessageKey(errorCode: AppErrorCode): string {
  const messageKey: string = ERROR_MESSAGE_KEYS[errorCode];
  return messageKey;
}
