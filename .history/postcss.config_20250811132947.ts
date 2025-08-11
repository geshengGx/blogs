// postcss.config.js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16, // 基础字体大小
      propList: ["*"], // 所有属性都转换
      //   exclude: /node_modules\/element-plus/, // 排除 Element Plus
      //   selectorBlackList: ["el-"], // 排除所有 el- 开头的类名
      minPixelValue: 2 // 最小转换像素值
    }
  }
};
