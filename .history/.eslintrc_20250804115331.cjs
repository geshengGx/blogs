// .eslintrc.cjs
module.exports = {
  // 设置环境为浏览器和ES2021语法
  env: {
    browser: true, // 支持浏览器全局变量
    es2021: true, // 支持ES2021语法
    node: true, // 支持Node.js全局变量
  },

  // 使用 vue-eslint-parser 作为主解析器，配合 @typescript-eslint/parser 解析 TypeScript
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析TypeScript
    ecmaVersion: "latest", // 使用最新的ECMAScript版本
    sourceType: "module", // 使用ES模块语法
    ecmaFeatures: {
      jsx: true, // 支持JSX语法（Vue中使用JSX）
    },
  },

  // 扩展规则集
  extends: [
    "eslint:recommended", // ESLint推荐规则
    "plugin:vue/vue3-recommended", // Vue 3推荐规则
    "plugin:@typescript-eslint/recommended", // TypeScript推荐规则
    "plugin:prettier/recommended", // Prettier集成（必须放在最后）
  ],

  // 自定义规则
  rules: {
    // Vue相关规则
    "vue/multi-word-component-names": "off", // 允许单文件组件名（如Home.vue）
    "vue/require-default-prop": "off", // 不要求props必须有默认值
    "vue/no-v-html": "warn", // 谨慎使用v-html（安全警告）
    "vue/html-self-closing": [
      // 自闭合标签配置
      "error",
      {
        html: {
          void: "always", // 空元素始终自闭合（如<img>）
          normal: "never", // 正常元素不自闭合
          component: "always", // 组件始终自闭合
        },
      },
    ],

    // TypeScript相关规则
    "@typescript-eslint/no-explicit-any": "off", // 允许使用any类型
    "@typescript-eslint/ban-ts-comment": "warn", // 对ts注释指令使用警告
    "@typescript-eslint/no-unused-vars": "warn", // 未使用变量警告

    // 通用规则
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用console
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用debugger
    "prettier/prettier": "warn", // Prettier格式化问题作为警告
  },

  // 全局变量配置（解决defineProps等Vue宏的未定义警告）
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
