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
        lintCommand: 'stylelint --allow-empty-input "./src/**/*.{css,scss,vue}"'
      },
      //   overlay: {
      //     initialIsOpen: false
      //   },
      overlay: {
        initialIsOpen: "error",
        position: "br",
        badgeStyle: `
        background-color:rgb(15, 219, 49);
        color: white;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      `,
        panelStyle: `
        max-height: 70vh;
        overflow-y: auto;
        background-color: rgba(25, 23, 28, 0.95);
        color: #e0def4;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        font-family: 'SF Mono', Menlo, monospace;
        font-size: 13px;
      `
      },
      typescript: true,
      vueTsc: true
    })
  ];
};
