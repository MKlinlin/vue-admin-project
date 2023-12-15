import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const state = {
  token: getToken(), // 从缓存中读初始值
  userInfo: {} // 存储用户基本资料状态
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
