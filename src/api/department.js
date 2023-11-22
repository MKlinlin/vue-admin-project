import request from '@/utils/request'

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
