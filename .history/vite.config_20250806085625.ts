import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      // ESLint 检查
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"' // 检查的文件
      }
    })
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 配置@指向src目录
    }
  }
});
