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
