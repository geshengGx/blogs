// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  // 配置项
  content: {
    pipeline: {
      exclude: ["node_modules", "dist", ".git", ".husky", ".vscode", "public", "build"] // 排除不需要扫描的目录
    }
  },
  // 预设集合
  presets: [
    // 核心预设 - 提供Tailwind类似的实用类
    presetWind3(),

    // 属性化模式 - 允许将类写为HTML属性
    presetAttributify(),

    // 图标预设 - 支持Iconify图标库
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      }
    }),

    // 排版预设 - 提供文本排版工具
    presetTypography(),

    // Web字体预设 - 轻松添加Google Fonts
    presetWebFonts({
      fonts: {
        sans: "Roboto",
        mono: ["Fira Code", "Fira Mono:400,700"],
        lobster: "Lobster"
      }
    })
  ],

  // 转换器
  transformers: [
    // 支持指令语法（如@apply）
    transformerDirectives(),

    // 支持变体组语法（如hover:(bg-blue-500 text-white)）
    transformerVariantGroup()
  ],
  //变体
  // variants: [],
  // 自定义规则
  rules: [
    // 自定义阴影规则
    [/^shadow-(\d+)$/, ([, d]) => ({ "box-shadow": `0 ${d}px ${Number(d) * 2}px rgba(0,0,0,0.1)` })],

    // 文本渐变规则
    [
      /^text-gradient-(.*)$/,
      ([, c]) => {
        const colors = c.split("-");
        return {
          "background-image": `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent"
        };
      }
    ]
  ],

  // 快捷方式
  shortcuts: [
    // 静态快捷方式
    ["btn", "px-4 py-2 rounded font-medium transition-colors duration-200"],
    ["card", "p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"],
    ["responsive-layout", "flex flex-col md:flex-row"],
    ["icon-btn", "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"],
    //布局
    [
      /^layout-(.*)$/,
      ([, c], { theme }) => {
        return `flex ${theme.breakpoints[c]}`;
      }
    ]
  ],

  // 主题配置
  theme: {
    colors: {
      primary: {
        DEFAULT: "#3B82F6",
        light: "#93C5FD",
        dark: "#1D4ED8"
      },
      secondary: {
        DEFAULT: "#10B981",
        light: "#6EE7B7",
        dark: "#047857"
      }
    },
    breakpoints: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  },

  // 安全列表 - 确保某些类始终生成
  safelist: ["i-mdi-home", "i-mdi-account", ...Array.from({ length: 5 }, (_, i) => `text-gradient-blue-${i + 1}00`)]
});
