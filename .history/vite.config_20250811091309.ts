import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { wrapperEnv } from "./build/getEnv";
import { createProxy } from "./build/proxy";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); // 获取当前工作目录
  const env = loadEnv(mode, root); // 根据当前工作目录加载.env文件
  const viteEnv = wrapperEnv(env); // 包装环境变量
  return {
    base: "./",
    root,
    // 解析配置（路径别名）
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src") // 配置@指向src目录
      }
    },
    // 插件配置
    plugins: [...createVitePlugins(viteEnv)],
    // 开发服务器配置
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true
      // Load proxy configuration from .env.development
      // proxy: createProxy(viteEnv.VITE_PROXY)
    }
  };
});
