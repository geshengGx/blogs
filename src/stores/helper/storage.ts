/**
 * 存储类型枚举
 */
export enum StorageType {
  LOCAL = "localStorage",
  SESSION = "sessionStorage",
  MEMORY = "memoryStorage"
}

/**
 * 存储项接口
 */
interface StorageItem<T = any> {
  value: T; // 存储的值
  expire?: number; // 过期时间戳（毫秒）
  type?: string; // 存储值的类型（用于反序列化时判断）
}

/**
 * 持久化存储选项
 */
interface StorageOptions {
  type?: StorageType; // 存储类型
  expire?: number; // 默认过期时间（毫秒）
  defaultValue?: any; // 默认返回值（当获取的值不存在或过期时返回）
  prefix?: string; // 键名前缀，用于避免键名冲突
}

/**
 * 持久化存储类
 * 支持 localStorage、sessionStorage 和内存存储
 * 支持过期时间设置
 * 支持自定义空值返回
 */
export class PersistentStorage {
  private storage: Storage | Map<string, string>;
  private options: Required<StorageOptions>;

  /**
   * 构造函数
   * @param options 存储选项
   */
  constructor(options: StorageOptions = {}) {
    // 设置默认选项
    this.options = {
      type: StorageType.LOCAL,
      expire: 0, // 默认永不过期
      defaultValue: null,
      prefix: "",
      ...options
    };

    // 根据类型初始化存储实例
    if (this.options.type === StorageType.MEMORY) {
      this.storage = new Map();
    } else {
      this.storage = window[this.options.type];
    }
  }

  /**
   * 生成带前缀的键名
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  private getPrefixedKey(key: string): string {
    return `${this.options.prefix}${key}`;
  }

  /**
   * 序列化值（添加类型信息和过期时间）
   * @param value 要存储的值
   * @param expire 过期时间（毫秒）
   * @returns 序列化后的字符串
   */
  private serialize(value: any, expire?: number): string {
    const item: StorageItem = {
      value,
      type: typeof value,
      expire: expire ? Date.now() + expire : undefined
    };

    return JSON.stringify(item);
  }

  /**
   * 反序列化值
   * @param value 序列化后的字符串
   * @returns 解析后的值和是否过期
   */
  private deserialize(value: string): { data: any; expired: boolean } {
    try {
      const item: StorageItem = JSON.parse(value);

      // 检查是否过期
      const expired = item.expire ? Date.now() > item.expire : false;

      return { data: item.value, expired };
    } catch (e) {
      console.error("PersistentStorage: Failed to parse value:", e);
      // 解析失败，返回默认值
      return { data: this.options.defaultValue, expired: true };
    }
  }

  /**
   * 设置存储项
   * @param key 键名
   * @param value 值
   * @param expire 过期时间（毫秒），可选，不传则使用默认过期时间
   * @returns 当前实例（支持链式调用）
   */
  set(key: string, value: any, expire?: number): this {
    const prefixedKey = this.getPrefixedKey(key);
    const exp = expire !== undefined ? expire : this.options.expire;
    const serializedValue = this.serialize(value, exp);

    if (this.options.type === StorageType.MEMORY) {
      (this.storage as Map<string, string>).set(prefixedKey, serializedValue);
    } else {
      (this.storage as Storage).setItem(prefixedKey, serializedValue);
    }

    return this;
  }

  /**
   * 获取存储项
   * @param key 键名
   * @param defaultValue 自定义默认值（可选，会覆盖类级别的默认值）
   * @returns 存储的值或默认值
   */
  get<T = any>(key: string, defaultValue?: T): T {
    const prefixedKey = this.getPrefixedKey(key);
    let serializedValue: string | null = null;

    if (this.options.type === StorageType.MEMORY) {
      serializedValue = (this.storage as Map<string, string>).get(prefixedKey) || null;
    } else {
      serializedValue = (this.storage as Storage).getItem(prefixedKey);
    }

    // 键不存在
    if (serializedValue === null) {
      return defaultValue !== undefined ? defaultValue : this.options.defaultValue;
    }

    // 反序列化
    const { data, expired } = this.deserialize(serializedValue);

    // 如果过期，删除该项并返回默认值
    if (expired) {
      this.remove(key);
      return defaultValue !== undefined ? defaultValue : this.options.defaultValue;
    }

    return data;
  }

