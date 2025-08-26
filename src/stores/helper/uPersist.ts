import { storage, StorageType } from "./storage";
import type { PersistenceOptions } from "@/types/pinia";

const StateMap = new Map<string, PersistenceOptions>();

// 从存储中恢复状态到store
const hydrateStore = store => {
  let values = {};
  for (const MapKey of StateMap.keys()) {
    if (MapKey.split("_")[0] === store.$id) {
      const Map = StateMap.get(MapKey);
      const Key = `${store.$id}_${Map.key}`;
      storage.changeOptions({ type: Map.storage || StorageType.LOCAL });
      const value = storage.get(Key);
      if (value) {
        values = { ...values, ...value };
      }
    }
  }
  store.$patch(values);
};

// 将store的状态持久化到存储中
const persistState = ({ storeId }, state) => {
  for (const MapKey of StateMap.keys()) {
    if (MapKey.split("_")[0] === storeId) {
      const Map = StateMap.get(MapKey);
      const include = getState(Map, state);
      const value = {};
      for (const store in include) {
        value[include[store]] = state[include[store]];
      }

      storage.changeOptions({ type: Map.storage || StorageType.LOCAL });

      if (Map.expire) {
        storage.set(MapKey, value, Map.expire);
      } else {
        storage.set(MapKey, value);
      }
    }
  }
};

//存储各个存储字段配置
const setStateMap = (persist, storeId) => {
  if (Array.isArray(persist)) {
    for (let i = 0; i < persist.length; i++) {
      const item = persist[i];
      StateMap.set(`${storeId}_${item.key}`, item);
    }
  } else if (typeof persist === "object") {
    StateMap.set(`${storeId}_${persist.key}`, persist);
  } else {
    StateMap.set(storeId, persist);
  }
};

//获取要保存的数据
const getState = (map, state) => {
  const include = [];
  if (map.omit) {
    if (map.pick) {
      include.push(...map.pick.filter(item => !map.omit.includes(item) && state[item] !== undefined));
    } else {
      include.push(...Object.keys(state).filter(item => !map.omit.includes(item)));
    }
  } else if (map.pick) {
    include.push(...map.pick.filter(item => state[item] !== undefined));
  } else {
    include.push(...Object.keys(state));
  }
  return include;
};

// 创建持久化的功能
const createPersistedState = (context?) => {
  const {
    store,
    options: { persist = true }
  } = context;

  // 如果不需要持久化，直接返回
  if (!persist) return;

  // 获取持久化配置
  setStateMap(persist, store.$id);

  // 将数据从存储中恢复状态到store
  hydrateStore(store);

  // 数据变化时，持久化store的状态
  store.$subscribe(
    (_mutation, state) => {
      persistState(_mutation, state);
    },
    { detached: true }
  );
};

export default createPersistedState;
