/**
 * @description 自定义存储类
 */

export class Storage {
  /**
   * @description 设置本地存储
   * @param key
   * @param value
   */
  static set(key: string, value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
}
