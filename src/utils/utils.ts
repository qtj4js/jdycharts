// 判断类型

import { forEach } from "./lodash";

export const isType = (value: any, type: string): boolean => {
    const { toString } = {};
    // null array object都是Object重写的实例 他们是有自己的toString的方法 按照原型链的思路，会优先使用重写后的toString方法，而我们只想用原型链上的toString的方法
    return toString.call(value) === `[object ${type}]`;
};

export const getType = (n: Object) => {
    return Object.prototype.toString.call(n).slice(8, -1);
};

/**
 * 存在时返回路径值，不存在时返回 undefined
 */
export const hasPath = (source: any, path: string[]) => {
    let current = source;
    for (let i = 0; i < path.length; i += 1) {
        if (current?.[path[i]]) {
            current = current[path[i]];
        } else {
            current = undefined;
            break;
        }
    }
    return current;
};

/**
 * 内部指定 params ，不考虑复杂情况
 */
export const setPath = (source: any, path: string[], value?: any) => {
    if (!source) {
        return source;
    }
    let o = source;
    forEach(path, (key: string, idx: number) => {
        // 不是最后一个
        if (idx < path.length - 1) {
            o = o[key];
        } else {
            o[key] = value;
        }
    })
    return source;
};

export const getUUID = (buffer?: any) => {
    return buffer
        ? (buffer ^ ((Math.random() * 16) >> (buffer / 4))).toString(16)
        : (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, getUUID);
};
