<template>
  <div v-if="render">
    <el-table
      v-loading="loading"
      border
      :size="size"
      :data="data"
      :lazy="loadChilren !== false"
      :load="load"
      :row-key="rowKey"
      :tree-props="treeProps"
      @sort-change="handlerSort"
      @filter-change="handlerFilter"
      @selection-change="handleSelectionChange"
    >
      <!-- 是否开启复选框 -->
      <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
      <!-- 是否开启展开行 -->
      <el-table-column v-if="expand" type="expand">
        <template slot-scope="scope">
          <TableExtend :key="scope.$index" :row="scope.row" :render="expand" :index="scope.$index"></TableExtend>
        </template>
      </el-table-column>
      <template v-for="(item,key) in columns">
        <el-table-column
          :key="key"
          :ref="'col-'+item.prop"
          :width="item.width||null"
          :prop="item.prop"
          :fixed="item.fixed||false"
          :column-key="item.prop"
          :label="item.label"
          :show-overflow-tooltip="item.overflow"
          :sortable="item.sort?'custom':false"
          :filters="item.filter?item.filter.data:null"
          :filter-multiple="item.filter?(item.filter.multiple===false?item.filter.multiple:true):true"
        >
          <template slot-scope="scope">
            <template v-if="('render' in item)">
              <TableExtend
                :key="scope.$index"
                :row="scope.row"
                :render="item.render"
                :index="scope.$index"
              ></TableExtend>
            </template>
            <template v-else>{{scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="filterValue.limit"
      :current-page="filterValue.page"
      layout="total, sizes, prev, pager, next, jumper, slot"
      :total="total"
    ></el-pagination>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import TableExtend from "./tableExtend.js";
export default {
  name: "DataTable",
  props: {
    columns: Array,
    page: {
      type: Boolean,
      default: true
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      default: () => {
        return { children: "children", hasChildren: "children_count" };
      }
    },
    rowKey: {
      type: String,
      default: "id"
    },
    loadData: {
      type: Function
    },
    loadChilren: {
      type: [Function,Boolean],
      default: false
    },
    size: {
      type: String,
      default: "mini"
    },
    pageSize: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50];
      }
    },
    pageLayout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    expand: {
      type: [Function, Boolean],
      default: false
    }
  },
  components: {
    TableExtend
  },
  created() {
    console.log("columns", this.columns);
  },
  watch: {
    columns(value) {
      console.log("columns", value);
    }
  },
  data() {
    return {
      render: true,
      loading: false,
      data: [],
      selection: [],
      filterValue: {
        where: {},
        page: 1,
        limit: 10,
        search: "",
        orderBy: "id,asc"
      },
      total: 0
    };
  },
  methods: {
    // 加载子集数据
    load(tree, treeNode, resolve) {
      this.loadChilren(tree, resolve);
    },
    // 表头筛选项
    handlerFilter(_filters) {
      for (let key in _filters) {
        if (_filters[key] == null || _filters[key].length == 0) {
          delete this.filterValue.where[key];
        } else {
          if (_filters[key].length == 1) {
            this.filterValue.where[key] = _filters[key][0];
          } else {
            this.filterValue.where[key] = _filters[key];
          }
        }
      }
      this.renderTable();
    },
    // 排序
    handlerSort(obj) {
      if (obj.order == null) {
        this.filterValue.orderBy = null;
      } else {
        this.filterValue.orderBy = obj.prop + "," + obj.order.slice(0, -6);
      }
      this.renderTable();
    },
    // 页数大小改变
    handleSizeChange(pageSize) {
      this.$set(this.filterValue, "limit", pageSize);
      this.renderTable();
    },
    // 跳页
    handleCurrentChange(page) {
      this.$set(this.filterValue, "page", page);
      this.renderTable();
    },
    // 复选框操作
    handleSelectionChange(selection) {
      this.selection = selection;
      this.$emit("selection-change", selection);
    },
    // 重载表格数据
    renderTable() {
      this.loading = true;
      if (!this.page) {
        delete this.filterValue.page;
        delete this.filterValue.limit;
      }
      this.loadData(this.filterValue)
        .then(res => {
          this.total = res.data.count;
          this.data = res.data.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    // 删除行
    deleteRow(index) {
      this.data.splice(index, 1);
    }
  },
  computed: {
    hasExpand() {
      if (this.expand === false) {
        return false;
      } else if (typeof this.expand === "function") {
        return true;
      }
      throw new Error("expand 必须为function或false");
    }
  }
};
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 8px;
}
</style>
