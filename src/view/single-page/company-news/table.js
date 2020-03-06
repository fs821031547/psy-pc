const table = {
  listColumns: [{
    title: '旅行社名称',
    key: 'comp_name',
    align: 'center'
  },
  {
    title: '类型',
    key: 'comp_type',
    align: 'center'
  },
  {
    title: '规模',
    key: 'comp_scale',
    align: 'center'
  },
  {
    title: '常用功能',
    key: 'comp_function',
    align: 'center'
  },
  {
    title: '显隐',
    key: 'isShow',
    align: 'center',
    render: (h, params) => {
      const eyeType = params.row.isShow ? 'ios-eye' : 'ios-eye-off'
      return h('Icon', {
        props: {
          type: eyeType,
          size: 20
        },
        style: {
          cursor: 'pointer'
        },
        on: {
          click: () => {
            params.row.isShow = params.row.isShow ? 0 : 1
          }
        }
      })
    }
  },
  {
    title: '操作',
    key: 'title3',
    align: 'center',
    render: (h, params) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              const paramsId = this.contentList[params.index].id
              const paramsObj = {
                id: paramsId
              }
              this.contentId = paramsId
              this.modalTrigger('edit')
              this.handleUpdateView(paramsObj)
            }
          }
        }, '改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: () => {
              this.contentId = params.index
              this.modalDelete = true
            }
          }
        }, '删')
      ])
    }
  }
  ],
  listDatas: []
}
module.exports = table
