import request from '@/utils/request'

/**
 *  获取自己的频道
 * @returns promise
 */
export const channelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 *获取所有频道
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
