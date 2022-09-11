//所有关于新闻的接口

import request from '@/utils/request'

/**
 *获取文章
 * @param {String | Nuumber} id 频道的id
 * @param {Nuumber} timestamp 请求新的推荐数据，传当前的时间戳
 * @returns
 */
export const getNewsAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
