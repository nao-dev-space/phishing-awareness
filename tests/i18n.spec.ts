import { describe, expect, it } from "vitest";
import {
  APP_NAME,
  BASIC_ACTIONS,
  MAIL_CHOICES,
  SUSPICIOUS_POINTS,
  TRAINING_ACCOUNT,
} from "@/config/content";
import { translateMessage } from "@/i18n";

describe("日本語ロケール", (): void => {
  it("主要な表示文言をVue I18nのJSONメッセージから取得する", (): void => {
    expect(APP_NAME).toBe("そのログイン、本物ですか？");
    expect(translateMessage("mail.choiceTitle")).toBe("次の行動を選んでください");
    expect(MAIL_CHOICES).toHaveLength(3);
  });

  it("体験用アカウントと疑似メールの記号を正しく保持する", (): void => {
    expect(TRAINING_ACCOUNT.email).toBe("demo-user@example.test");
    expect(translateMessage("mail.sender")).toContain("notice@cloud-letter-alert.example");
    expect(SUSPICIOUS_POINTS).toHaveLength(5);
    expect(BASIC_ACTIONS).toHaveLength(7);
  });

  it("完全なキーパスと名前付きパラメーターから表示文言を取得する", (): void => {
    const questionCount: string = translateMessage("quiz.questionCount", {
      current: 2,
      total: 5,
    });

    expect(questionCount).toBe("問題 2 / 5");
  });
});
