import request from '@/utils/request'
/** *
 * 获取员工列表
 * */

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/* **
 * 导出员工数据
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/import/template',
    // 改变接受数据的类型
    responseType: 'blob' // 二进制流
  })
}
/**
 * 下载员工导入模板
 * */
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    // 改变接受数据的类型
    responseType: 'blob' // 二进制流
  })
}

/** *
 * 上传用户的excel
*/

export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型
  })
}

/**
 * 删除员工
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 新增员工
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 获取员工详情
 */
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 更新员工信息
 */
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取可用角色
 */
export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}

/**
 * 分配员工角色
 * */
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
