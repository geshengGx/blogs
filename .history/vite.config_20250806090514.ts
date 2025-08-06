import { defineConfig } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";

// https://vite.dev/config/
export default defineConfig({
  plugins: [...createVitePlugins()],

  // 解析配置（路径别名）
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 配置@指向src目录
    }
  }
});
