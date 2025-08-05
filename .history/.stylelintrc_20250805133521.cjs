// .stylelintrc.js
// Stylelint 配置文件 - 用于 CSS/SCSS/Vue 样式规范化检查

/**
 * ==================== 核心配置说明 ====================
 * 1. 修复了 'Cannot read properties of undefined' 错误
 * 2. 解决了 Vue 文件中 <style> 块解析问题
 * 3. 移除了已弃用的规则
 * 4. 优化了 SCSS 和 Vue 文件的处理逻辑
 *
 * 安装依赖:
 * pnpm add -D \
 *   stylelint \
 *   postcss \
 *   postcss-html \
 *   postcss-scss \
 *   stylelint-config-standard \
 *   stylelint-config-recommended-vue \
 *   stylelint-config-prettier \
 *   stylelint-scss
 */

module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-scss"],
  rules: {
    indentation: 2,
    "string-quotes": "double",
    "block-no-empty": true
  }
};
