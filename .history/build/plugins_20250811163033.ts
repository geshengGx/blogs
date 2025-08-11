import { PluginOption } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
//按需引入(图标地址：https://icon-sets.iconify.design/?category=General)
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
//原子化css
import UnoCSS from "unocss/vite";
//svg图标（SVG sprite处理）
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
//开发者工具
import NextDevTools from "vite-plugin-vue-devtools";
//添加代码定位功能（shift+alt+鼠标选中页面元素）
import { codeInspectorPlugin } from "code-inspector-plugin";
//添加jsx/tsx支持
import vueJsx from "@vitejs/plugin-vue-jsx";
//添加script标签name属性支持
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
//打包后依赖分析插件
import { visualizer } from "rollup-plugin-visualizer";
//提供向html中注入内容的能力
import { createHtmlPlugin } from "vite-plugin-html";
//添加pwa支持（pwa应用）在地址栏输入 chrome://apps/（Edge 是 edge://apps/）查看
import { VitePWA } from "vite-plugin-pwa";

export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_PWA, VITE_CODEINSPECTOR } = viteEnv;
  return [
    vue(),
    // devTools
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),
    // 自动 IDE 并将光标定位到 DOM 对应的源代码位置。see: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODEINSPECTOR &&
      codeInspectorPlugin({
        bundler: "vite"
      }),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true, emitFile: true }) as PluginOption),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    //错误检查
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
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // 启用 ESLint 配置生成
        filepath: "./.eslintrc-auto-import.js", // 生成的文件路径
        globalsPropValue: "readonly" // 设置全局变量为只读
      }
    }),
    Components({
      dirs: ["src/components"], // 目录src/components的组件会自动按需引入
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          prefix: "icon", // 可选，设置图标组件前缀
          // alias: {
          //   // 别名配置
          //   system: "mdi",
          //   file: "mdi-file"
          // },
          enabledCollections: ["mdi", "ri", "ep"], // 启用的图标集
          customCollections: ["local"] // **** 这里配置组件内需要使用的自定义集合名
        })
      ]
    }),
    Icons({
      autoInstall: true, // 自动安装图标集
      compiler: "vue3", // Vue 3 编译器
      scale: 1, // 缩放比例
      defaultStyle: "display: inline-block;", // 默认样式
      defaultClass: "icon", // 默认类名
      customCollections: {
        local: FileSystemIconLoader("src/assets/icons", svg => {
          // 自定义图标集加载器(解决无法自定义图标颜色，大小问题)
          return svg
            .replace(/fill=["'][^"']*["']/gi, "") // 移除 fill 属性
            .replace(/stroke=["'][^"']*["']/gi, "") // 移除 stroke 属性
            .replace(/width=["'][^"']*["']/gi, "") // 移除 width 属性
            .replace(/height=["'][^"']*["']/gi, "") // 移除 height 属性
            .replace(/<svg /, '<svg fill="currentColor" '); // 添加 currentColor
        }) //配置自定义集合的路径库
      }
    }),
    //使用svg图标
    createSvgIconsPlugin({
      // 本地图标目录
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      // 本地图标ID格式
      symbolId: "local-[dir]-[name]",
      // 优化SVG
      svgoOptions: {
        //解决无法自定义图标颜色，大小问题
        plugins: [
          {
            name: "removeAttrs",
            params: { attrs: ["fill", "stroke", "width", "height"] }
          }
        ]
      }
    }),
    UnoCSS()
  ];
};

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    // 开发环境配置
    devOptions: {
      enabled: true, // 开发环境启用PWA功能，方便调试
      type: "module", // 使用ES模块类型的Service Worker
      navigateFallback: "index.html" // 离线时回退的页面
    },
    workbox: {
      // 添加此项配置，增加需要缓存的最大文件大小
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
    },
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};
