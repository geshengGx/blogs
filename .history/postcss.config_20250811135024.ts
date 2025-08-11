// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-pxtorem")({
      rootValue: 16, // 基础字体大小
      propList: ["*", "!border*", "!box-shadow"], // 所有属性都转换，但排除边框和阴影
      exclude: /node_modules\/element-plus/, // 排除 Element Plus
      selectorBlackList: ["el-", "is-"], // 排除 Element Plus 相关类名
      minPixelValue: 2, // 最小转换像素值
      mediaQuery: false // 禁止在媒体查询中转换
    }),
    require("autoprefixer")()
  ]
};
