import axios from '@/libs/api.request'

export const login = ({ phone, password }) => {
  const data = {
    phone,
    password
  }

  return axios.request({
    url: 'api/ConsultantInfo/add',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getZizi = (data) => {
  return axios.request({
    url: 'api/PsyConsultantZizhi/add',
    data,
    method: 'post'
  })
}