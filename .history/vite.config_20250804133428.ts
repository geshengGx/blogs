import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint"; // 引入ESLint插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      cache: false, // 禁用缓存确保实时检查
      include: ["src/**/*.ts", "src/**/*.vue"], // 检查范围
    }),
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src", // 配置@指向src目录
    },
  },
});
