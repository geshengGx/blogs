export default {
  // 🎯 继承社区最佳实践
  extends: ["stylelint-config-standard"],

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
