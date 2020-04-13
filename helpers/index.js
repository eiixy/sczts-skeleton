import arr from "./Arr"
import cache from "./Cache"
import cookie from "./Cookie"
import date from "./Date"
import obj from "./Obj"
import random from "./Random"
import str from "./Str"


var sczts_skeleton = {
    debounce: {},
    throttle: {}
}

/**
 * 防抖
 * @param {string} key 唯一标识 
 * @param {Function} fn
 * @param {Number} delay
 */
function debounce(key, fn, delay) {
    let timer = sczts_skeleton.debounce[key]
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        sczts_skeleton.debounce[key] = setTimeout(fn, delay)
    }
}

/**
 * 节流
 * @param {string} key 唯一标识 
 * @param {Function} fn
 * @param {Number} delay
 */
function throttle(key, fn, delay) {
    if (!(key in sczts_skeleton.throttle)) {
        sczts_skeleton.throttle[key] = {
            last_time: null,
            timer: null
        }
    }
    let last_time = sczts_skeleton.throttle[key].last_time
    let timer = sczts_skeleton.throttle[key].timer
    return function () {
        let cur_time = new Date().getTime()
        if (last_time && cur_time < last_time + delay) {
            clearTimeout(timer)
            sczts_skeleton.throttle[key].timer = setTimeout(() => {
                fn();
                sczts_skeleton.throttle[key].last_time = cur_time
            }, delay)
        } else {
            sczts_skeleton.throttle[key].last_time = cur_time;
            fn();
        }
    }
}

export const Arr = arr;
export const Cache = cache;
export const Cookie = cookie;
export const Date = date;
export const Obj = obj;
export const Random = random;
export const Str = str;
export const Debounce = debounce
export const Throttle = throttle

export default {
    Arr: arr,
    Cache: cache,
    Cookie: cookie,
    Date: date,
    Debounce: debounce,
    Obj: obj,
    Random: random,
    Str: str,
    Throttle: throttle,
}