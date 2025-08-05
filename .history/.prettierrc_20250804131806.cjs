module.exports = {
  // 每行最大字符数（超过则换行）
  printWidth: 100,

  // 缩进空格数
  tabWidth: 2,

  // 使用空格而非制表符
  useTabs: false,

  // 语句结尾不加分号
  semi: false,

  // 使用单引号
  singleQuote: true,

  // 对象属性引号按需添加
  quoteProps: "as-needed",

  // JSX中使用双引号
  jsxSingleQuote: false,

  // 无尾随逗号
  trailingComma: "none",

  // 对象括号空格：{ foo: bar }
  bracketSpacing: true,

  // HTML元素结束标签换行显示
  bracketSameLine: false,

  // 箭头函数单参数省略括号：x => x
  arrowParens: "avoid",

  // Vue文件中缩进<script>和<style>
  vueIndentScriptAndStyle: true,

  // 自动识别换行符（兼容不同系统）
  endOfLine: "auto",

  // HTML元素空白敏感处理
  htmlWhitespaceSensitivity: "ignore",

  // 文件覆盖配置
  overrides: [
    // JSON文件特殊配置
    {
      files: "*.json",
      options: {
        printWidth: 80 // 较小的行宽，因为JSON结构通常较深
      }
    },
    // Markdown文件特殊配置
    {
      files: "*.md",
      options: {
        proseWrap: "always", // 始终换行
        tabWidth: 4 // 使用4空格缩进
      }
    },
    // 配置文件特殊处理
    {
      files: ["*.yaml", "*.yml"],
      options: {
        singleQuote: false // YAML通常使用双引号
      }
    }
  ]
};
