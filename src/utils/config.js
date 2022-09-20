const env = process.env.NODE_ENV

let baseURL
switch (env) {
  case 'development':
    baseURL = 'http://toutiao.itheima.net'
    break
  case 'production':
    baseURL = 'http://toutiao.itheima.net'
    break
}
export { baseURL }

export const DEFAULT_CONFIG = {
  baseURL: baseURL
}
