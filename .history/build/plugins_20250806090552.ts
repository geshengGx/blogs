import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
export const createVitePlugins = () => {
  return [
    vue(),
    checker({
      // ESLint 检查
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"' // 检查的文件
      }
    })
  ];
};
