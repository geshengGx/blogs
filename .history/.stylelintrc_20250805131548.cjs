// .stylelintrc.js
// Stylelint 配置文件 - 用于 CSS/SCSS/Vue 样式规范化检查

module.exports = {
  // ==================== 基础配置 ====================
  /**
   * 继承的规则集（按顺序覆盖）
   * 1. standard: 标准CSS规则
   * 2. recommended-vue: Vue文件基础规则
   * 3. recommended-vue/scss: Vue+SCSS规则
   * 4. prettier: 解决与Prettier的冲突（必须最后）
   */
  extends: [
    "stylelint-config-standard", // 标准CSS规则
    "stylelint-config-recommended-vue", // Vue基础规则
    "stylelint-config-recommended-vue/scss", // Vue+SCSS规则
    "stylelint-config-prettier" // 避免与Prettier冲突
  ],

  // ==================== 解析器配置 ====================
  /**
   * 自定义语法解析器
   * - postcss-html: 解析Vue/Svelte等文件中的<style>块
   */
  customSyntax: "postcss-html",

  // ==================== 插件配置 ====================
  /**
   * 使用的插件
   * - stylelint-scss: SCSS语法支持
   * - @stylistic/stylelint-plugin: 代码风格规则
   */
  plugins: [
    "stylelint-scss", // SCSS语法支持
    "@stylistic/stylelint-plugin" // 代码风格规则
  ],

  // ==================== 文件类型覆盖配置 ====================
  overrides: [
    // SCSS/SASS文件特殊配置
    {
      files: ["**/*.scss", "**/*.sass"],
      customSyntax: "postcss-scss", // 使用SCSS解析器
      rules: {
        "at-rule-no-unknown": null, // 禁用标准CSS的@规则检查
        "scss/at-rule-no-unknown": true, // 启用SCSS的@规则检查
        "declaration-property-value-no-unknown": null // 允许未知属性值
      }
    }
  ],

  // ==================== 规则配置 ====================
  rules: {
    // ===== 基础样式规则 =====
    "color-hex-case": "lower", // 颜色值小写 (#fff)
    "block-no-empty": true, // 禁止空样式块 {}
    "number-leading-zero": "never", // 禁止小数前导零 (.5 代替 0.5)
    "string-quotes": "single", // 使用单引号 ('text')
    indentation: 2, // 2空格缩进
    "declaration-colon-space-before": "never", // 冒号前无空格
    "declaration-colon-space-after": "always", // 冒号后空格
    "font-family-no-duplicate-names": true, // 禁止重复字体名称

    // ===== 伪元素/伪类规则 =====
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "deep"] // 忽略Vue深度选择器
      }
    ],

    // ===== @规则控制 =====
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          // 允许的SCSS/Less特定规则
          "mixin",
          "include",
          "extend",
          "use",
          "forward",
          "function",
          "return",
          "if",
          "else",
          "for",
          "each",
          "while",
          "debug",
          "warn",
          "error",
          "content"
        ]
      }
    ],

    // ===== SCSS特定规则 =====
    "scss/dollar-variable-pattern": "^_?[a-z][a-z0-9-]*$", // 变量命名规则
    "scss/at-import-partial-extension": "never", // 导入省略扩展名

    // ===== 代码风格规则 (@stylistic) =====
    "@stylistic/block-opening-brace-newline-after": "always", // { 后换行
    "@stylistic/block-closing-brace-newline-before": "always", // } 前换行
    "@stylistic/declaration-block-trailing-semicolon": "always", // 强制分号

    // ===== 其他规则 =====
    "selector-class-pattern": null, // 允许任意类名格式
    "no-descending-specificity": null, // 允许特异性降序
    "value-no-vendor-prefix": null, // 允许前缀
    "property-no-vendor-prefix": null // 允许前缀
  },

  // ==================== 忽略文件 ====================
  ignoreFiles: [
    "**/dist/**", // 构建输出目录
    "**/node_modules/**", // 依赖目录
    "**/.history/**", // IDE历史文件
    "**/*.min.css", // 压缩文件
    "**/tests/**" // 测试文件
  ]
};
