// .stylelintrc.js
/**
 * ========================================================
 * 功能完整的 Stylelint 配置
 * ========================================================
 *
 * 功能特性：
 * 1. 支持标准 CSS 和 SCSS 语法检查
 * 2. 完整支持 Vue 单文件组件中的样式检查
 * 3. 与 Prettier 无缝集成，避免格式冲突
 * 4. 自动修复功能支持
 * 5. 深度选择器 (v-deep) 特殊处理
 * 6. 忽略构建文件和依赖目录
 *
 * 依赖安装：
 * pnpm add -D \
 *   stylelint \
 *   postcss \
 *   postcss-html \
 *   postcss-scss \
 *   stylelint-config-standard \
 *   stylelint-config-recommended-vue \
 *   stylelint-config-prettier \
 *   stylelint-scss \
 *   @stylistic/stylelint-plugin
 */

module.exports = {
  // ===================================================
  // 1. 基础配置
  // ===================================================
  /**
   * 继承的规则集（按顺序应用，后加载的规则会覆盖前面的）
   * - stylelint-config-standard: 标准CSS规则
   * - stylelint-config-recommended-vue: Vue文件专用规则
   * - stylelint-config-prettier: 禁用所有与Prettier冲突的规则
   */
  extends: [
    "stylelint-config-standard", // 基础CSS规则
    "stylelint-config-recommended-vue", // Vue专用规则
    "stylelint-config-prettier" // Prettier兼容规则
  ],

  // ===================================================
  // 2. 插件配置
  // ===================================================
  /**
   * 使用的插件：
   * - stylelint-scss: 提供SCSS/SASS语法支持
   * - @stylistic/stylelint-plugin: 提供代码风格规则（缩进、空格等）
   */
  plugins: [
    "stylelint-scss", // SCSS语法支持
    "@stylistic/stylelint-plugin" // 代码风格规则
  ],

  // ===================================================
  // 3. 文件类型覆盖配置
  // ===================================================
  /**
   * 针对不同文件类型应用特殊配置
   * 这是解决多语言文件解析的关键
   */
  overrides: [
    // ========== SCSS/SASS 文件配置 ==========
    {
      files: ["**/*.scss", "**/*.sass"], // 匹配所有SCSS/SASS文件
      customSyntax: "postcss-scss", // 使用SCSS解析器
      rules: {
        // 禁用标准CSS的@规则检查（由SCSS插件处理）
        "at-rule-no-unknown": null,

        // 启用SCSS的@规则检查
        "scss/at-rule-no-unknown": true,

        // 允许未知属性值（SCSS变量等）
        "declaration-property-value-no-unknown": null,

        // 允许嵌套选择器
        "selector-nested-pattern": "^&"
      }
    },

    // ========== Vue 文件配置 ==========
    {
      files: ["**/*.vue"], // 匹配所有Vue文件
      customSyntax: "postcss-html",
      rules: {
        // Vue深度选择器支持 (v-deep, ::v-deep, /deep/)
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
        ],

        // Vue单文件组件样式范围限制
        "selector-max-type": [0, { ignore: ["compounded"] }],

        // 允许Vue特有的全局选择器
        "selector-pseudo-class-no-unknown": [
          true,
          {
            ignorePseudoClasses: ["global", "local"]
          }
        ]
      }
    },

    // ========== 测试文件配置 ==========
    {
      files: ["**/__tests__/**", "**/*.test.{css,scss,vue}"],
      rules: {
        // 在测试文件中放宽规则
        "no-descending-specificity": null,
        "selector-max-id": null,
        "selector-class-pattern": null
      }
    }
  ],

  // ===================================================
  // 4. 规则配置
  // ===================================================
  rules: {
    // ========== 基础样式规则 ==========
    "color-hex-case": "lower", // 颜色值小写 (#fff)
    "color-hex-length": "short", // 使用缩写颜色值 (#fff 替代 #ffffff)
    "block-no-empty": true, // 禁止空样式块 {}
    "number-leading-zero": "never", // 禁止小数前导零 (.5 代替 0.5)
    "string-quotes": "single", // 使用单引号 ('text')
    "declaration-colon-space-after": "always", // 冒号后保留空格
    "declaration-colon-space-before": "never", // 冒号前无空格
    "declaration-block-trailing-semicolon": "always", // 总是使用分号结尾
    "font-family-no-duplicate-names": true, // 禁止重复字体名称

    // ========== 缩进与空格规则 ==========
    indentation: 2, // 2空格缩进
    "max-empty-lines": 1, // 最大连续空行数
    "no-eol-whitespace": true, // 禁止行尾空格
    "no-missing-end-of-source-newline": true, // 文件末尾保留空行

    // ========== 选择器规则 ==========
    "selector-pseudo-element-colon-notation": "double", // 伪元素使用双冒号 (::)
    "selector-class-pattern": null, // 允许任意类名格式
    "selector-id-pattern": null, // 允许任意ID格式
    "selector-max-universal": 1, // 通用选择器最多使用一次
    "selector-max-type": [
      0,
      {
        // 限制类型选择器数量
        ignore: ["child", "descendant", "compounded"]
      }
    ],

    // ========== SCSS 专用规则 ==========
    "scss/dollar-variable-pattern": "^_?[a-z][a-z0-9-]*$", // 变量命名规则 (小写短横线)
    "scss/at-import-partial-extension": null, // 导入省略扩展名
    "scss/operator-no-unspaced": true, // 操作符两侧保留空格
    "scss/double-slash-comment-empty-line-before": "never", // 行注释前无空行

    // ========== 代码风格规则 (@stylistic) ==========
    // 块级样式格式
    "@stylistic/block-opening-brace-newline-after": "always", // { 后换行
    "@stylistic/block-closing-brace-newline-before": "always", // } 前换行
    "@stylistic/block-closing-brace-empty-line-before": "never", // } 前无空行

    // 声明格式
    "@stylistic/declaration-block-semicolon-newline-after": "always", // 分号后换行
    "@stylistic/declaration-block-semicolon-space-before": "never", // 分号前无空格

    // 选择器格式
    "@stylistic/selector-list-comma-newline-after": "always", // 选择器列表逗号后换行
    "@stylistic/selector-combinator-space-after": "always", // 组合选择器后空格

    // ========== Vue 专用规则 ==========
    "vue/block-tag-newline": [
      // 块级标签换行规则
      "error",
      {
        singleline: "never", // 单行不强制换行
        multiline: "always", // 多行总是换行
        maxEmptyLines: 0 // 最大空行数
      }
    ],
    "vue/no-parsing-error": [
      // Vue解析错误
      true,
      {
        "x-invalid-end-tag": false // 忽略自闭合标签警告
      }
    ],

    // ========== 其他规则 ==========
    "no-descending-specificity": null, // 允许特异性降序
    "value-no-vendor-prefix": null, // 允许前缀 (autoprefixer处理)
    "property-no-vendor-prefix": null, // 允许前缀
    "alpha-value-notation": "number", // 使用数字表示透明度
    "color-function-notation": "modern", // 使用现代颜色函数语法
    "function-url-quotes": "never", // url() 不加引号
    "keyframes-name-pattern": null, // 允许任意关键帧名称
    "custom-property-pattern": null // 允许任意CSS变量名
  },

  // ===================================================
  // 5. 忽略文件配置
  // ===================================================
  /**
   * 忽略不需要检查的文件/目录
   * 注意：这些路径会完全跳过Stylelint处理
   */
  ignoreFiles: [
    "**/dist/**", // 构建输出目录
    "**/node_modules/**", // 依赖目录
    "**/.history/**", // IDE历史文件 (VS Code Local History)
    "**/.git/**", // Git目录
    "**/*.min.css", // 压缩文件
    "**/coverage/**", // 测试覆盖率报告
    "**/__snapshots__/**", // 测试快照
    "**/public/**", // 静态资源目录
    "**/temp/**", // 临时文件
    "**/vendor/**" // 第三方库
  ]
};
