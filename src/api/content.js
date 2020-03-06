import axios from '@/libs/api.request'

// 新增接口
export const contentAdd = (data) => {
  return axios.request({
    url: 'api/websiteContent/add',
    data,
    method: 'post'
  })
}

// 修改接口
export const contentUpdate = (data) => {
  return axios.request({
    url: 'api/websiteContent/update',
    data,
    method: 'post'
  })
}

// 调用标签接口
export const websiteTagList = (data) => {
  return axios.request({
    url: 'api/websiteTag/list',
    data,
    method: 'post'
  })
}

// 调用页面列表接口
export const websiteContentList = (data) => {
  return axios.request({
    url: 'api/websiteContent/list',
    data,
    method: 'post'
  })
}
// 调用页面列表详情接口
export const websiteContentDetail = (data) => {
  return axios.request({
    url: 'api/websiteContent/detail',
    data,
    method: 'post'
  })
}

// 调用页面列表删除接口
export const websiteContentDelete = (data) => {
  return axios.request({
    url: 'api/websiteContent/delete',
    data,
    method: 'post'
  })
}

// 调用导航列表接口
export const websiteNavList = (data) => {
  return axios.request({
    url: 'api/websiteNav/list',
    data,
    method: 'post'
  })
}
// 调用导航列表修改接口
export const websiteNavUpdate = (data) => {
  return axios.request({
    url: 'api/websiteNav/update',
    data,
    method: 'post'
  })
}
// 调用导航列表删除接口
export const websiteNavDelete = (data) => {
  return axios.request({
    url: 'api/websiteNav/delete',
    data,
    method: 'post'
  })
}
