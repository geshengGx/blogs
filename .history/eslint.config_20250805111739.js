// eslint.config.js

import { defineConfig } from "eslint/config";

// 导入必要的模块
import js from "@eslint/js"; // ESLint 官方推荐规则
import globals from "globals"; // 提供全局变量定义
import vueParser from "vue-eslint-parser"; // Vue 文件解析器
import vuePlugin from "eslint-plugin-vue"; // Vue 专用规则
import tsEslint from "@typescript-eslint/eslint-plugin"; // TS 规则插件
import tsParser from "@typescript-eslint/parser"; // TS 解析器
import prettierConfig from "eslint-config-prettier"; // 解决与 Prettier 的冲突

/**
 * 扁平化配置说明：
 * 1. 配置采用数组形式，按顺序合并
 * 2. 每个配置对象可以针对特定文件类型
 * 3. 后加载的配置会覆盖前面的同名规则
 */
export default [
  // ==================== 基础配置 ====================
  {
    /**
     * 语言环境配置
     * - 替代原来的 env 和 parserOptions 配置
     */
    languageOptions: {
      // 全局变量（替代原来的 env 配置）
      globals: {
        ...globals.browser, // 浏览器环境变量 (window, document 等)
        ...globals.node, // Node.js 环境变量 (process, require 等)
        ...globals.es2021 // ES2021 全局变量
      },

      // 使用 vue-eslint-parser 解析 .vue 文件
      parser: vueParser,

      // 解析器选项
      parserOptions: {
        parser: tsParser, // 使用 TS 解析器解析 <script> 部分
        ecmaVersion: "latest", // 使用最新 ECMAScript 标准
        sourceType: "module", // 使用 ES 模块语法
        jsxPragma: "React", // JSX 相关配置
        ecmaFeatures: {
          jsx: true // 启用 JSX 支持
        }
      }
    }
  },

  // ==================== 应用推荐规则集 ====================
  js.configs.recommended, // ESLint 官方推荐规则
  tsEslint.configs.recommended, // TypeScript 推荐规则
  pluginJs.configs.recommended,

  // ==================== Vue 文件专属配置 ====================
  {
    // 仅对 .vue 文件生效
    files: ["**/*.vue"],

    // 注册 Vue 插件
    plugins: {
      vue: vuePlugin // 插件名称简写
    },

    // 规则配置
    rules: {
      // 继承 vue3-recommended 的所有规则
      // ...vuePlugin.rules,
      // extends: vuePlugin.configs["vue3-recommended"],
      // === 自定义 Vue 规则 (覆盖推荐规则) ===
      // 防止 <script setup> 的变量在 <template> 中被误判未使用
      "vue/script-setup-uses-vars": "error",
      // 强制 v-slot 指令风格
      "vue/v-slot-style": "error",
      // 禁止直接修改 props
      "vue/no-mutating-props": "error",
      // 自定义事件名称强制横线命名 (my-event)
      "vue/custom-event-name-casing": "error",
      // 标签右括号换行规则
      "vue/html-closing-bracket-newline": "error",
      // 属性名强制横线命名 (my-prop="value")
      "vue/attribute-hyphenation": "error",

      // === 关闭的 Vue 规则 ===
      "vue/attributes-order": "off", // 不强制属性顺序
      "vue/no-v-html": "off", // 允许使用 v-html
      "vue/require-default-prop": "off", // 不要求必须提供 prop 默认值
      "vue/multi-word-component-names": "off", // 允许单单词组件名
      "vue/no-setup-props-destructure": "off" // 允许解构 props
    }
  },

  // ==================== TypeScript 专属配置 ====================
  {
    // 仅对 .ts 文件生效
    files: ["**/*.ts"],

    // 注册 TypeScript 插件
    plugins: {
      "@typescript-eslint": tsEslint
    },

    // 规则配置
    rules: {
      // === TS 严格规则 ===
      // 禁止未使用的变量
      "@typescript-eslint/no-unused-vars": "error",
      // 推荐使用 @ts-expect-error 而非 @ts-ignore
      "@typescript-eslint/prefer-ts-expect-error": "error",
      // 禁止空函数
      "@typescript-eslint/no-empty-function": "error",
      // 限制 @ts-<directive> 注释的使用
      "@typescript-eslint/ban-ts-comment": "error",

      // === 放宽的 TS 规则 ===
      "@typescript-eslint/no-inferrable-types": "off", // 允许显式声明可推断类型
      "@typescript-eslint/no-namespace": "off", // 允许使用命名空间
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any 类型
      "@typescript-eslint/ban-types": "off", // 不限制特定类型
      "@typescript-eslint/no-var-requires": "off", // 允许 require() 语法
      "@typescript-eslint/no-non-null-assertion": "off" // 允许非空断言 (!)
    }
  },

  // ==================== 通用 JavaScript 规则 ====================
  {
    // 应用到所有文件
    rules: {
      // 禁止使用 var，必须用 let/const
      "no-var": "error",
      // 限制连续空行最多 1 行
      "no-multiple-empty-lines": ["error", { max: 1 }],
      // 不强制使用 const (与 TS 规则配合)
      "prefer-const": "off",
      // 允许在定义前使用 (函数提升等情况)
      "no-use-before-define": "off"
    }
  },

  // ==================== Prettier 集成 (必须最后加载) ====================
  prettierConfig // 解决与 Prettier 的规则冲突
];
