import path from "path";

/**
 * 判断当前是否为开发环境
 * @param mode - 当前环境模式字符串
 * @returns 是否是开发环境
 */
export function isDevFn(mode: string): boolean {
  return mode === "development";
}

/**
 * 判断当前是否为生产环境
 * @param mode - 当前环境模式字符串
 * @returns 是否是生产环境
 */
export function isProdFn(mode: string): boolean {
  return mode === "production";
}

/**
 * 判断当前是否为测试环境
 * @param mode - 当前环境模式字符串
 * @returns 是否是测试环境
 */
export function isTestFn(mode: string): boolean {
  return mode === "test";
}

/**
 * 是否启用打包分析报告模式
 * @description 通过检测环境变量 VITE_REPORT 是否为 "true" 来判断
 * @returns 是否启用报告模式
 */
export function isReportMode(): boolean {
  return process.env.VITE_REPORT === "true";
}

/**
 * 环境变量类型转换包装器
 * @description 将字符串类型的环境变量转换为实际需要的类型
 * @param envConf - 原始环境变量对象（键值对）
 * @returns 转换后的环境变量对象
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: ViteEnv = {};

  for (const envName of Object.keys(envConf)) {
    // 处理换行符（兼容.env文件中的多行值）
    let realName = envConf[envName].replace(/\\n/g, "\n");

    // 布尔值转换
    realName = realName === "true" ? true : realName === "false" ? false : realName;

    // 特殊字段类型处理
    if (envName === "VITE_PORT") {
      // 端口号转为数字
      realName = Number(realName);
    } else if (envName === "VITE_PROXY") {
      // 代理配置尝试解析为JSON
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        // 解析失败保持原值
        console.error(`Error parsing VITE_PROXY: ${error}`);
      }
    }

    ret[envName] = realName;
  }
  return ret;
}

/**
 * 获取项目根目录路径
 * @description 解析相对于项目根目录的绝对路径
 * @param dir - 可变参数，路径片段
 * @returns 拼接后的绝对路径
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

/********************* 类型定义 *********************/
/**
 * 可记录类型（通用键值对对象）
 * @template T - 值类型，默认为any
 */
type Recordable<T = any> = Record<string, T>;
