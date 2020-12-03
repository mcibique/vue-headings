module.exports = {
  extends: ["semistandard", "plugin:vue/recommended"],
  rules: {
    semi: "error",
    quotes: ["error", "double"],
    "no-unused-expressions": "off",
    "comma-dangle": ["error", "always-multiline"],
    "prefer-const": "off",
    "vue/require-default-prop": "off",
  },
};
