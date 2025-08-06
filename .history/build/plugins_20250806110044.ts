import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
//按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
      imports: ["vue", "vue-router"], //自动引入vue和vue-router
      resolvers: [
        ElementPlusResolver(),
         // 自动注册图标组件
        IconsResolver({
          prefix: 'icon', // 可选，设置图标组件前缀
          alias: {
            // 别名配置
            'system': 'mdi',
            'file': 'mdi-file',
          },
          enabledCollections: ['mdi', 'ri'] // 启用的图标集
        })
      ],
      ,
    Icons({
      autoInstall: true, // 自动安装图标集
      compiler: 'vue3', // Vue 3 编译器
      scale: 1, // 缩放比例
      defaultStyle: 'display: inline-block;', // 默认样式
      defaultClass: 'icon', // 默认类名
    }),
      eslintrc: {
        enabled: true, // 启用 ESLint 配置生成
        filepath: "./.eslintrc-auto-import.js", // 生成的文件路径
        globalsPropValue: "readonly" // 设置全局变量为只读
      }
    }),
    Components({
      dirs: ["src/components"], // 目录src/components的组件会自动按需引入
      resolvers: [ElementPlusResolver()]
    })
  ];
};
