import arr from "./Arr"
import cache from "./Cache"
import cookie from "./Cookie"
import date from "./Date"
import obj from "./Obj"
import random from "./Random"
import str from "./Str"


/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay
 */
function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

/**
 * 节流
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle(fn, delay) {
    let last_time
    let timer = null
    return function () {
        let cur_time = new Date().getTime()
        if (last_time && cur_time < last_time + delay) { //若为真，则表示上次执行过，且在期限值范围内
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn();
                last_time = cur_time
            }, delay)
        } else {
            last_time = cur_time;
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