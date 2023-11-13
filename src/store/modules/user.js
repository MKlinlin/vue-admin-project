import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()// 从缓存中读初始值
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除Vuex的token
    state.token = null
    removeToken()
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
