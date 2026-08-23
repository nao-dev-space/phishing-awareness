import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import { describe, expect, it } from "vitest";
import App from "@/App.vue";
import { ROUTE_DEFINITIONS } from "@/router";
import type { RouteDefinition } from "@/types/app";

/** 全ルート定義をメモリ履歴へ変換する。@returns 画面遷移テスト用ルーター。 */
function createTestRouter(): Router {
  const router: Router = createRouter({
    history: createMemoryHistory(),
    routes: ROUTE_DEFINITIONS.map((route: RouteDefinition) => ({ ...route })),
  });
  return router;
}

describe("主要ナビゲーション", (): void => {
  it("トップに重要な警告とナビゲーションを表示する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push("/");
    await router.isReady();
    const wrapper: VueWrapper = mount(App, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain("そのログイン、本物ですか？");
    expect(wrapper.text()).toContain("普段使用しているメールアドレスやパスワード");
    expect(wrapper.findAll("nav a").length).toBeGreaterThan(4);
  });

  it("参考情報の外部リンクに安全属性を付ける", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push("/resources");
    await router.isReady();
    const wrapper: VueWrapper = mount(App, { global: { plugins: [router] } });
    const externalLinks: ReturnType<VueWrapper["findAll"]> = wrapper.findAll("a[target='_blank']");

    expect(externalLinks.length).toBe(5);
    // 外部リンクをすべて列挙し、新しいタブを安全に開く属性が欠けていないか確認する。
    for (const link of externalLinks) {
      expect(link.attributes("rel")).toBe("noopener noreferrer");
    }
  });

  it("疑似メール本文の確認ボタンから疑似ログインへ遷移する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push("/experience/mail");
    await router.isReady();
    const wrapper: VueWrapper = mount(App, { global: { plugins: [router] } });

    await wrapper.get(".mail-view-fake-link").trigger("click");
    await flushPromises();

    expect(router.currentRoute.value.name).toBe("experience-login");
  });

  it("存在しないURLで404ページを表示する", async (): Promise<void> => {
    const router: Router = createTestRouter();
    await router.push("/missing-page");
    await router.isReady();
    const wrapper: VueWrapper = mount(App, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain("404");
    expect(wrapper.text()).toContain("ページが見つかりません");
  });
});
