/**
 * 创建 Pinia 实例
 */

import { createPinia } from "pinia";
import createPersistedState from "./helper/uPersist";

const pinia = createPinia();
pinia.use(createPersistedState);

export default pinia;
