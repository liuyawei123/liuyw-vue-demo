<template>
  <div>
    <div>
      <el-input  @keyup.enter.native="loadData"
                 placeholder="请输入您要查询的部门号"
                 v-model="query.deptName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-table border :data="tableData">
        <el-table-column class="column" label="部门号" prop="deptno"></el-table-column>
        <el-table-column class="column" label="部门名称" prop="deptName"></el-table-column>
        <el-table-column class="column" label="部门地址" prop="loc"></el-table-column>
        <el-table-column class="column" label="上级部门" prop="leader" ></el-table-column>
      </el-table>
      <el-pagination class="pageStyle"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="query.pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import OrgApi from '@/api/org'
export default {
  methods: {
    async loadData (flag) {
      let resp = await OrgApi.queryDeptByName(this.query)
      this.tableData = resp.list
      this.total = resp.total
      this.visible = flag
    },
    pageChange (page) {
      this.query.pageNum = page
      this.loadData()
    }
  },
  data () {
    return {
      visible: false,
      tableData: [],
      deptName: null,
      total: 1,
      query: {
        pageNum: 0,
        pageSize: 5,
        deptName: ''
      }
    }
  },
  async mounted () {
    this.loadData()
  }
}
</script>

<style>
  body{
    background: #DFE9FB;
  }
  .pageStyle{
    text-align: center;
  }
</style>
