export declare const isType: (value: any, type: string) => boolean;
export declare const getType: (n: Object) => any;
/**
 * 存在时返回路径值，不存在时返回 undefined
 */
export declare const hasPath: (source: any, path: string[]) => any;
/**
 * 内部指定 params ，不考虑复杂情况
 */
export declare const setPath: (source: any, path: string[], value?: any) => any;
export declare const getUUID: (buffer?: any) => string;
export declare const isFunction: (value?: any) => any;
export declare function isNewFunction(value: any): boolean;
