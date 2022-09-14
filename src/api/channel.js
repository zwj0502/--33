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
/**
 *删除指定用户频道
 * @param {String | Namber} id
 * @returns Promise
 */
export const delChannelsAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增用户频道
 * @param {String |Number} id 新增频道的id
 * @param {Number} seq  新增索引下标值
 * @returns Promise
 */

export const addChannelsAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
