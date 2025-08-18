import { PluginOption } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker"; //导入包
//按需引入(图标地址：https://icon-sets.iconify.design/)
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
//添加压缩功能
import viteCompression from "vite-plugin-compression";

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
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true, emitFile: true }),
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
    // 创建打包压缩配置
    createCompression(viteEnv),
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
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        algorithm: "gzip", // 压缩算法
        ext: ".gz", // 生成的文件扩展名
        threshold: 10240, // 仅压缩大于 10KB 的文件
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, // 是否删除原始文件
        compressionOptions: { level: 9 } // 压缩级别，1-9，越高压缩率越大
        // filter: /.(js|css|json|html|ico|svg)(\?.*)?$/i // 过滤文件类型(指定哪些资源不压缩)
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        algorithm: "brotliCompress", // 压缩算法
        ext: ".br", // 生成的文件扩展名
        threshold: 10240, // 仅压缩大于 10KB 的文件
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, // 是否删除原始文件
        compressionOptions: { level: 9 } // 压缩级别，1-9，越高压缩率越大
        // filter: /.(js|css|json|html|ico|svg)(\?.*)?$/i // 过滤文件类型(指定哪些资源不压缩)
      })
    );
  }
  return plugins;
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

// VitePWA({
//       // 注册方式配置
//       injectRegister: 'auto', // 自动在index.html中注入注册代码（'auto'|'script'|'inline'|null）
//       registerType: 'autoUpdate', // Service Worker更新策略：'autoUpdate'后台自动更新 | 'prompt'更新时提示用户

//       // 开发环境配置
//       devOptions: {
//         enabled: true, // 开发环境启用PWA功能，方便调试
//         type: 'module', // 使用ES模块类型的Service Worker
//         navigateFallback: 'index.html' // 离线时回退的页面
//       },

//       // 包含的静态资源
//       includeAssets: [
//         'logo.svg',
//         'apple-touch-icon.png', // iOS主屏幕图标
//         'mask-icon.svg', // Safari标签页图标
//         'favicon.png', // 传统favicon
//         'robots.txt', // 搜索引擎爬虫规则
//         'sitemap.xml' // 网站地图
//       ],

//       // PWA清单配置
//       manifest: {
//         name: '标题日记', // 完整应用名称
//         short_name: '日记', // 主屏幕显示名称（12字符内为佳）
//         description: '记录每日生活的标题日记应用', // 应用描述（强烈建议添加）

//         // 主题色配置（需与index.html中的theme-color meta标签一致）
//         theme_color: '#373737', // 应用主题色
//         background_color: '#373737', // 启动屏背景色

//         // 启动配置
//         start_url: './', // 启动时加载的URL
//         display: 'standalone', // 显示模式：standalone(全屏) | minimal-ui | fullscreen
//         orientation: 'portrait-primary', // 屏幕方向：portrait-primary(竖屏为主)

//         // 图标配置 - 必须包含多种尺寸（最佳实践）
//         icons: [
//           // SVG矢量图标（推荐）
//           {
//             src: 'logo.svg',
//             sizes: '512x512',
//             type: 'image/svg+xml',
//             purpose: 'any maskable', // 支持任意场景和自适应图标
//           },
//           // iOS专用图标（PNG格式）
//           {
//             src: 'appicon-apple.png',
//             sizes: '180x180', // iOS要求尺寸
//             type: 'image/png',
//             purpose: 'apple touch icon', // iOS主屏幕图标
//           },
//           // Android图标集（必须包含多种尺寸）
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//             purpose: 'any maskable',
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable',
//           },
//           // 小尺寸图标（用于浏览器UI）
//           {
//             src: 'pwa-64x64.png',
//             sizes: '64x64',
//             type: 'image/png',
//             purpose: 'any',
//           }
//         ],

//         // 添加截图展示（应用商店优化）
//         screenshots: [
//           {
//             src: 'screenshot1.png',
//             sizes: '1080x1920',
//             type: 'image/png',
//             form_factor: 'narrow', // 手机竖屏
//             label: '日记列表页'
//           },
//           {
//             src: 'screenshot2.png',
//             sizes: '1920x1080',
//             type: 'image/png',
//             form_factor: 'wide', // 平板/电脑横屏
//             label: '日记编辑页'
//           }
//         ],

//         // 功能类别（应用商店分类）
//         categories: ['productivity', 'lifestyle'],

//         // 快捷方式（Android 8.0+）
//         shortcuts: [
//           {
//             name: '新建日记',
//             short_name: '新建',
//             description: '创建一篇新日记',
//             url: '/new-entry',
//             icons: [{ src: 'shortcut-new.png', sizes: '96x96' }]
//           },
//           {
//             name: '查看日历',
//             url: '/calendar',
//             icons: [{ src: 'shortcut-calendar.png', sizes: '96x96' }]
//           }
//         ]
//       },

//       // Service Worker和缓存策略配置
//       workbox: {
//         globPatterns: [
//           '**/*.{js,css,html}',
//           '**/*.{svg,png,jpg,gif}',
//           '**/*.{woff2,ttf}'
//         ],
//         runtimeCaching: [
//           // API请求缓存策略
//           {
//             urlPattern: ({ url }) => url.pathname.startsWith('/api'),
//             handler: 'NetworkFirst', // 优先网络，失败时使用缓存
//             options: {
//               cacheName: 'api-cache',
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 24 * 60 * 60 // 24小时
//               },
//               networkTimeoutSeconds: 10 // 超时时间
//             }
//           },
//           // 图片资源缓存策略
//           {
//             urlPattern: ({ request }) => request.destination === 'image',
//             handler: 'CacheFirst', // 优先使用缓存
//             options: {
//               cacheName: 'image-cache',
//               expiration: {
//                 maxEntries: 100,
//                 maxAgeSeconds: 30 * 24 * 60 * 60 // 30天
//               }
//             }
//           }
//         ],
//         // 跳过等待阶段（确保新SW立即激活）
//         skipWaiting: true,
//         clientsClaim: true,
//         // 预缓存忽略列表
//         navigateFallbackDenylist: [
//           /^\/api/, // 不缓存API路由
//           /^\/admin/ // 不缓存管理后台
//         ]
//       },

//       // 高级功能配置
//       selfDestroying: true, // 新版本发布时自动清理旧Service Worker
//       outDir: 'dist', // 构建输出目录（与Vite配置一致）
//       disable: false, // 是否禁用插件

//       // 自定义提示信息（本地化）
//       manifestFilename: 'manifest.webmanifest', // 清单文件名
//       useCredentials: true, // 在跨域请求中发送凭据
//       strategies: 'generateSW', // 使用自动生成的Service Worker
//     })
//   ],
// })
