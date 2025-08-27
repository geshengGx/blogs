import { storage, StorageType } from "./storage";
import { persist, PersistenceOptions } from "@/types/pinia";

interface MapItem {
  value: any; // 存储的值
  expire?: number; // 过期时间戳（毫秒）
  storage?: StorageType; // 存储值的类型（用于反序列化时判断）
}

const StateMap = new Map<string, MapItem>();

// 从存储中恢复状态到store
const hydrateStore = store => {
  let values = {};
  for (const Map of StateMap) {
    const key = Map[0];
    if (key.split("_")[0] === store.$id) {
      storage.changeOptions({ type: Map[1].storage });
      values = { ...values, ...storage.get(key) };
    }
  }
  store.$patch(values);
};

// 将store的状态持久化到存储中
const persistState = ({ storeId }, state) => {
  for (const Map of StateMap) {
    const key = Map[0];
    if (key.split("_")[0] === storeId) {
      Map[1].value = getState(filter(Object.keys(Map[1].value), Object.keys(state), 2), state);
      storage.changeOptions({ type: Map[1].storage });
      if (Map[1].expire) {
        storage.set(key, Map[1].value, Map[1].expire);
      } else {
        storage.set(key, Map[1].value);
      }
    }
  }
};

//存储各个存储字段配置
const setStateMap = (persist: persist, store) => {
  const state = store.$state;
  if (Array.isArray(persist)) {
    persist.forEach(item => {
      StateMap.set(`${store.$id}_${item.key}`, handleStateMap(item, state));
    });
  } else if (typeof persist === "object") {
    StateMap.set(`${store.$id}_${persist.key}`, handleStateMap(persist, state));
  } else if (typeof persist === "boolean") {
    StateMap.set(`${store.$id}`, { value: state, storage: StorageType.LOCAL });
  }
};

// 计算交集函数
const filter = (arr1, arr2, type = 1) => {
  // 使用Set和filter方法找出交集
  const set2 = new Set(arr2);
  return arr1.filter(item => (type == 1 ? !set2.has(item) : set2.has(item)));
};

// 获取state
const getState = (include: string[], state) => {
  const value = {};
  for (let i = 0; i < include.length; i++) {
    value[include[i]] = state[include[i]];
  }
  return value;
};

//  获取存储字段配置
const handleStateMap = (persist: PersistenceOptions, state): MapItem => {
  let include = [];
  if (persist.omit) {
    if (persist.pick) {
      include = filter(Object.keys(state), filter(persist.pick, persist.omit), 2);
    } else {
      include = filter(Object.keys(state), persist.omit);
    }
  } else if (persist.pick) {
    include = filter(Object.keys(state), persist.pick, 2);
  } else {
    include = Object.keys(state);
  }
  return {
    value: getState(include, state),
    storage: persist.storage || StorageType.LOCAL,
    expire: persist.expire
  };
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
  setStateMap(persist, store);

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
