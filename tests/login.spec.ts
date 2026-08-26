import { flushPromises, mount, type DOMWrapper, type VueWrapper } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import CheckpointView from "@/views/CheckpointView.vue";
import LoginView from "@/views/LoginView.vue";
import RevealView from "@/views/RevealView.vue";
import { createContent, type AppContent } from "@/config/content";
import { i18n, translateMessage } from "@/i18n";

const content: AppContent = createContent(translateMessage);

/** 疑似ログインから種明かしまでを持つテスト用ルーターを生成する。 */
function createTestRouter(): Router {
  const router: Router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { name: "experience-login", path: "/experience/login", component: LoginView },
      {
        name: "experience-checkpoint",
        path: "/experience/checkpoint",
        component: CheckpointView,
      },
      { name: "experience-reveal", path: "/experience/reveal", component: RevealView },
    ],
  });
  return router;
}

/** 表示文言が一致するボタンをテスト対象から取得する。 */
function findButtonByLabel(wrapper: VueWrapper, label: string): DOMWrapper<Element> {
  const button: DOMWrapper<Element> | undefined = wrapper
    .findAll("button")
    .find((candidate: DOMWrapper<Element>): boolean => candidate.text() === label);

  if (!button) {
    throw new Error(`Expected button was not found: ${label}`);
  }
  return button;
}

describe("疑似ログインの安全性", (): void => {
  beforeEach((): void => {
    vi.useFakeTimers();
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "existing-cookie=unchanged";
  });

  afterEach((): void => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("未入力で進もうとすると疑似入力ボタンを強調してフォーカスする", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push({ name: "experience-login" });
    await router.isReady();
    const wrapper: VueWrapper = mount(LoginView, {
      global: { plugins: [router, i18n] },
      attachTo: document.body,
    });
    const continueButton: DOMWrapper<Element> = findButtonByLabel(
      wrapper,
      "疑似ログインする（送信なし）",
    );

    expect(wrapper.get(".login-view-credential-action").classes()).not.toContain(
      "login-view-credential-action-required",
    );
    await continueButton.trigger("click");

    const fillButton: DOMWrapper<Element> = findButtonByLabel(wrapper, "疑似認証情報を入力する");
    expect(router.currentRoute.value.name).toBe("experience-login");
    expect(wrapper.get(".login-view-credential-action").classes()).toContain(
      "login-view-credential-action-required",
    );
    expect(wrapper.text()).toContain("先に疑似認証情報を入力してください。");
    expect(document.activeElement).toBe(fillButton.element);

    await fillButton.trigger("click");
    expect(wrapper.get(".login-view-credential-action").classes()).not.toContain(
      "login-view-credential-action-required",
    );
  });

  it("架空情報だけを疑似入力し、処理中と正常表示を経て中間画面へ進む", async (): Promise<void> => {
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

    expect(wrapper.text()).not.toContain(content.trainingCredentialPreview.email);
    expect(wrapper.findAll(".login-view-credential-value-empty")).toHaveLength(2);
    await findButtonByLabel(wrapper, "疑似認証情報を入力する").trigger("click");
    expect(wrapper.text()).toContain(content.trainingCredentialPreview.email);
    expect(wrapper.text()).toContain(content.trainingCredentialPreview.passwordMask);
    expect(wrapper.findAll(".login-view-credential-value-empty")).toHaveLength(0);
    expect(wrapper.get(".login-view-password-mask").classes()).toContain(
      "login-view-credential-value",
    );

    const continueButton: DOMWrapper<Element> = findButtonByLabel(
      wrapper,
      "疑似ログインする（送信なし）",
    );
    await continueButton.trigger("click");
    await continueButton.trigger("click");

    expect(wrapper.text()).toContain("アカウント情報を確認しています…");
    expect(router.currentRoute.value.name).toBe("experience-login");
    await vi.advanceTimersByTimeAsync(2000);
    expect(wrapper.text()).toContain("アカウントを確認しました");
    expect(wrapper.text()).toContain("メッセージを読み込んでいます…");
    expect(router.currentRoute.value.name).toBe("experience-login");
    await vi.advanceTimersByTimeAsync(2000);
    await flushPromises();

    expect(router.currentRoute.value.name).toBe("experience-checkpoint");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSendSpy).not.toHaveBeenCalled();
    expect(JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } })).toBe(
      storageSnapshot,
    );
    expect(document.cookie).toBe(cookieSnapshot);
  });

  it("中間画面の次へから既存の種明かしへ進む", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push({ name: "experience-checkpoint" });
    await router.isReady();
    const wrapper: VueWrapper = mount(CheckpointView, {
      global: { plugins: [router, i18n] },
    });

    expect(wrapper.text()).toContain("ログインできたように見えます。");
    expect(wrapper.text()).toContain("いま画面に入力された情報が、本物のパスワードだったら？");
    await findButtonByLabel(wrapper, "次へ").trigger("click");
    await flushPromises();

    expect(router.currentRoute.value.name).toBe("experience-reveal");
  });

  it("画面を離れると待機中の遷移を破棄する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push({ name: "experience-login" });
    await router.isReady();
    const pushSpy: MockInstance<Router["push"]> = vi.spyOn(router, "push");
    const wrapper: VueWrapper = mount(LoginView, { global: { plugins: [router, i18n] } });

    await findButtonByLabel(wrapper, "疑似認証情報を入力する").trigger("click");
    await findButtonByLabel(wrapper, "疑似ログインする（送信なし）").trigger("click");
    wrapper.unmount();
    await vi.advanceTimersByTimeAsync(4000);

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it("認証情報を受け取るフォームや入力要素を持たない", (): void => {
    const router: Router = createTestRouter();
    const wrapper: VueWrapper = mount(LoginView, { global: { plugins: [router, i18n] } });

    expect(wrapper.find("form").exists()).toBe(false);
    expect(wrapper.find("input").exists()).toBe(false);
    expect(wrapper.find("textarea").exists()).toBe(false);
  });
});
