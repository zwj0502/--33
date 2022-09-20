import request from '@/utils/request'

/**
 *获取文章
 * @param {String | Nuumber} id 频道的id
 * @param {Nuumber} timestamp 请求新的推荐数据，传当前的时间戳
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleAPI = (article_id) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `/v1_0/articles/${article_id}`
  })
}
/**
 *关注用户
 * @param {*} target 用户id
 * @returns
 */
export const getFocusOnAPI = (target) => {
  return request({
    // eslint-disable-next-line camelcase
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取关
 * @param {*} target 作者id
 * @returns
 */
export const DeleteOnAPI = (target) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `/v1_0/user/followings/${target}`,
    method: 'delete'
  })
}
/**
 * 收藏
 * @param {*} target 文章id
 * @returns
 */
export const postcollectedAPI = (target) => {
  return request({
    // eslint-disable-next-line camelcase
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })
}
/**
 * 取消收藏
 * @param {*} target
 * @returns
 */
export const deletecollectedAPI = (target) => {
  return request({
    // eslint-disable-next-line camelcase
    url: `/v1_0/article/collections/${target}`,
    method: 'delete'
  })
}
/**
 *
 * @param {*} target 文章或被评论人的id
 * @param {*} content 评论的内容
 * @param {*} art_id 文章的id
 * @returns
 */
// eslint-disable-next-line camelcase
export const postcommentsAPI = (target, content, art_id) => {
  return request({
    // eslint-disable-next-line camelcase
    url: '/v1_0/comments',
    method: 'post',
    data: {
      target,
      content,
      art_id
    }
  })
}

/**
 * 获取评论或评论回复
 * @param {*} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {*} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const GetcommentsAPI = (params) => {
  return request({
    // eslint-disable-next-line camelcase
    url: '/v1_0/comments',
    params
  })
}
