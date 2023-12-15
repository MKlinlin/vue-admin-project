import layout from '@/layout'
export default {
  path: '/attendance',
  name: 'attendance',
  component: layout,
  children: [{
    path: '',
    name: 'attendance1',
    component: () => import('@/views/attendance'),
    meta: {
      title: '考勤',
      icon: 'excel'
    }
  }]
}
