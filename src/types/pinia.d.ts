//自定义持久化类型

import "pinia";

import { StateTree } from "pinia";
import { Path } from "@/types/path";
import { StorageType } from "@/stores/helper/storage";

interface Persistence<State extends StateTree = StateTree> {
  key: string; // 持久化key
  storage?: StorageType; // 持久化存储
  pick?: Path<State>[] | string[]; // 持久化字段
  omit?: Path<State>[] | string[]; // 不持久化字段
  expire?: number; // 过期时间
}

type PersistenceOptions<State extends StateTree = StateTree> = Partial<Persistence<State>>;
type persist<State extends StateTree = StateTree> = boolean | PersistenceOptions<State> | PersistenceOptions<State>[];

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: persist<S>;
  }
  interface PiniaCustomProperties {
    /**
     * Hydrate store from configured storage
     * Warning: this is for advances usecases, make sure you know what you're doing
     */
    $hydrate: (opts?: { runHooks?: boolean }) => void;
    /**
     * Persist store into configured storage
     * Warning: this is for advances usecases, make sure you know what you're doing
     */
    $persist: () => void;
  }
}

export type { Persistence, PersistenceOptions, persist };
