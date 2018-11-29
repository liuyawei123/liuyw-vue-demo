<template>
  <div class="showview">
    <el-col>
    <el-form :inline="true" :model="query" class="st">
      <el-form-item>
        <el-input v-model="query.empName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getEmps">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openAdd">新增人员</el-button>
      </el-form-item>
    </el-form>
  </el-col>

    <span>
      <el-table border :data="tableData">
      <el-table-column label="姓名" prop="empName"></el-table-column>
      <el-table-column label="工作" prop="job"></el-table-column>
      <el-table-column label="所属部门" prop="deptName"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-delete" @click="remove(scope.row.empName)" >删除</el-button>

      </template>
      </el-table-column>

      <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" @click="openUpdata(scope.row)">编辑</el-button>
      </template>
      </el-table-column>
      </el-table>
       <div>
      <el-pagination class="pageStyle"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="query.pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
      </span>

    <UserFormAdd :visible.sync="visible" @success="loadData"></UserFormAdd>
    <UserFormModify :visible.sync="visible_modify" @success="loadData" v-bind:editData="editData"></UserFormModify>

  </div>
</template>

<script>

import UserFormAdd from './form-add.vue'
import UserFormModify from './form-modify.vue'

import UserApi from '../../api/user/index.js'

export default {
  components: {UserFormAdd, UserFormModify},
  props: {
    deptno: {
      Type: String
    }
  },
  data () {
    return {
      visible: false,
      visible_modify: false,
      tableData: [],
      total: 0,
      editData: {
        empName: null,
        password: null,
        id: null
      },
      query: {
        pageNum: 0,
        pageSize: 5,
        empName: ''
      }
    }
  },

  mounted () {
    this.loadData()
  },
  methods: {

    async loadData (flag) {
      let resp = await UserApi.paging(this.query)
      this.tableData = resp.list
      this.total = resp.total
      this.visible = flag
    },
    pageChange (page) {
      this.query.pageNum = page
      this.loadData()
    },
    async  remove (empName) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await UserApi.remove(empName)
        if (resp.state === 1) {
          this.$message({
            message: resp.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: resp.message,
            type: 'fail'
          })
        }
        this.loadData()
      }).catch(() => {

      })
    },
    // 根据条件查询用户
    getEmps () {
      this.loadData()
    },
    openAdd () {
      this.visible = true
    },
    openUpdata (val) {
      this.editData = val
      this.visible_modify = true
    }
  }
}
</script>

<style>
  .pageStyle{
    text-align: center;
  }
  .st{
    text-align: center;
  }
</style>
