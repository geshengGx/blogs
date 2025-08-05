// 样式规范化
module.exports = {
  // 继承标准配置，站在巨人的肩膀上
  extends: ["stylelint-config-standard"],

  // 添加强大的插件支持,'stylelint-order'
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
    "color-hex-case": "lower", // 颜色值小写
    "block-no-empty": true, // 禁止空块
    "number-leading-zero": "never", // 禁止小数前导零
    "string-quotes": "single", // 字符串单引号 (双引号single)
    indentation: 2, // 缩进设置为2个空格
    "declaration-colon-space-before": "never", // 属性值前保留一个空格
    "font-family-no-duplicate-names": true, // 禁止重复的字体名称
    // "order/properties-order": [ // 属性排序规则
    //   "position",
    //   "top",
    //   "right",
    //   "bottom",
    //   "left",
    //   "z-index",
    //   "display",
    //   "width",
    //   "height",
    //   "margin",
    //   "padding",
    //   "background",
    //   "color",
    //   "font-size",
    //   "text-align"
    // ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"] // 忽略 Vue 的深度选择器
      }
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["mixin", "include"] // 忽略 SCSS 特定规则
      }
    ]
  },
  ignoreFiles: ["dist/**/*", "node_modules/**/*"] // 忽略文件
};
