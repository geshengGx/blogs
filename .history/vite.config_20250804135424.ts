import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      // === ESLint配置 ===
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"', // 检查范围
        dev: {
          logLevel: ["error"], // 只显示错误
          overrideConfig: {},
        },
        build: {
          // 生产构建检查
          overrideConfig: {
            rules: {
              "no-console": "error", // 生产环境禁止console
            },
          },
        },
      },

      // === TypeScript检查 ===
      typescript: {
        tsconfigPath: "./tsconfig.json", // 指定配置
        buildMode: true, // 构建时也检查
      },

      // === 其他配置 ===
      overlay: {
        // 错误遮罩层
        position: "br", // 右下角显示
        initialIsOpen: false, // 不自动弹出
      },
      enableBuild: true, // 构建时启用检查
    }),
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src", // 配置@指向src目录
    },
  },
});
