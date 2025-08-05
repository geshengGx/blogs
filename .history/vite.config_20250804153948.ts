import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      // typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}" --fix --max-warnings 0'
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
