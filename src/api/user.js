import request from '@/utils/request'
// import store from '@/store'
/**
 *
 * @param {*} mobile 手机号
 * @param {*} code  验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfoAPI = () => {
  return request({
    url: 'v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.objtoken.token}`
    // }
  })
}
