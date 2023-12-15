import layout from '@/layout'
export default {
  path: '/salary',
  name: 'salary',
  component: layout,
  children: [{
    path: '',
    name: 'salary1',
    component: () => import('@/views/salary'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
