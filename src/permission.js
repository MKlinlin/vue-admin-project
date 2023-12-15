import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { asyncRoutes } from '@/router'
/**
 *前置守卫
 */
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next(地址)并没有执行后置守卫
      nProgress.done()
    } else {
      // 判断是否获取过用户信息
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(roles.menus)
        // console.log(asyncRoutes)
        const filterRoutes = asyncRoutes.filter(item => {
          return roles.menus.includes(item.name)
        })
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由
        // 添加后，需要转发一下，否则会出现空白页
        next(to.path)
      } else {
        next()
      }
      next() // 放过
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
    }
  }
})

/**
 * 后置守卫
 */
router.afterEach(() => {
  nProgress.done()
})
