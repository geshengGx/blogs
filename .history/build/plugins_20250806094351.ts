import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
//按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export const createVitePlugins = () => {
  return [
    vue(),
    checker({
      // 实时检查
      // ESLint 检查
      eslint: {
        useFlatConfig: true, // 很重要，使用eslint9必须配置，不然会报错
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"' // 检查的文件
      },
      // Stylelint 检查
      stylelint: {
        lintCommand: 'stylelint --allow-empty-input "./src/**/*.{css,scss,vue}"'
      },
      overlay: {
        initialIsOpen: false
      },
      typescript: true,
      vueTsc: true
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ];
};
