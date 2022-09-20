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

/**
 * 上传图片
 * @param {*} file 裁剪过的图片的file对象
 * @returns
 */
export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: 'v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const getCodeAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const getPostCodeAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 * 获取用户收藏列表
 * @param {*}
 * @returns
 */

export const getCollectlistAPI = () => {
  return request({
    url: '/v1_0/article/collections'
  })
}