  /**
   * 移除存储项
   * @param key 键名
   * @returns 当前实例（支持链式调用）
   */
  remove(key: string): this {
    const prefixedKey = this.getPrefixedKey(key);

    if (this.options.type === StorageType.MEMORY) {
      (this.storage as Map<string, string>).delete(prefixedKey);
    } else {
      (this.storage as Storage).removeItem(prefixedKey);
    }

    return this;
  }

  /**
   * 清空所有存储项（只会清空带有前缀的项）
   * @returns 当前实例（支持链式调用）
   */
  clear(): this {
    if (this.options.type === StorageType.MEMORY) {
      // 对于内存存储，只删除带有前缀的键
      const memoryStorage = this.storage as Map<string, string>;
      for (const key of memoryStorage.keys()) {
        if (key.startsWith(this.options.prefix)) {
          memoryStorage.delete(key);
        }
      }
    } else {
      // 对于Web存储，遍历所有键并删除带有前缀的项
      const webStorage = this.storage as Storage;
      for (let i = 0; i < webStorage.length; i++) {
        const key = webStorage.key(i);
        if (key && key.startsWith(this.options.prefix)) {
          webStorage.removeItem(key);
        }
      }
    }

    return this;
  }

  /**
   * 获取所有键名（不包含前缀）
   * @returns 键名数组
   */
  keys(): string[] {
    const keyList: string[] = [];

    if (this.options.type === StorageType.MEMORY) {
      const memoryStorage = this.storage as Map<string, string>;
      for (const key of memoryStorage.keys()) {
        if (key.startsWith(this.options.prefix)) {
          keyList.push(key.substring(this.options.prefix.length));
        }
      }
    } else {
      const webStorage = this.storage as Storage;
      for (let i = 0; i < webStorage.length; i++) {
        const key = webStorage.key(i);
        if (key && key.startsWith(this.options.prefix)) {
          keyList.push(key.substring(this.options.prefix.length));
        }
      }
    }

    return keyList;
  }

  /**
   * 检查键是否存在且未过期
   * @param key 键名
   * @returns 是否存在
   */
  has(key: string): boolean {
    const prefixedKey = this.getPrefixedKey(key);
    let exists = false;

    if (this.options.type === StorageType.MEMORY) {
      exists = (this.storage as Map<string, string>).has(prefixedKey);
    } else {
      exists = (this.storage as Storage).getItem(prefixedKey) !== null;
    }

    // 如果存在，还需要检查是否过期
    if (exists) {
      const value = this.get(key);
      // 如果获取的值是默认值，说明已过期或无效
      exists = value !== this.options.defaultValue;
    }

    return exists;
  }

  /**
   * 获取剩余过期时间
   * @param key 键名
   * @returns 剩余毫秒数（永不过期返回-1，不存在返回0）
   */
  getExpire(key: string): number {
    const prefixedKey = this.getPrefixedKey(key);
    let serializedValue: string | null = null;

    if (this.options.type === StorageType.MEMORY) {
      serializedValue = (this.storage as Map<string, string>).get(prefixedKey) || null;
    } else {
      serializedValue = (this.storage as Storage).getItem(prefixedKey);
    }

    if (serializedValue === null) {
      return 0; // 不存在
    }

    try {
      const item: StorageItem = JSON.parse(serializedValue);

      if (!item.expire) {
        return -1; // 永不过期
      }

      const remaining = item.expire - Date.now();
      return remaining > 0 ? remaining : 0; // 已过期返回0
    } catch (e) {
      console.error("Error parsing storage item:", e);
      return 0; // 解析失败
    }
  }

  /**
   * 更改存储配置
   * @param options 新的配置选项
   */
  changeOptions(options: StorageOptions): void {
    this.options = { ...this.options, ...options };

    // 如果存储类型发生变化，需要重新初始化存储实例
    if (options.type && options.type !== this.options.type) {
      if (options.type === StorageType.MEMORY) {
        this.storage = new Map();
      } else {
        this.storage = window[options.type];
      }
      this.options.type = options.type;
    }
  }
}

// 默认导出实例
export const storage = new PersistentStorage();

// 导出默认实例的快捷方法
export const setStorage = (key: string, value: any, expire?: number) => storage.set(key, value, expire);

export const getStorage = <T = any>(key: string, defaultValue?: T): T => storage.get(key, defaultValue);

export const removeStorage = (key: string) => storage.remove(key);

export const clearStorage = () => storage.clear();
