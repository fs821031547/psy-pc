<template>
<Drawer :title="isEdit ? '编辑': '添加'"
  v-model="closeWin"
  width="600"
  :mask-closable="false"
  :closable="false"
  :transfer="false"
  inner
  scrollable>
<iv-layout>
      <div slot="main">
        <h2 style="font-size: 16px; padding: 0 0 8px 4px;">供应商信息</h2>
        <Form :model="formValidate" class="iv-form">
          <Row>
            <Col span="24">
              <iv-input label="名称" :value="formValidate.name" clearable placeholder="请输入名称"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <iv-input type="text" label="定位" required value="abwwe"></iv-input>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <iv-cascader :data="cascader" :change-on-select="true" filterable v-model="cascaderValue" label="所在地区"></iv-cascader>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <iv-input type="text" label="标签" v-model="tVal" @on-enter="onTagEnter"></iv-input>
            </Col>
          </Row>
          <Row v-if="tags.length">
            <Col span="24">
              <iv-space>
                <Tag closable v-for="item in tags" :key="item">{{item}}</Tag>
              </iv-space>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <iv-input type="textarea" :rows="4" label="介绍" value="abwwe"></iv-input>
            </Col>
          </Row>
          <Row>
            <Col class="iv-item-border" span="24">
                <iv-imgUpload
                  @onFormatError='onFormatError'
                  @exceededSize='exceededSize'
                  @onRemove='onRemove'
                  @downFileSuc='downFileSuc'
                  @downFileErr='downFileErr'
                  @beforeUpload='beforeUpload'
                  @onError='onError'
                  :multiple='true'
                  :fileDownUrl='fileConfig.fileDownUrl'
                  :action='fileConfig.action'
                  :maxSize='fileConfig.maxSize'
                  :formatData='fileConfig.formatData'>
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>添加图片</p>
                  </div>
                </iv-imgUpload>
                <div style='margin-left:10px;'> 图片上传支持jpg,png,gif格式，大小不超过5M</div>
            </Col>
          </Row>
        </Form>
        <br />
        <Row>
          <Col span="24">
            <h2 style="font-size: 16px; padding: 0 0 8px 4px;">产品价格</h2>
            <iv-table :columns='columns' border :data='data'></iv-table>
          </Col>
          <Col span="24" style="padding-top: 8px;">
            <Button icon="md-add" style="width: 160px;">
              <strong>添加</strong>
            </Button>
          </Col>
        </Row>
      </div>
      <div slot="foot" style="text-align: right">
        <Button style="width: 80px;" type="primary">保存</Button>
        <Button type="primary">继续添加</Button>
        <Button style="width: 80px;" @click="onClose">关闭</Button>
      </div>
    </iv-layout>
</Drawer>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isType: {
      type: String,
      default: 'area'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(this.type)
    console.log(this.edit)
  },
  data () {
    return {
      closeWin: false,
      tVal: '',
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
      },
      tags: [],
      formValidate: {
        name: 'wedewdw'
      },
      columns: [
        {
          title: '序',
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '规格',
          key: 'spec',
          editable: true,
          edittype: 'select',
          select: {
            placeholder: '请选择部门'
          }
        },
        {
          title: '查看',
          key: 'link',
          align: 'center',
          editable: true,
          edittype: 'link'
        },
        {
          title: '成本',
          key: 'cost',
          editable: true,
          edittype: 'input',
          input: {
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
          title: '市场价',
          key: 'sprice',
          editable: true,
          edittype: 'input',
          required: true
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
          cost: 1500,
          price: 1600,
          sprice: 1200
        },
        {
          cost: 1500,
          price: 1600,
          sprice: 1200
        }
      ],
      checkboxValue: ['景区', '餐厅'],
      checkbox: [
        {
          label: '酒店',
          disabled: true
        },
        {
          label: '景区'
        },
        {
          label: '餐厅'
        },
        {
          label: '住宿'
        }
      ],
      cascaderValue: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
      cascader: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }]
    }
  },
  methods: {
    onClose () {
      this.closeWin = false
      this.$emit('input', false)
    },
    onTagEnter () {
      if (this.tVal && this.tags.indexOf(this.tVal) < 0) {
        this.tags.push(this.tVal)
      }
      this.tVal = ''
    },
    // 上传文件格式失败
    onFormatError (file, fileList) {
      this.$Message.error({
        content: `请上传${this.fileConfig.formatData.join(',')}格式的文件!`,
        duration: 6
      })
    },
    // 上传文件大小失败
    exceededSize (file, fileList) {
      this.$Message.error({
        content: `上传的文件请不要大于${this.maxSize / 1024}MB!!`,
        duration: 6
      })
    },
    // 删除文件回调
    onRemove () {
      console.log('删除')
    },
    // 下载文件成功回调
    downFileSuc (file) {
      console.log(file)
    },
    // 下载文件失败回调
    downFileErr (file, error) {
      this.$Message.error({
        content: '下载失败! ' + error,
        duration: 6
      })
    },
    // 上传文件之前的回调
    beforeUpload (file) {
      console.log(file)
    },
    // 上传文件失败回调
    onError (error, file, fileList) {
      console.log(error)
    }

  },
  watch: {
    value () {
      this.closeWin = true
    }
  }
}
</script>
