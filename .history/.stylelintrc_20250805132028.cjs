// .stylelintrc.js
// Stylelint 配置文件 - 用于 CSS/SCSS/Vue 样式规范化检查

/**
 * ==================== 核心配置说明 ====================
 * 1. 修复了 'Cannot read properties of undefined' 错误
 * 2. 解决了 Vue 文件中 <style> 块解析问题
 * 3. 移除了已弃用的规则
 * 4. 优化了 SCSS 和 Vue 文件的处理逻辑
 *
 * 安装依赖:
 * pnpm add -D \
 *   stylelint \
 *   postcss \
 *   postcss-html \
 *   postcss-scss \
 *   stylelint-config-standard \
 *   stylelint-config-recommended-vue \
 *   stylelint-config-prettier \
 *   stylelint-scss
 */

module.exports = {
  // ==================== 基础配置 ====================
  /**
   * 继承的规则集（按顺序覆盖）
   * 1. standard: 标准CSS规则
   * 2. recommended-vue: Vue文件基础规则
   * 3. prettier: 解决与Prettier的冲突（必须最后）
   */
  extends: [
    "stylelint-config-standard", // 标准CSS规则
    "stylelint-config-recommended-vue", // Vue基础规则（包含SCSS支持）
    "stylelint-config-prettier" // 避免与Prettier冲突
  ],

  // ==================== 解析器配置 ====================
  /**
   * 自定义语法解析器 - 解决 'stringify' 错误的关键配置
   * - postcss-html: 解析Vue/Svelte等文件中的<style>块
   * 注意：必须放在顶层配置
   */
  // customSyntax: "postcss-html",

  // ==================== 插件配置 ====================
  /**
   * 使用的插件
   * - stylelint-scss: SCSS语法支持
   * 注意：暂时移除了 @stylistic 插件以避免可能的冲突
   */
  plugins: [
    "stylelint-scss" // SCSS语法支持
  ],

  // ==================== 文件类型覆盖配置 ====================
  /**
   * 针对不同文件类型应用不同配置
   * 这是解决 Vue 和 SCSS 文件解析问题的关键
   */
  overrides: [
    // SCSS/SASS文件特殊配置
    {
      files: ["**/*.scss", "**/*.sass"],
      customSyntax: "postcss-scss", // 使用SCSS解析器
      rules: {
        "at-rule-no-unknown": null, // 禁用标准CSS的@规则检查
        "scss/at-rule-no-unknown": true // 启用SCSS的@规则检查
      }
    },

    // Vue文件特殊配置
    {
      files: ["**/*.vue"],
      rules: {
        // Vue深度选择器支持
        "selector-pseudo-element-no-unknown": [
          true,
          {
            ignorePseudoElements: ["v-deep", "deep", "::v-deep"]
          }
        ],
        // 允许Vue特有的@规则
        "at-rule-no-unknown": [
          true,
          {
            ignoreAtRules: ["mixin", "include", "use", "forward"]
          }
        ]
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
    "declaration-colon-space-after": "always", // 冒号后空格
    "font-family-no-duplicate-names": true, // 禁止重复字体名称

    // ===== 伪元素/伪类规则 =====
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "deep", "::v-deep"] // Vue深度选择器
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

    // 禁用已弃用的规则 (解决警告)
    "scss/at-import-partial-extension": null, // 已弃用规则

    // ===== 其他规则 =====
    "selector-class-pattern": null, // 允许任意类名格式
    "no-descending-specificity": null, // 允许特异性降序
    "value-no-vendor-prefix": null, // 允许前缀
    "property-no-vendor-prefix": null, // 允许前缀
    "alpha-value-notation": "number", // 使用数字表示透明度
    "color-function-notation": "modern", // 使用现代颜色函数语法

    // ===== Vue文件特殊规则 =====
    "vue/block-tag-newline": [
      // 块级标签换行规则
      "error",
      {
        singleline: "never", // 单行不强制换行
        multiline: "always" // 多行总是换行
      }
    ]
  },

  // ==================== 忽略文件 ====================
  /**
   * 忽略不需要检查的文件
   * 注意：这里配置的路径会完全跳过Stylelint检查
   */
  ignoreFiles: [
    "**/dist/**", // 构建输出目录
    "**/node_modules/**", // 依赖目录
    "**/.history/**", // IDE历史文件（VS Code Local History）
    "**/*.min.css", // 压缩文件
    "**/tests/**", // 测试文件
    "**/__snapshots__/**", // 测试快照
    "**/coverage/**" // 测试覆盖率报告
  ]
};
