// import { destr } from "destr";
import { storage } from "./storage";
import type { PersistenceOptions } from "@/types/pinia";

const StateMap = new Map<string, PersistenceOptions>();

// 从存储中恢复状态到store
const hydrateStore = store => {
  if (StateMap.size === 0) {
    const state = storage.get(store.$id);
    if (state) {
      store.$patch(state);
    }
  } else {
    let values = {};
    for (const MapKey of StateMap.keys()) {
      const Map = StateMap.get(MapKey);
      const Key = `${store.$id}_${Map.key}`;
      const value = storage.get(Key);
      if (value) {
        values = { ...values, ...value };
      }
    }
    store.$patch(values);
  }
};

// 将store的状态持久化到存储中
const persistState = ({ storeId }, state) => {
  if (StateMap.size === 0) {
    storage.set(storeId, state);
    return;
  }
  for (const MapKey of StateMap.keys()) {
    const Map = StateMap.get(MapKey);
    const include = getState(Map, state);
    const Key = `${storeId}_${Map.key}`;
    const value = {};
    for (const store in include) {
      value[include[store]] = state[include[store]];
    }

    if (Map.storage) {
      storage.changeOptions({ type: Map.storage });
    }

    if (Map.expire) {
      storage.set(Key, value, Map.expire);
    } else {
      storage.set(Key, value);
    }
  }
};

//存储各个存储字段配置
const setStateMap = persist => {
  if (Array.isArray(persist)) {
    for (let i = 0; i < persist.length; i++) {
      const item = persist[i];
      StateMap.set(item.key, item);
    }
  } else if (typeof persist === "object") {
    StateMap.set(persist.key, persist);
  }
};

//获取要保存的数据
const getState = (map, state) => {
  const include = [];

  if (map.omit) {
    if (map.pick) {
      include.push(...map.pick.filter(item => !map.omit.includes(item)));
    } else {
      include.push(...Object.keys(state).filter(item => !map.omit.includes(item)));
    }
  } else if (map.pick) {
    include.push(...map.pick);
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
  setStateMap(persist);

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
