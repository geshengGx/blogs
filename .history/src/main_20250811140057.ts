import { createApp } from "vue";
import "@/styles/reset.scss"; // 重置样式
import "virtual:uno.css"; // 引入UnoCSS
import "virtual:svg-icons-register"; // 引入svg图标
import "amfe-flexible"; // 引入amfe-flexible(根据设备宽度动态设置html的font-size)

// 引入全局样式
import "./styles/base.scss";
import "./styles/element-variables.scss";
import "./styles/responsive.scss";

import App from "./App.vue";

createApp(App).mount("#app");
