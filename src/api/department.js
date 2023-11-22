import request from '@/utils/request'
// 默认类型为get
// 获取组织架构数据

export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

// 新增组织接口
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 获取当前部门详情
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 更新部门接口
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

// 删除部门接口
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
