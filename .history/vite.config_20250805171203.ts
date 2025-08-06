import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      /**
       * TypeScript 类型检查
       * - 启用后会使用 tsc 进行类型检查
       * - 推荐在开发阶段开启，生产构建时可禁用
       */
      typescript: {
        root: "./", // 指定 TypeScript 项目的根目录
        buildMode: true, // 在构建模式下也进行检查
        tsconfigPath: "./tsconfig.json" // 显式指定 tsconfig 路径
      },

      /**
       * ESLint 代码质量检查
       * - 使用最新 ESLint v9+ 配置格式
       * - 注意：ESLint v9 移除了旧版配置项
       */
      eslint: {
        // 指定要检查的文件模式
        lintCommand: 'eslint "./src/**/*.{js,ts,jsx,tsx,vue}"',
        // 自定义ESLint配置（覆盖.eslintrc）
        overrideConfig: {
          env: { browser: true, es2022: true },
          parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            extraFileExtensions: [".vue"]
          },
          // 报告未使用的禁用指令
          linterOptions: { reportUnusedDisableDirectives: "error" }
        },
        // 错误时显示完整文件路径
        useFlatConfig: false, // 不使用实验性的扁平配置
        dev: { logLevel: ["error"] } // 开发阶段只显示错误
      },

      /**
       * Vue SFC 类型检查 (vue-tsc)
       * - 对 Vue 单文件组件进行类型检查
       * - 需要安装 vue-tsc 作为开发依赖
       */
      vueTsc: {
        root: "./", // 项目根目录
        tsconfigPath: "./tsconfig.vue.json" // 推荐为Vue创建专用配置
      },

      /**
       * Stylelint 样式检查
       * - 支持 CSS/SCSS/Less 等预处理器
       * - 需要安装 stylelint 和相关配置
       */
      stylelint: {
        // 检查所有样式文件
        lintCommand: 'stylelint "src/**/*.{css,scss,vue}"',
        // 自定义配置
        config: {
          extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
          rules: {
            "selector-class-pattern": null, // 禁用类名规则
            "no-empty-source": null // 允许空样式文件
          }
        },
        // 开发阶段显示警告级别错误
        dev: { logLevel: ["warning", "error"] }
      },

      // ===== 通用行为配置 =====
      enableBuild: true, // 在构建时也运行检查
      overlay: {
        // 浏览器错误覆盖层配置
        position: "tr", // 右上角显示 (top-right)
        initialIsOpen: false, // 初始不展开
        badgeStyle: {
          // 徽章样式
          backgroundColor: "#ff5c57" // 错误红色
        }
      },
      terminal: true, // 在终端显示错误
      logger: {
        // 日志配置
        warn: (message: string) => console.warn(`[检查器] ${message}`),
        error: (message: string) => console.error(`[检查器] ${message}`)
      },

      // ===== 性能优化配置 =====
      async: true, // 异步运行检查器（不阻塞构建）
      concurrency: 4, // 最大并发检查进程数
      memoryLimit: 2048, // 内存限制 (MB)
      interval: 1000, // 文件更改后检查延迟 (ms)

      // ===== 高级配置 =====
      // 包含/排除特定文件
      include: ["src/**/*"],
      exclude: ["**/node_modules/**", "**/dist/**"],

      // 自定义格式化程序
      formatter: "codeframe", // 可选: 'codeframe' | 'list' | 'json'

      // 开发服务器配置
      devServer: {
        // 当有错误时阻止启动
        failOnError: false,
        // 错误时刷新浏览器
        forceDevServerReload: true
      }
    })
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src" // 配置@指向src目录
    }
  }
});
