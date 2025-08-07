import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [...createVitePlugins()],
    // 解析配置（路径别名）
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src") // 配置@指向src目录
      }
    }
  };
});
