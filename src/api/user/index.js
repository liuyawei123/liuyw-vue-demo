import axios from 'axios'

export default {

// 根据用户名模糊查询，分页显示
  paging: async (query) => {
    let resp = await axios.get(`/api/users/all?empName=${query.empName}&pageNum=${query.pageNum}&pageSize=${query.pageSize}`)
    return resp.data
  },
  /* 查找某个部门 */
  queryEmps: async (deptno) => {
    let resp = await axios.get(`/api/users/${deptno}`)
    return resp.data
  },
  /* 创建 */
  create: async (emp) => {
    let resp = await axios.post('/api/users', emp)
    return resp.data
  },
  /* 删除 */
  remove: async (ename) => {
    let resp = await axios.delete(`/api/users/${ename}`)
    return resp.data
  },
  /* 登陆 */
  login: async (emp) => {
    let resp = await axios.post(`/api/users/actions/login/`, emp)
    return resp
  },
  /* 修改 */
  updateEmp: async (emp) => {
    let resp = await axios.put('/api/users/', emp)
    return resp.data
  }
}
