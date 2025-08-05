// 样式规范化

module.exports = {
  // 继承标准配置，站在巨人的肩膀上
  extends: ["stylelint-config-standard", "stylepnpnlint-config-rational-order"],

  // 添加强大的插件支持
  plugins: ["stylelint-scss", "@stylistic/stylelint-plugin"],

  // 针对不同文件类型的特殊配置
  overrides: [
    {
      files: ["**/*.scss", "**/*.sass"],
      customSyntax: "postcss-scss",
      rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "declaration-property-value-no-unknown": null
      }
    }
  ],

  // 🔧 基础规则配置
  rules: {
    // 禁止空的 CSS 块
    "block-no-empty": true,
    // 禁止无效的十六进制颜色
    "color-no-invalid-hex": true,
    // 统一使用单引号
    "string-quotes": "single"
  }
};
