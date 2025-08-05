module.exports = {
  // 根配置 - 停止向上查找
  root: true,

  // 环境设置
  env: {
    browser: true, // 浏览器全局变量
    es2021: true, // ES2021语法支持
    node: true // Node.js全局变量
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
      "./tsconfig.node.json" // Node环境配置
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
    EXPERIMENTAL_useProjectService: true
  },

  // 扩展规则集
  extends: [
    "eslint:recommended", // ESLint核心规则
    "plugin:vue/vue3-recommended", // Vue 3官方规则
    "plugin:@typescript-eslint/recommended", // TypeScript推荐规则
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // 需要类型检查的规则
    "plugin:prettier/recommended" // Prettier集成
  ],

  // 自定义规则
  rules: {
    semi: ["warn", "never"], // 禁止尾部使用分号
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
        multiline: 1 // 多行每行1个属性
      }
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
    "prettier/prettier": "warn"
  },

  // 文件覆盖规则 - 针对特定文件设置不同规则
  overrides: [
    // Node环境文件特殊配置
    {
      files: ["vite.config.ts", "vitest.config.ts", "scripts/**/*.ts", "build/**/*.ts"],
      // 指定使用Node环境的tsconfig
      parserOptions: {
        project: "./tsconfig.node.json"
      },
      rules: {
        // 允许使用require
        "@typescript-eslint/no-var-requires": "off",

        // 允许console
        "no-console": "off",

        // 允许使用any类型
        "@typescript-eslint/no-explicit-any": "off"
      }
    },

    // 测试文件特殊配置
    {
      files: ["**/*.spec.ts", "**/*.test.ts"],
      env: {
        jest: true // 添加Jest全局变量
      },
      rules: {
        // 测试文件中允许使用any
        "@typescript-eslint/no-explicit-any": "off",

        // 测试文件中允许空函数
        "@typescript-eslint/no-empty-function": "off"
      }
    }
  ],

  // 设置 - 路径解析
  settings: {
    // 配置import/resolver以支持路径别名和TypeScript
    "import/resolver": {
      typescript: {
        // 指定所有可能的tsconfig
        project: ["./tsconfig.app.json", "./tsconfig.node.json"]
      },
      // 支持Vue文件
      vue: {
        version: "3.0"
      }
    }
  },
  ignores: ["dist/", "node_modules/", "build/", "public/", "*.d.ts", "*.log"] // 忽略文件
};

// // 这里时配置规则的,自己看情况配置
//     "rules": {
//         'semi': ['warn', 'never'],           // 禁止尾部使用分号
//         'no-console': 'warn',                // 禁止出现console
//         'no-debugger': 'warn',               // 禁止出现debugger
//         'no-duplicate-case': 'warn',         // 禁止出现重复case
//         'no-empty': 'warn',                  // 禁止出现空语句块
//         'no-extra-parens': 'warn',           // 禁止不必要的括号
//         'no-func-assign': 'warn',            // 禁止对Function声明重新赋值
//         'no-unreachable': 'warn',            // 禁止出现[return|throw]之后的代码块
//         'no-else-return': 'warn',            // 禁止if语句中return语句之后有else块
//         'no-empty-function': 'warn',         // 禁止出现空的函数块
//         'no-lone-blocks': 'warn',            // 禁用不必要的嵌套块
//         'no-multi-spaces': 'warn',           // 禁止使用多个空格
//         'no-redeclare': 'warn',              // 禁止多次声明同一变量
//         'no-return-assign': 'warn',          // 禁止在return语句中使用赋值语句
//         'no-return-await': 'warn',           // 禁用不必要的[return/await]
//         'no-self-compare': 'warn',           // 禁止自身比较表达式
//         'no-useless-catch': 'warn',          // 禁止不必要的catch子句
//         'no-useless-return': 'warn',         // 禁止不必要的return语句
//         'no-mixed-spaces-and-tabs': 'warn',  // 禁止空格和tab的混合缩进
//         'no-multiple-empty-lines': 'warn',   // 禁止出现多行空行
//         'no-trailing-spaces': 'warn',        // 禁止一行结束后面不要有空格
//         'no-useless-call': 'warn',           // 禁止不必要的.call()和.apply()
//         'no-var': 'warn',                    // 禁止出现var用let和const代替
//         'no-delete-var': 'off',              // 允许出现delete变量的使用
//         'no-shadow': 'off',                  // 允许变量声明与外层作用域的变量同名
//         'dot-notation': 'warn',              // 要求尽可能地使用点号
//         'default-case': 'warn',              // 要求switch语句中有default分支
//         'eqeqeq': 'warn',                    // 要求使用 === 和 !==
//         'curly': 'warn',                     // 要求所有控制语句使用一致的括号风格
//         'space-before-blocks': 'warn',       // 要求在块之前使用一致的空格
//         'space-in-parens': 'warn',           // 要求在圆括号内使用一致的空格
//         'space-infix-ops': 'warn',           // 要求操作符周围有空格
//         'space-unary-ops': 'warn',           // 要求在一元操作符前后使用一致的空格
//         'switch-colon-spacing': 'warn',      // 要求在switch的冒号左右有空格
//         'arrow-spacing': 'warn',             // 要求箭头函数的箭头前后使用一致的空格
//         'array-bracket-spacing': 'warn',     // 要求数组方括号中使用一致的空格
//         'brace-style': 'warn',               // 要求在代码块中使用一致的大括号风格
//         'camelcase': 'warn',                 // 要求使用骆驼拼写法命名约定
//         'indent': ['warn', 4],               // 要求使用JS一致缩进4个空格
//         'max-depth': ['warn', 4],            // 要求可嵌套的块的最大深度4
//         'max-statements': ['warn', 100],     // 要求函数块最多允许的的语句数量20
//         'max-nested-callbacks': ['warn', 3], // 要求回调函数最大嵌套深度3
//         'max-statements-per-line': ['warn', { max: 1 }],   // 要求每一行中所允许的最大语句数量
//         "quotes": ["warn", "single", "avoid-escape"],      // 要求统一使用单引号符号
//         "vue/require-default-prop": 0,                     // 关闭属性参数必须默认值
//         "vue/singleline-html-element-content-newline": 0,  // 关闭单行元素必须换行符
//         "vue/multiline-html-element-content-newline": 0,   // 关闭多行元素必须换行符
//         // 要求每一行标签的最大属性不超五个
//         'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
//         // 要求html标签的缩进为需要4个空格
//         "vue/html-indent": ["warn", 4, {
//             "attribute": 1,
//             "baseIndent": 1,
//             "closeBracket": 0,
//             "alignAttributesVertically": true,
//             "ignores": []
//         }],
//         // 取消关闭标签不能自闭合的限制设置
//         "vue/html-self-closing": ["error", {
//             "html": {
//                 "void": "always",
//                 "normal": "never",
//                 "component": "always"
//             },
//             "svg": "always",
//             "math": "always"
//         }]
//     }
