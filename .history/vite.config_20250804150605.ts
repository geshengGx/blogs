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
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"' // 检查范围
      },
      // === TypeScript检查 ===
      typescript: true
    })
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src" // 配置@指向src目录
    }
  }
});
