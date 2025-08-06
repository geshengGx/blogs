import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      // TypeScript 检查
      typescript: true, // 使用默认配置

      // ESLint 检查
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"', // 检查的文件
        dev: { logLevel: ["error"] } // 开发时只显示错误
      },

      // Vue SFC 类型检查
      vueTsc: true, // 使用默认配置

      // 通用配置
      enableBuild: true, // 构建时也检查
      overlay: { initialIsOpen: false }, // 错误覆盖层初始不打开
      terminal: true // 在终端显示错误
    })
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 配置@指向src目录
    }
  }
});
