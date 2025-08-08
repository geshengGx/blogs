/**
 * @description  全局类型定义
 */

import "";

// vite 环境变量类型
declare interface ViteEnv {
  VITE_USER_NODE_ENV: "development" | "production" | "test"; // 环境变量
  VITE_GLOB_APP_TITLE: string; // 项目名称
  VITE_PORT: number; // 端口号
  VITE_OPEN: boolean; // 是否自动打开浏览器
  VITE_REPORT: boolean; // 是否生成性能报告
  VITE_ROUTER_MODE: "hash" | "history"; // 路由模式
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none"; // 构建压缩类型
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean; // 构建压缩是否删除源文件
  VITE_DROP_CONSOLE: boolean; // 构建时是否删除console
  VITE_PWA: boolean; // 是否启用pwa
  VITE_DEVTOOLS: boolean; // 是否启用vite devtools
  VITE_PUBLIC_PATH: string; // 静态资源路径
  VITE_API_URL: string; // api 请求地址
  VITE_PROXY: [string, string][]; // 代理
  VITE_CODEINSPECTOR: boolean; // 是否启用代码检查
}

// interface ImportMetaEnv extends ViteEnv {
//   __: unknown;
// }

// export { ViteEnv };
