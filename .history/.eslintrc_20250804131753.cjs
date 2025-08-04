module.exports = {
  // 根配置 - 停止向上查找
  root: true,

  // 环境设置
  env: {
    browser: true, // 浏览器全局变量
    es2021: true, // ES2021语法支持
    node: true, // Node.js全局变量
  },

  // 使用Vue专用解析器
  parser: "vue-eslint-parser",

  // 解析器选项
  parserOptions: {
    // TypeScript解析器
    parser: "@typescript-eslint/parser",

    // 多项目配置 - 指定使用的tsconfig
    project: [
      "./tsconfig.app.json", // 前端应用配置
      "./tsconfig.node.json", // Node环境配置
    ],

    // 确保从项目根目录解析tsconfig
    tsconfigRootDir: __dirname,

    // 支持Vue文件
    extraFileExtensions: [".vue"],

    // ECMAScript版本
    ecmaVersion: "latest",

    // 模块类型
    sourceType: "module",

    // 实验性功能：使用TypeScript语言服务（提高性能）
    EXPERIMENTAL_useProjectService: true,
  },

  // 扩展规则集
  extends: [
    "eslint:recommended", // ESLint核心规则
    "plugin:vue/vue3-recommended", // Vue 3官方规则
    "plugin:@typescript-eslint/recommended", // TypeScript推荐规则
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // 需要类型检查的规则
    "plugin:prettier/recommended", // Prettier集成
  ],

  // 自定义规则
  rules: {
    // === Vue规则 ===
    // 允许单单词组件名 (如Home.vue)
    "vue/multi-word-component-names": "off",

    // 不要求props必须有默认值
    "vue/require-default-prop": "off",

    // 属性名使用驼峰命名 (myProp 而不是 my-prop)
    "vue/attribute-hyphenation": ["error", "never"],

    // 组件最大属性数量限制
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 5, // 单行最多5个属性
        multiline: 1, // 多行每行1个属性
      },
    ],

    // === TypeScript规则 ===
    // 未使用变量警告
    "@typescript-eslint/no-unused-vars": "warn",

    // 禁止未处理的Promise
    "@typescript-eslint/no-floating-promises": "error",

    // 强制一致的类型导入风格
    "@typescript-eslint/consistent-type-imports": "error",

    // 允许使用非空断言 (如 obj!.property)
    "@typescript-eslint/no-non-null-assertion": "off",

    // === 通用规则 ===
    // 生产环境禁用console
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",

    // 生产环境禁用debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // Prettier问题作为警告
    "prettier/prettier": "warn",
  },

  // 文件覆盖规则 - 针对特定文件设置不同规则
  overrides: [
    // Node环境文件特殊配置
    {
      files: [
        "vite.config.ts",
        "vitest.config.ts",
        "scripts/**/*.ts",
        "build/**/*.ts",
      ],
      // 指定使用Node环境的tsconfig
      parserOptions: {
        project: "./tsconfig.node.json",
      },
      rules: {
        // 允许使用require
        "@typescript-eslint/no-var-requires": "off",

        // 允许console
        "no-console": "off",

        // 允许使用any类型
        "@typescript-eslint/no-explicit-any": "off",
      },
    },

    // 测试文件特殊配置
    {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      env: {
        jest: true, // 添加Jest全局变量
      },
      rules: {
        // 测试文件中允许使用any
        "@typescript-eslint/no-explicit-any": "off",

        // 测试文件中允许空函数
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],

  // 设置 - 路径解析
  settings: {
    // 配置import/resolver以支持路径别名和TypeScript
    "import/resolver": {
      typescript: {
        // 指定所有可能的tsconfig
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
      },
      // 支持Vue文件
      vue: {
        version: "3.0",
      },
    },
  },
};
