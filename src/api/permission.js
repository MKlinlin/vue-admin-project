import request from '@/utils/request'

/**
 * 获取权限列表
 */

export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    method: 'get',
    params
  })
}
