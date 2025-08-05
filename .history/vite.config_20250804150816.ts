import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      silent: false, // 是否显示错误日志，默认为 false，即显示
      typescript: true, // 开启 TypeScript 检查
      eslint: {
        enabled: true, // 开启 ESLint 检查
        filepath: "./src/**/*.js" // 设置检查文件路径，可以根据需求调整
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
