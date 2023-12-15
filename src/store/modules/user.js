import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 从缓存中读初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes // 存储静态路由
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // context上下文，传入参数
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result // 返回结果
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', {})// 调用setUserInfo，传入空值
    // 重置路由
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
