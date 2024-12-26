import pluginVue from "eslint-plugin-vue";
import eslint from "@eslint/js";

export default [
  eslint.configs.recommended,
  ...pluginVue.configs["flat/vue2-recommended"],
  {
    rules: {
        semi: "error",
        quotes: ["error", "double"],
        "no-unused-expressions": "off",
        "comma-dangle": ["error", "always-multiline"],
        "prefer-const": "off",
        "vue/require-default-prop": "off",
    },
  },
];