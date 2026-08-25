import { flushPromises, mount, type DOMWrapper, type VueWrapper } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import LoginView from "@/views/LoginView.vue";
import RevealView from "@/views/RevealView.vue";
import { createContent, type AppContent } from "@/config/content";
import { i18n, translateMessage } from "@/i18n";

const content: AppContent = createContent(translateMessage);

/** テスト専用ルーターを生成する。@returns 疑似ログインと種明かしを持つメモリルーター。 */
function createTestRouter(): Router {
  const router: Router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { name: "experience-login", path: "/experience/login", component: LoginView },
      { name: "experience-reveal", path: "/experience/reveal", component: RevealView },
    ],
  });
  return router;
}

/**
 * Vue Wrapperで見つけた要素が入力欄であることを実行時に検証する。
 * @param wrapper 疑似ログイン画面をmountしたVue Wrapper。
 * @param inputIndex 取得する入力欄のゼロ始まり位置。
 * @returns 検証済みのHTMLInputElement。
 * @throws 指定位置に入力欄がない場合はテスト構成不備を表すErrorを送出する。
 */
function getInputElement(wrapper: VueWrapper, inputIndex: number): HTMLInputElement {
  const inputElement: Element | undefined = wrapper.findAll("input")[inputIndex]?.element;

  // テスト対象のDOM構造を検証し、型アサーションで誤った要素を入力欄として扱うことを防ぐ。
  if (!(inputElement instanceof HTMLInputElement)) {
    throw new Error("Expected login input element was not found.");
  }
  return inputElement;
}

/**
 * DOM Wrapper一覧から指定位置の要素を取得し、欠測時はテスト構成不備として停止する。
 * @param wrappers Vue Test Utilsが返したDOM Wrapper一覧。
 * @param wrapperIndex 取得するゼロ始まり位置。
 * @returns 指定位置に存在するDOM Wrapper。
 * @throws 指定位置に要素が存在しない場合はErrorを送出する。
 */
function getDomWrapper(
  wrappers: readonly DOMWrapper<Element>[],
  wrapperIndex: number,
): DOMWrapper<Element> {
  const wrapper: DOMWrapper<Element> | undefined = wrappers[wrapperIndex];

  // テスト操作前に要素数を検証し、存在しないWrapperへの操作を防ぐ。
  if (!wrapper) {
    throw new Error("Expected DOM wrapper was not found.");
  }
  return wrapper;
}

describe("疑似ログインの安全性", (): void => {
  beforeEach((): void => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "existing-cookie=unchanged";
  });

  it("入力を送信・保存せず、消去して種明かしへ遷移する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push({ name: "experience-login" });
    await router.isReady();
    const wrapper: VueWrapper = mount(LoginView, {
      global: { plugins: [router, i18n] },
      attachTo: document.body,
    });
    const fetchSpy: MockInstance<typeof globalThis.fetch> = vi.spyOn(globalThis, "fetch");
    const xhrSendSpy: MockInstance<typeof XMLHttpRequest.prototype.send> = vi.spyOn(
      XMLHttpRequest.prototype,
      "send",
    );
    const storageSnapshot: string = JSON.stringify({
      local: { ...localStorage },
      session: { ...sessionStorage },
    });
    const cookieSnapshot: string = document.cookie;
    const inputs: ReturnType<VueWrapper["findAll"]> = wrapper.findAll("input");

    await getDomWrapper(inputs, 0).setValue("private-user@example.com");
    await getDomWrapper(inputs, 1).setValue("private-password");
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSendSpy).not.toHaveBeenCalled();
    expect(JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } })).toBe(
      storageSnapshot,
    );
    expect(document.cookie).toBe(cookieSnapshot);
    expect(getInputElement(wrapper, 0).value).toBe("");
    expect(getInputElement(wrapper, 1).value).toBe("");
    expect(router.currentRoute.value.name).toBe("experience-reveal");
  });

  it("一括入力操作では固定された体験用情報だけをフォームへ設定する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    const wrapper: VueWrapper = mount(LoginView, { global: { plugins: [router, i18n] } });
    const autofillButtons: ReturnType<VueWrapper["findAll"]> = wrapper
      .findAll("button")
      .filter((button): boolean => button.text().includes("体験用情報を入力"));
    const autofillButton: DOMWrapper<Element> = getDomWrapper(autofillButtons, 0);

    await autofillButton.trigger("click");

    expect(getInputElement(wrapper, 0).value).toBe(content.trainingAccount.email);
    expect(getInputElement(wrapper, 1).value).toBe(content.trainingAccount.password);
    expect(wrapper.text()).toContain("体験用のメールアドレスとパスワードを入力しました。");
  });
});
