<template>
  <el-dialog
    :visible.sync="visible"
    title="修改用户"
    width="600px"
  >
    <div>
      <!--{{userForm}}-->
      <el-form ref="form" label-width="100px" :model="editData" :rules="rules">
        <el-form-item label="姓名" prop="empName">
          <el-input v-model="editData.empName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editData.password"></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="updateEmp()">修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import UserApi from '@/api/user'

export default{
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      Type: Array,
      required: true
    }
  },
  data () {
    return {
      rules: {
        empName: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        password: [
          {required: true, trigger: 'change', message: '请输入密码!'}
        ]

      }
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.$emit('update:visible', false)
        this.editData = {
          id: null,
          empName: '',
          password: ''
        }
        this.$refs['form'].resetFields()
      }
    }
  },
  methods: {
    async updateEmp () {
      let resp = await UserApi.updateEmp(this.editData)
      if (resp.state !== 1) {
        this.visible = false
        this.$emit('fail')
        this.$message({
          message: resp.message,
          type: 'fail'
        })
      } else {
        this.visible = false
        this.$emit('success')
        this.$message({
          message: resp.message,
          type: 'success'
        })
      }
    }
  }
}
</script>
