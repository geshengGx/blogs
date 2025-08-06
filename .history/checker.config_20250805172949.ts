// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; // 导入 Checker 类型（如果可用）

// 如果 Checker 类型不可用，我们也可以不用显式类型，让 TS 推断
export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const isProduction = mode === "production";

  // 使用内联配置，避免使用未导出的类型
  const checkerConfig = {
    // ===== 共享配置 =====
    root: process.cwd(),
    enableBuild: !isProduction,
    terminal: true,
    overlay: {
      initialIsOpen: "error",
      position: "br",
      badgeStyle: `
        background-color: #ff5c57;
        color: white;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      `,
      panelStyle: `
        max-height: 70vh;
        overflow-y: auto;
        background-color: rgba(25, 23, 28, 0.95);
        color: #e0def4;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        font-family: 'SF Mono', Menlo, monospace;
        font-size: 13px;
      `
    },

    // ===== 检查器配置 =====
    typescript: {
      tsconfigPath: "./tsconfig.app.json",
      root: process.cwd(),
      buildMode: isDev ? false : true
    },

    vueTsc: {
      tsconfigPath: "./tsconfig.vue.json",
      root: process.cwd(),
      buildMode: isDev ? false : true
    },

    eslint: {
      watchPath: ["./src/**/*.{js,ts,vue}", "./*.{js,ts}"],
      lintCommand: 'eslint --max-warnings=0 "./src/**/*.{js,ts,vue}"',
      useFlatConfig: false,
      dev: {
        overrideConfig: {
          env: {
            browser: true,
            es2022: true,
            node: true
          },
          parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            extraFileExtensions: [".vue"]
          },
          rules: {
            "no-console": isProduction ? "error" : "off"
          }
        },
        logLevel: ["error", "warning"]
      }
    },

    stylelint: {
      watchPath: ["./src/**/*.{css,scss,vue}", "./assets/**/*.css"],
      lintCommand: 'stylelint --allow-empty-input "src/**/*.{css,scss,vue}"',
      dev: {
        overrideConfig: {
          rules: {
            "no-empty-source": null,
            "selector-max-id": null
          }
        },
        logLevel: ["error", "warning"]
      }
    }
  };

  return {
    plugins: [vue(), isProduction ? null : checker(checkerConfig)].filter(Boolean)
  };
});
