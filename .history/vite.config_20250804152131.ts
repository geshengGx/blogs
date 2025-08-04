import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint"; //导入包

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src", // 配置@指向src目录
    },
  },
});
