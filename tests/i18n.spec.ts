import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, nextTick, type ComputedRef, type DefineComponent } from "vue";
import { createI18n } from "vue-i18n";
import { describe, expect, it } from "vitest";
import { useContent } from "@/composables/useContent";
import { createContent, type AppContent } from "@/config/content";
import { translateMessage } from "@/i18n";
import jaMessages from "@/i18n/locales/ja.json";

const content: AppContent = createContent(translateMessage);

describe("日本語ロケール", (): void => {
  it("主要な表示文言をVue I18nのJSONメッセージから取得する", (): void => {
    expect(content.appName).toBe("そのログイン、本物ですか？");
    expect(translateMessage("mail.choiceTitle")).toBe("次の行動を選んでください");
    expect(content.mailChoices).toHaveLength(3);
  });

  it("表示専用の架空認証情報と疑似メールの記号を正しく保持する", (): void => {
    expect(content.trainingCredentialPreview.email).toBe("demo-user@example.test");
    expect(content.trainingCredentialPreview.passwordMask).toBe("••••••••••••");
    expect(translateMessage("mail.sender")).toContain("notice@cloud-letter-alert.example");
    expect(content.suspiciousPoints).toHaveLength(5);
    expect(content.basicActions).toHaveLength(7);
  });

  it("完全なキーパスと名前付きパラメーターから表示文言を取得する", (): void => {
    const questionCount: string = translateMessage("quiz.questionCount", {
      current: 2,
      total: 5,
    });

    expect(questionCount).toBe("問題 2 / 5");
  });

  it("ロケール変更時に構造化コンテンツを再翻訳する", async (): Promise<void> => {
    const alternateMessages: typeof jaMessages = {
      ...jaMessages,
      app: { ...jaMessages.app, name: "Alternate application name" },
    };
    const localI18n = createI18n({
      legacy: false,
      locale: "ja",
      messages: { alternate: alternateMessages, ja: jaMessages },
    });
    const ContentProbe: DefineComponent = defineComponent({
      setup(): { content: ComputedRef<AppContent> } {
        const localizedContent = useContent();
        return { content: localizedContent };
      },
      template: "<p>{{ content.appName }}</p>",
    });
    const wrapper: VueWrapper = mount(ContentProbe, { global: { plugins: [localI18n] } });

    expect(wrapper.text()).toBe("そのログイン、本物ですか？");
    localI18n.global.locale.value = "alternate";
    await nextTick();

    expect(wrapper.text()).toBe("Alternate application name");
  });
});
