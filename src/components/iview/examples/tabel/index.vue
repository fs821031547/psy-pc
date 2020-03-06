<template>
  <div class="container">
    <Row>
      <Col span="24">
        <h2 style="font-size: 16px; padding: 0 0 8px 4px;">产品价格</h2>
        <iv-table v-model="tableData.data" :columns='tableData.columns'></iv-table>
      </Col>
      <Col span="24" style="padding-top: 8px;">
        <Button icon="md-add" @click="addDate" style="width: 160px;">
          <strong>添加</strong>
        </Button>
        <Button icon="md-add" @click="getDate" style="width: 160px;">
          <strong>获取数据</strong>
        </Button>
      </Col>
    </Row>

    <br />
    <Row>
      <Col span="24">
        <h2 style="font-size: 16px; padding: 0 0 8px 4px;">合同信息</h2>
        <iv-table v-model="tableData2.data" :columns='tableData2.columns'></iv-table>
      </Col>
      <Col span="24" style="padding-top: 8px;">
        <Button icon="md-add" style="width: 160px;">
          <strong>添加</strong>
        </Button>
        <Button icon="md-add" @click="getDate2" style="width: 160px;">
          <strong>获取数据</strong>
        </Button>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: {
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '单选',
            key: 'author',
            align: 'center',
            width: 80,
            editable: true,
            edittype: 'radio'
          },
          {
            title: '多选',
            key: 'checks',
            align: 'center',
            width: 80,
            editable: true,
            edittype: 'checkbox'
          },
          {
            title: '规格',
            key: 'spec',
            editable: true,
            edittype: 'select',
            options: {
              placeholder: '请选择部门',
              clearable: true,
              filterable: true,
              data: [
                {
                  value: 'New York',
                  label: 'New York'
                },
                {
                  value: 'London',
                  label: 'London'
                },
                {
                  value: 'Sydney',
                  label: 'Sydney'
                },
                {
                  value: 'Ottawa',
                  label: 'Ottawa'
                },
                {
                  value: 'Paris',
                  label: 'Paris'
                },
                {
                  value: 'Canberra',
                  label: 'Canberra'
                }
              ]
            }
          },
          {
            title: '查看',
            type: true,
            key: 'link',
            align: 'center',
            editable: true,
            edittype: 'link',
            options: {
              target: '_blank'
            }
          },
          {
            title: '成本',
            type: false,
            key: 'cost',
            editable: true,
            edittype: 'input',
            options: {
              placeholder: '请输入金额'
            }
          },
          {
            title: '报价',
            key: 'price',
            editable: true,
            edittype: 'number',
            options: {
              min: 10,
              max: 1000
            }
          },
          {
            title: '添加时间',
            key: 'addTime',
            editable: true,
            edittype: 'datePicker'
          },
          {
            title: '操作',
            width: 65,
            key: 'handle',
            editable: true,
            edittype: 'button'
          }
        ],
        data: [
          {
            author: true,
            checks: true,
            link: {
              value: '百度',
              href: 'https://www.baidu.com'
            },
            spec: 'Ottawa',
            cost: 1500,
            price: 1600,
            addTime: '2018-10-24'
          },
          {
            author: false,
            checks: true,
            spec: 'London',
            cost: 1500,
            price: 1600,
            addTime: '2018-10-28'
          }
        ]
      },
      tableData2: {
        columns: [
          {
            title: '序',
            type: 'index',
            width: 50,
            align: 'center'
          },
          {
            title: '合同状态',
            key: 'status'
          },
          {
            title: '合同名称',
            key: 'name'
          },
          {
            title: '生效时间',
            key: 'tokeDate',
            editable: true,
            edittype: 'datePicker'
          },
          {
            title: '失效时间',
            key: 'loseData',
            editable: true,
            edittype: 'datePicker',
            options: {

            }
          },
          {
            title: '合同附件',
            key: 'upload',
            editable: true,
            edittype: 'upload',
            // 上传组件配置数据
            fileConfig: {
              // 文件后缀格式验证, 默认['txt', 'doc', 'docx', 'png', 'pdf', 'jpg', 'excel']
              formatData: ['txt', 'doc', 'docx', 'png', 'pdf', 'jpg', 'excel'],
              // 第一次上传到服务器的url （七牛服务器）
              action: 'http://upload.qiniu.com/',
              // 限制的文件大小, 默认20mb
              maxSize: 20 * 1024,
              // 下载文件的路径
              fileDownUrl: ''
            }
          },
          {
            title: '操作',
            width: 80,
            align: 'center',
            key: 'handle',
            editable: true,
            edittype: 'button'
          }
        ],
        data: [
          {
            status: '已生效',
            name: '电子合同证书',
            tokeDate: '2016-10-03',
            loseData: '2018-01-21',
            // 文件url
            defaultFileList: [{
              name: 'img1.jpg',
              url: 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3147313458,2584044501&fm=85&s=59B323D1765E3FCE1F0CC85303003093'
            }]
          }
        ]
      }
    }
  },
  methods: {
    getDate () {
      console.log(this.tableData.data)
    },
    getDate2 () {
      console.log(this.tableData2.data)
    },
    addDate () {
      this.tableData.data.push({
        author: false,
        checks: false,
        spec: '',
        cost: 0,
        price: 0,
        addTime: ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  padding: 50px;
}
</style>
