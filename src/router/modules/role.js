import layout from '@/layout'
export default {
  path: '/role',
  name: 'role',
  component: layout,
  children: [{
    path: '',
    name: 'role1',
    component: () => import('@/views/role'),
    meta: {
      title: '角色',
      icon: 'setting'
    }
  }]
}
