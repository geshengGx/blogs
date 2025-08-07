import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); // 获取当前工作目录
  const env = loadEnv(mode, root); // 根据当前工作目录加载.env文件
  return {
    base: "./",
    root,
    plugins: [...createVitePlugins()],
    // 解析配置（路径别名）
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src") // 配置@指向src目录
      }
    }
  };
});
