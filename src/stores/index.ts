/**
 * 创建 Pinia 实例
 */

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate"; // 引入持久化插件

const pinia = createPinia();
pinia.use(createPersistedState());
