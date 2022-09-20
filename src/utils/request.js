import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaullt.timeout = 5000
//const request = axios.create  克隆axios
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
// 添加请求拦截器
// 请求拦截器，请求做些事情
// config是每一次请求的配置对象

request.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 再发请求之前都做些什么
    // 登陆了，所有的情求都加上 Authorization
    const {
      getters: { isLogin },
      state: { objtoken }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${objtoken.token}`
    }
    // console.log(objtoken)

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
