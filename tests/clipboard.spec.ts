import { describe, expect, it, vi, type Mock } from "vitest";
import { CLIPBOARD_WRITE_FAILED } from "@/config/errorCodes";
import { translateMessage } from "@/i18n";
import { writeTrainingTextToClipboard, type ClipboardWriteResult } from "@/services/clipboard";
import { getErrorMessageKey } from "@/services/errors";

type ClipboardWrite = (clipboardText: string) => Promise<void>;

describe("クリップボードサービス", (): void => {
  it("体験用文字列のコピー成功を安定した結果で返す", async (): Promise<void> => {
    const writeText: Mock<ClipboardWrite> = vi.fn<ClipboardWrite>().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });

    const writeResult: ClipboardWriteResult = await writeTrainingTextToClipboard("training-value");

    expect(writeText).toHaveBeenCalledWith("training-value");
    expect(writeResult).toEqual({ errorCode: null, isSuccessful: true });
  });

  it("ブラウザー例外を安定したコードと利用者向け文言へ変換する", async (): Promise<void> => {
    const clipboardError: Error = new Error("permission denied");
    const writeText: Mock<ClipboardWrite> = vi
      .fn<ClipboardWrite>()
      .mockRejectedValue(clipboardError);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });

    const writeResult: ClipboardWriteResult = await writeTrainingTextToClipboard("training-value");

    expect(writeResult).toEqual({
      errorCode: CLIPBOARD_WRITE_FAILED,
      isSuccessful: false,
    });
    const errorMessageKey: string = getErrorMessageKey(CLIPBOARD_WRITE_FAILED);
    expect(errorMessageKey).toBe("errors.CLIPBOARD_WRITE_FAILED");
    expect(translateMessage(errorMessageKey)).toContain("表示された体験用情報");
  });
});
