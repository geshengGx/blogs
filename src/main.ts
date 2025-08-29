import { createApp } from "vue";
import "@/styles/reset.scss"; // 重置样式
import "@/styles/element.scss"; // 引入element-plus（自定义）样式
import "virtual:uno.css"; // 引入UnoCSS
import "virtual:svg-icons-register"; // 引入svg图标
import "@/assets/iconfont/iconfont.css"; // 引入iconfont图标

import router from "@/routers"; // 引入路由
import pinia from "@/stores"; // 引入pinia

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
