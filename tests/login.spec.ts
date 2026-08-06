import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginView from "@/views/LoginView.vue";
import RevealView from "@/views/RevealView.vue";
import { TRAINING_ACCOUNT } from "@/config/content";

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
      global: { plugins: [router] },
      attachTo: document.body,
    });
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const xhrSendSpy = vi.spyOn(XMLHttpRequest.prototype, "send");
    const storageSnapshot: string = JSON.stringify({
      local: { ...localStorage },
      session: { ...sessionStorage },
    });
    const cookieSnapshot: string = document.cookie;
    const inputs: ReturnType<VueWrapper["findAll"]> = wrapper.findAll("input");

    await inputs[0]!.setValue("private-user@example.com");
    await inputs[1]!.setValue("private-password");
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSendSpy).not.toHaveBeenCalled();
    expect(JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } })).toBe(
      storageSnapshot,
    );
    expect(document.cookie).toBe(cookieSnapshot);
    expect((inputs[0]!.element as HTMLInputElement).value).toBe("");
    expect((inputs[1]!.element as HTMLInputElement).value).toBe("");
    expect(router.currentRoute.value.name).toBe("experience-reveal");
  });

  it("コピー操作では固定された体験用情報だけを渡す", async (): Promise<void> => {
    const writeText = vi.fn<(value: string) => Promise<void>>().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const router: Router = createTestRouter();
    const wrapper: VueWrapper = mount(LoginView, { global: { plugins: [router] } });
    const copyButtons: ReturnType<VueWrapper["findAll"]> = wrapper
      .findAll("button")
      .filter((button): boolean => button.text().includes("コピー"));

    await copyButtons[0]!.trigger("click");
    await copyButtons[1]!.trigger("click");

    expect(writeText).toHaveBeenNthCalledWith(1, TRAINING_ACCOUNT.email);
    expect(writeText).toHaveBeenNthCalledWith(2, TRAINING_ACCOUNT.password);
  });
});
