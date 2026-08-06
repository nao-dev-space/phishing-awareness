import eslint from "@eslint/js";
import prettier from "@vue/eslint-config-prettier";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/prefer-as-const": "off",
      "no-undef": "off",
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off",
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        AbortSignal: "readonly",
        URL: "readonly",
        fetch: "readonly",
        process: "readonly",
        setTimeout: "readonly",
      },
    },
  },
);
