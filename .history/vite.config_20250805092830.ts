import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    checker({
      // 核心检查器
      typescript: true,
      // typescriptPath: './typescript', // 指定本地 TS 路径 :cite[3]
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"'
        // exclude: ['**/node_modules/**'],
      },
      vueTsc: true, // Vue SFC 类型检查 :cite[7]
      stylelint: {
        lintCommand: 'stylelint "src/**/*.{css,scss}"'
      },
      // 通用行为
      enableBuild: true,
      overlay: { initialIsOpen: false },
      terminal: true
      // 性能优化
      // maxBuffer: 2048 * 1024, // 大型项目缓冲区扩容 :cite[3]
    })
  ],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": "/src" // 配置@指向src目录
    }
  }
});
