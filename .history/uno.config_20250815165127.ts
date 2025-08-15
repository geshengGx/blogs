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
    ["layout", "w-100vw h-100vh bg-gray-100 dark:bg-gray-900 "],
    ["card", "p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"],
    ["wh-full", "w-full h-full"],
    ["flex-center", "flex justify-center items-center"],
    ["flex-col-center", "flex-center flex-col"],
    ["flex-x-center", "flex justify-center"],
    ["flex-y-center", "flex items-center"],
    ["i-flex-center", "inline-flex justify-center items-center"],
    ["i-flex-x-center", "inline-flex justify-center"],
    ["i-flex-y-center", "inline-flex items-center"],
    ["flex-col", "flex flex-col"],
    ["flex-col-stretch", "flex-col items-stretch"],
    ["i-flex-col", "inline-flex flex-col"],
    ["i-flex-col-stretch", "i-flex-col items-stretch"],
    ["flex-1-hidden", "flex-1 overflow-hidden"],
    ["absolute-lt", "absolute left-0 top-0"],
    ["absolute-lb", "absolute left-0 bottom-0"],
    ["absolute-rt", "absolute right-0 top-0"],
    ["absolute-rb", "absolute right-0 bottom-0"],
    ["absolute-tl", "absolute-lt"],
    ["absolute-tr", "absolute-rt"],
    ["absolute-bl", "absolute-lb"],
    ["absolute-br", "absolute-rb"],
    ["absolute-center", "absolute-lt flex-center wh-full"],
    ["fixed-lt", "fixed left-0 top-0"],
    ["fixed-lb", "fixed left-0 bottom-0"],
    ["fixed-rt", "fixed right-0 top-0"],
    ["fixed-rb", "fixed right-0 bottom-0"],
    ["fixed-tl", "fixed-lt"],
    ["fixed-tr", "fixed-rt"],
    ["fixed-bl", "fixed-lb"],
    ["fixed-br", "fixed-rb"],
    ["fixed-center", "fixed-lt flex-center wh-full"],
    ["nowrap-hidden", "whitespace-nowrap overflow-hidden"],
    ["ellipsis-text", "nowrap-hidden text-ellipsis"],
    ["transition-base", "transition-all duration-300 ease-in-out"],
    [
      /^border-(.*)$/,
      ([, c]) => {
        if (c === "full") return `b-1 b-solid b-blueGray-2`;
        return `b-${c}-1 b-${c}-solid b-${c}-blueGray-2`;
      }
    ]
  ],

  // 主题配置
  theme: {
    colors: {
      primary: "rgb(var(--primary-color))",
      primary_hover: "rgb(var(--primary-color-hover))",
      primary_pressed: "rgb(var(--primary-color-pressed))",
      primary_active: "rgba(var(--primary-color-active),0.1)",
      primary_1: "rgb(var(--primary-color1))",
      primary_2: "rgb(var(--primary-color2))",
      primary_3: "rgb(var(--primary-color3))",
      primary_4: "rgb(var(--primary-color4))",
      primary_5: "rgb(var(--primary-color5))",
      primary_6: "rgb(var(--primary-color6))",
      primary_7: "rgb(var(--primary-color7))",
      primary_8: "rgb(var(--primary-color8))",
      primary_9: "rgb(var(--primary-color9))",
      info: "rgb(var(--info-color))",
      info_hover: "rgb(var(--info-color-hover))",
      info_pressed: "rgb(var(--info-color-pressed))",
      info_active: "rgb(var(--info-color-active),0.1)",
      success: "rgb(var(--success-color))",
      success_hover: "rgb(var(--success-color-hover))",
      success_pressed: "rgb(var(--success-color-pressed))",
      success_active: "rgb(var(--success-color-active),0.1)",
      warning: "rgb(var(--warning-color))",
      warning_hover: "rgb(var(--warning-color-hover))",
      warning_pressed: "rgb(var(--warning-color-pressed))",
      warning_active: "rgb(var(--warning-color-active),0.1)",
      error: "rgb(var(--error-color))",
      error_hover: "rgb(var(--error-color-hover))",
      error_pressed: "rgb(var(--error-color-pressed))",
      error_active: "rgb(var(--error-color-active),0.1)",
      dark: "#141414"
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
