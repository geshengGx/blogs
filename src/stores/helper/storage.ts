/**
 * @description 存储类
 */

// import { destr } from "destr";

/**
 * 存储类型枚举
 */
export enum StorageType {
  LOCAL = "localStorage", // 本地存储，数据永久保存（除非手动清除）
  SESSION = "sessionStorage", // 会话存储，浏览器关闭后自动清除
  COOKIE = "cookie" // Cookie 存储，可设置过期时间，随请求发送到服务器
}

/**
 * Cookie 选项接口
 */
interface CookieOptions {
  expires?: number | Date; // 过期时间（天数或Date对象）
  path?: string; // Cookie路径
  domain?: string; // Cookie域
  secure?: boolean; // 是否仅通过HTTPS传输
  sameSite?: "strict" | "lax" | "none"; // 同站策略
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
  cookieOptions?: CookieOptions; // Cookie特定选项
}

export class Storage {
  private options: Required<StorageOptions>; // 存储选项

  /**
   * 创建一个Storage实例
   * @param options 存储选项
   */
  constructor(options: StorageOptions = {}) {
    this.options = {
      type: StorageType.LOCAL, // 默认使用localStorage
      expire: 0, // 默认不过期
      defaultValue: undefined, // 默认返回undefined
      prefix: "app", // 默认不添加前缀
      cookieOptions: {}, // 默认不设置Cookie选项
      ...options // 合并默认选项和传入的选项
    };
  }

  /**
   * 生成带前缀的键名
   * @param key 原始键名
   * @returns 带前缀的键名
   */
  private getPrefixedKey(key: string): string {
    return `${this.options.prefix}_${key}`;
  }

  /**
   * 系列化存储值
   * @param value 存储值
   * @param expire 过期时间（毫秒）
   * @returns 序列化后的值
   */
  private serialize<T = any>(value: T, expire?: number): string {
    const item: StorageItem<T> = {
      value,
      expire: expire ? Date.now() + expire : undefined,
      type: typeof value
    };
    return JSON.stringify(item);
  }

  /**
   * 反序列化存储值
   * @param serializedValue 存储值
   * @returns 反序列化后的值
   */
  private deserialize<T = any>(serializedValue: string): T | null {
    const item: StorageItem<T> = JSON.parse(serializedValue);
    if (item.expire && item.expire < Date.now()) {
      return null; // 过期
    }
    return item.value;
  }

  /**
   * 设置 Cookie
   * @param key 键名
   * @param value 值
   * @param expire 过期时间（毫秒）
   * @returns 当前实例（支持链式调用）
   */
  private setCookie(key: string, value: string, expire?: number): this {
    const prefixedKey = this.getPrefixedKey(key);
    let cookieString = `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`;

    // 设置过期时间
    if (expire) {
      const date = new Date();
      date.setTime(date.getTime() + expire);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    // 设置路径
    const path = this.options.cookieOptions?.path || "/";
    cookieString += `; path=${path}`;

    // 设置域
    if (this.options.cookieOptions?.domain) {
      cookieString += `; domain=${this.options.cookieOptions.domain}`;
    }

    // 设置安全标志
    if (this.options.cookieOptions?.secure) {
      cookieString += "; secure";
    }

    // 设置同站策略
    if (this.options.cookieOptions?.sameSite) {
      cookieString += `; samesite=${this.options.cookieOptions.sameSite}`;
    }

    document.cookie = cookieString;
    return this;
  }

  /**
   * 获取 Cookie
   * @param key 键名
   * @returns Cookie 值或 null
   */
  private getCookie(key: string): string | null {
    const prefixedKey = this.getPrefixedKey(key);
    const name = encodeURIComponent(prefixedKey) + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return decodeURIComponent(cookie.substring(name.length, cookie.length));
      }
    }

    return null;
  }

  /**
   * 删除 Cookie
   * @param key 键名
   * @returns 当前实例（支持链式调用）
   */
  private removeCookie(key: string): this {
    const prefixedKey = this.getPrefixedKey(key);
    document.cookie = `${encodeURIComponent(prefixedKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    // 如果设置了域，也需要删除带域的cookie
    if (this.options.cookieOptions?.domain) {
      document.cookie = `${encodeURIComponent(prefixedKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${this.options.cookieOptions.domain}`;
    }

    return this;
  }

  /**
   * 清除所有 Cookie（带前缀）
   */
  clearCookie(): void {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const prefixedKey = cookies[i].split("=")[0].replace(" ", "");
      if (prefixedKey.startsWith(this.options.prefix)) {
        this.removeCookie(prefixedKey.replace(this.options.prefix + "_", ""));
      }
    }
  }

  /**
   * 存储项
   * @param key 键名
   * @param value 存储的值
   * @param expire 过期时间（毫秒）
   */
  set<T = any>(key: string, value: T, expire?: number): void {
    if (this.options.type === StorageType.COOKIE) {
      this.setCookie(key, JSON.stringify(value), expire);
    } else {
      const item = this.serialize<T>(value, expire);
      const prefixedKey = this.getPrefixedKey(key);
      window[this.options.type].setItem(prefixedKey, item);
    }
  }

  /**
   * 获取存储的值
   * @param key 键名
   * @param defaultValue 默认返回值（当获取的值不存在或过期时返回）
   * @returns 存储的值
   */
  get<T = any>(key: string, defaultValue?: any): T {
    if (this.options.type === StorageType.COOKIE) {
      if (!this.getCookie(key)) return defaultValue || this.options.defaultValue;
      return JSON.parse(this.getCookie(key)) as T;
    } else {
      const item = window[this.options.type].getItem(this.getPrefixedKey(key));
      const deserializedItem = item && this.deserialize<T>(item);
      if (!deserializedItem) {
        this.remove(key);
        return defaultValue || this.options.defaultValue;
      }
      return deserializedItem;
    }
  }

  /**
   * 删除存储项
   * @param key 键名
   */
  remove(key: string): void {
    if (this.options.type === StorageType.COOKIE) {
      this.removeCookie(key);
    } else {
      window[this.options.type].removeItem(this.getPrefixedKey(key));
    }
  }

  /**
   * 清空存储
   */
  clearStorage(type?: StorageType): void {
    const storage = window[type];
    for (let key of Object.keys(storage)) {
      if (key.replace(" ", "").startsWith(this.options.prefix)) {
        storage.removeItem(key);
      }
    }
  }

  /**
   * 清空存储
   */
  clear(type?: StorageType): number {
    if (!this.options.prefix) return -1;
    if (!type) {
      this.clearStorage(StorageType.LOCAL);
      this.clearStorage(StorageType.SESSION);
      this.clearCookie();
    } else {
      if (type === StorageType.COOKIE) {
        this.clearCookie();
      } else {
        this.clearStorage(type);
      }
    }
    return 1;
  }

  /**
   * 设置配置
   * @param options 配置项
   */
  changeOptions(options: StorageOptions): void {
    this.options = { ...this.options, ...options };
  }
}

export const storage = new Storage();
