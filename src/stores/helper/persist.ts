/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */

import type { PersistenceOptions } from "pinia-plugin-persistedstate";

export const piniaPersistConfig = (key: string, pick?: string[]): PersistenceOptions => {
  return {
    key,
    storage: localStorage,
    pick
  };
};
