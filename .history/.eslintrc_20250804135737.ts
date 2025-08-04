module.exports = {
  lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"', // 检查范围
  dev: {
    logLevel: ["error"], // 只显示错误
    overrideConfig: {
      // 开发环境覆盖规则
      rules: {
        "no-debugger": "off", // 开发允许debugger
      },
    },
  },
  build: {
    // 生产构建检查
    overrideConfig: {
      rules: {
        "no-console": "error", // 生产环境禁止console
      },
    },
  },
};
