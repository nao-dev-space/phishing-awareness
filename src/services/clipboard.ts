import { CLIPBOARD_WRITE_FAILED, type AppErrorCode } from "@/config/errorCodes";

export type ClipboardWriteResult =
  | { readonly errorCode: null; readonly isSuccessful: true }
  | { readonly errorCode: AppErrorCode; readonly isSuccessful: false };

/** 画面で明示された体験用文字列をブラウザーのクリップボードへコピーする。 */
export async function writeTrainingTextToClipboard(
  trainingText: string,
): Promise<ClipboardWriteResult> {
  // Clipboard APIは権限やブラウザー環境によって失敗するため、内部例外を画面へ漏らさず安定したコードへ変換する。
  try {
    await navigator.clipboard.writeText(trainingText);
    const successfulResult: ClipboardWriteResult = { errorCode: null, isSuccessful: true };
    return successfulResult;
  } catch {
    // 失敗原因の内部情報を利用者へ漏らさず、画面が扱える公開コードへ統一する。
    const failedResult: ClipboardWriteResult = {
      errorCode: CLIPBOARD_WRITE_FAILED,
      isSuccessful: false,
    };
    return failedResult;
  }
}
