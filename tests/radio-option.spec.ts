import { mount, type DOMWrapper, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AppRadioOption from "@/components/atoms/AppRadioOption.vue";

describe("ラジオ選択肢atom", (): void => {
  it("カード内のラベル操作で選択値を明示的に通知する", async (): Promise<void> => {
    const wrapper: VueWrapper = mount(AppRadioOption, {
      props: {
        label: "安全な選択肢",
        modelValue: "",
        name: "question",
        value: "safe-option",
      },
    });

    const optionLabel: DOMWrapper<Element> = wrapper.get("label");
    const radioInput: DOMWrapper<Element> = optionLabel.get("input");
    await radioInput.setValue(true);

    expect(optionLabel.classes()).toContain("app-radio-option");
    expect(wrapper.emitted("update:modelValue")).toEqual([["safe-option"]]);
  });

  it("選択済み状態と無効状態をinput属性へ反映する", (): void => {
    const wrapper: VueWrapper = mount(AppRadioOption, {
      props: {
        disabled: true,
        label: "選択済み",
        modelValue: "selected-option",
        name: "question",
        value: "selected-option",
      },
    });
    const radioInput: DOMWrapper<Element> = wrapper.get("input");

    expect(radioInput.element).toBeInstanceOf(HTMLInputElement);
    expect(radioInput.attributes("disabled")).toBeDefined();
    expect(radioInput.attributes("checked")).toBeDefined();
  });
});
