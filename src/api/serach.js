import request from '@/utils/request'

export const getSuggstionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *获取搜索结果
 * @param {*} page 分页页数，非必填，不填默认为1
 * @param {*} per_page 每一业数据的数量
 * @param {*} q  搜索关键词
 * @returns
 */
// eslint-disable-next-line camelcase
export const getResultsAPI = (page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
