# sczts-skeleton
![Node.js Package](https://github.com/eiixy/sczts-skeleton/workflows/Node.js%20Package/badge.svg)
> vue 开发骨架包

## 安装
```
npm i sczts-skeleton
```

## 快速开始
### 使用 table 组件
```vue
<template>
  <div>
    <data-table
      ref="table"
      :columns="columns"
      :loadData="loadData"
      size="mini"
    ></data-table>
  </div>
</template>

<script>
import dataTable from "sczts-skeleton/components/table"
import { list, destroy } from "@/api/users";
export default {
  components: {
    dataTable
  },
  data(){
    return {
      loadData: list, // promise 对象
      columns：{
        {
          prop: "id",
          label: "ID"
        },
        {
          prop: "name",
          label: "名称"
        }
      }
    }
  }
}
</script>
```
### 使用助手函数
```js
// 全部引入
import Helpers from "sczts-skeleton/helpers"
// 引入指定类
import Arr from "sczts-skeleton/helpers/Arr"
// 映入多个类
import { Obj,Debounce } from "sczts-skeleton/helpers"

Helpers.Cache.remember('key',600,()=>123)
Arr.pluck([{id:1,name:'name1'},{id:2,name:'name2'}],'id') // => [1,2]
Obj.pop({a:1,b:2,c:3},'b') // => 2
```

## 组件
* *Table*

## 助手函数
* [Arr](#Arr)
    * *pluck(array, colunm)* 获取数组指定一列数据
    * *wrap(value)* 将给定值转换为数组
    * *has(array, values)* 判断数组中是否存在某些值
    * *unique(array,colunms)* 数组去重
* [Cache](#Cache)
    * remember
    * rememberPromise
    * set
    * get
* [Obj](#Obj)
    * pop
    * diff
* [Debounce](#Debounce) 防抖
* [Throttle](#Throttle) 节流


### Arr
#### pluckk(array, colunm) 
#### wrap(value)
#### has(array, values)
#### unique(array,colunms)

### Cache

### Obj


### Debounce
```js
import Debounce from "sczts-skeleton/helpers";
for(let i = 0; i < 5; i++){
  setTimeout(function (){
    console.log('test Debounce',$i)
    Debounce('key',()=>{
      console.log('exec Debounce')
    },1000)()
  }, 200 * i);
}
/**
 * echo:
 * test Debounce 0
 * test Debounce 1
 * test Debounce 2
 * test Debounce 3
 * test Debounce 4
 * exec Debounce
 **/
```

### Throttle
```js
import Throttle from "sczts-skeleton/helpers";
for(let i = 0; i < 5; i++){
  setTimeout(function (){
    console.log('test Throttle',$i)
    Throttle('key',()=>{
      console.log('exec Throttle')
    },1000)()
  }, 200 * i);
}
/**
 * echo:
 * test Throttle 0
 * exec Throttle
 * test Throttle 1
 * test Throttle 2
 * test Throttle 3
 * test Throttle 4
 * exec Throttle
 **/
```