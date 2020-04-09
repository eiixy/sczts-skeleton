# 
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
import Helpers from "sczts-skeleton/helpers"
import Arr from "sczts-skeleton/helpers/Arr"
import { Obj } from "sczts-skeleton/helpers"

Helpers.Cache.remember('key',600,()=>123)
Arr.pluck([{id:1,name:'name1'},{id:2,name:'name2'}],'id') // => [1,2]
Obj.pop({a:1,b:2,c:3},'b') // => 2
```

## 组件
* *Table*

## 助手函数
* Arr
    * *pluckk(array, colunm)* 获取数组指定一列数据
    * *wrap(value)* 将给定值转换为数组
    * *has(array, values)* 判断数组中是否存在某些值
    * *unique(array,colunms)* 数组去重
* Cache
    * remember
    * rememberPromise
    * set
    * get
* Obj
    * pop
    * diff
