import axios from '@/libs/api.request'

// 获取上传七牛的token
export const getToken = _ => {
  return axios.request({
    url: 'sys/api/guide_m/qiniu/getToken',
    method: 'get'
  })
}
