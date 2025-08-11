// postcss.config.js
// import postcssImport from "postcss-import";
// import postcssPxtorem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";

module.exports = {
  plugins: [
    // postcssImport(), // 引入模块(允许您使用@import语句将其他样式表导入到主样式表中)
    // postcssPxtorem({
    //   rootValue: 16, // 基础字体大小
    //   propList: ["*", "!border*", "!box-shadow"], // 所有属性都转换，但排除边框和阴影
    //   //   exclude: /node_modules\/element-plus/, // 排除 Element Plus
    //   //   selectorBlackList: ["el-", "is-"], // 排除 Element Plus 相关类名
    //   minPixelValue: 2, // 最小转换像素值
    //   mediaQuery: false // 禁止在媒体查询中转换
    // }),
    autoprefixer() // 添加浏览器前缀
  ]
};
