import {
  contentAdd,
  contentUpdate,
  websiteTagList,
  websiteContentList,
  websiteContentDetail,
  websiteContentDelete,
  websiteNavList,
  websiteNavUpdate,
  websiteNavDelete
} from '@/api/content'

export default {
  state: {
    contentAdd: {},
    headerInfo: [], // 头部导航数据
    pageInfo: [] // 页面导航数据
  },
  mutations: {
    setContentAdd (state, data) {
      state.contentAdd = data
    },
    setHeaderInfo (state, data) {
      state.headerInfo = data
    },
    setPageInfo (state, data) {
      state.pageInfo = data
    }
  },
  actions: {
    // 常用数据
    websiteTagList ({ commit }, params) {
      params = {}
      return new Promise((resolve, reject) => {
        websiteTagList(params).then(res => {
          // const data = res.data
          // commit('contentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 导航数据
    websiteNavList ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        if (state.headerInfo[0]) resolve()
        websiteNavList(params).then(res => {
          if (res.data) {
            const list = res.data.list
            const headInfoArr = []
            const pageInfoArr = []
            list.forEach(item => {
              item.subMenu = []
              if (item.parentId === 0 && item.type === 0) {
                headInfoArr.push(item)
              } else if (item.type === 1) {
                pageInfoArr.push(item)
              }
            })
            list.forEach(item => {
              if (item.parentId !== 0 && item.type === 0) {
                const parentId = item.parentId
                headInfoArr.forEach(i => {
                  if (i.id === parentId) {
                    i.subMenu.push(item)
                  }
                })
              }
            })
            commit('setHeaderInfo', headInfoArr)
            commit('setPageInfo', pageInfoArr)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 导航修改數據
    websiteNavUpdate ({ commit }, params) {
      // params = {}
      return new Promise((resolve, reject) => {
        websiteNavUpdate(params).then(res => {
          // const data = res.data
          // commit('contentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 导航删除數據
    websiteNavDelete ({ commit }, params) {
      // params = {}
      return new Promise((resolve, reject) => {
        websiteNavDelete(params).then(res => {
          // const data = res.data
          // commit('contentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 列表數據
    websiteContentList ({ commit }, params) {
      // params = {}
      console.log(params)
      return new Promise((resolve, reject) => {
        websiteContentList(params).then(res => {
          // const data = res.data
          // commit('contentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 列表數據
    websiteContentDetail ({ commit }, params) {
      // params = {}
      return new Promise((resolve, reject) => {
        websiteContentDetail(params).then(res => {
          // const data = res.data
          // commit('contentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 添加内容
    contentAdd ({ commit }, params) {
      return new Promise((resolve, reject) => {
        contentAdd(params).then(res => {
          const data = res.data
          commit('setContentAdd', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改内容
    contentUpdate ({ commit }, params) {
      return new Promise((resolve, reject) => {
        contentUpdate(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改内容
    websiteContentDelete ({ commit }, params) {
      return new Promise((resolve, reject) => {
        websiteContentDelete(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
    // 登录
    // handleLogin ({ commit }, {userName, password}) {
    //   userName = userName.trim()
    //   return new Promise((resolve, reject) => {
    //     login({
    //       userName,
    //       password
    //     }).then(res => {
    //       const data = res.data
    //       commit('setToken', data.token)
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
}
