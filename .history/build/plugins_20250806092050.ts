import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
export const createVitePlugins = () => {
  return [
    vue(),
    checker({
      // ESLint 检查
      eslint: {
        useFlatConfig: true, // 很重要，使用eslint9必须配置，不然会报错
        lintCommand: 'eslint "./src/**/*.{js,ts,vue}"' // 检查的文件
      },
          stylelint: {
      watchPath: ["./src/**/*.{css,scss,vue}", "./assets/**/*.css"],
      lintCommand: 'stylelint --allow-empty-input "src/**/*.{css,scss,vue}"',
      dev: {
        overrideConfig: {
          rules: {
            "no-empty-source": null,
            "selector-max-id": null
          }
        },
        logLevel: ["error", "warning"]
      }
    }
      overlay: {
        initialIsOpen: false
      },
      typescript: true,
      vueTsc: true
    })
  ];
};
