import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
})// 创建axios实例
// 成功1 失败2
service.interceptors.request.use((config) => {
// 注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 执行promise
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return Promise.reject(new Error(message))// new 一个error，将message传入
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({ type: 'warning', message: 'token超时了！' })
    // token超时
    await store.dispatch('user/logout') // 调用action退出登录
    router.push('/login') // 调转到登录页
    return Promise.reject(error)// 跳出promise，不再重复推送消息
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
