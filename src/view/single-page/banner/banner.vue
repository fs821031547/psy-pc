<template>
  <Card>
    <Tabs v-model="tagValue" style="display:inline-block" @on-click="tagChange">
      <TabPane v-for="item in tagLabel" :key="item.label" :label="item.label" :name="item.name"></TabPane>
    </Tabs>
    <div style="float:right;margin-right:10px;">
      <Button type="primary" size="large" @click="addBanner">添加轮播</Button>
    </div>
  <Card>
    <Row class="row-text-center" :gutter="16">
      <Col span="5">
        <Upload
          ref="upload"
          class="upload-item ivu-upload-drag"
          :show-upload-list="false"
          :on-success="handleOneSuccess"
          :data="uploadData.mount"
          :format="uploadData.format"
          :accept="uploadData.accept"
          :max-size="uploadData.maxSize"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :action="uploadData.action"
          style="width:100%;height:200px"
          >
          <img v-if="formItem.imgUrl" :src="formItem.imgUrl" alt="formItem.imgUrl">
          <div v-else style="padding: 40px 0">
            <Icon type="ios-cloud-upload" size="80" style="color: #3399ff"></Icon>
            <p>点击上传</p>
        </div>
          <!-- <Input v-model="formItem.imgUrl" clearable placeholder="点击上传配图"/> -->
        </Upload>
      </Col>
      <Col offset="1" span="14">
        <Form ref="form" v-for="item in formItemArr[currentTag]" :key="item.id" :label-width="80" :model="formItemArr[currentTag]" :rules="formRule">
          <FormItem label="主标题：" prop="title">
            <Input v-model="item.title" clearable placeholder="请输入主标题"/>
          </FormItem>
          <FormItem label="副标题：" prop="secondTitle">
            <Input v-model="item.secondTitle" clearable placeholder="请输入副标题"/>
          </FormItem>
          <FormItem label="按钮链接：">
            <Input v-model="item.linkUrl" clearable placeholder="请输入按钮链接"/>
          </FormItem>
          <FormItem label="按钮文字：">
            <Input v-model="item.description" clearable placeholder="请输入按钮文字"/>
          </FormItem>
        </Form>
      </Col>
      <Col offset="1" span="2">
        <div style="height:20px;"></div>
        <Button type="primary" size="large" @click="handleSave" long>保存</Button>
        <div style="height:20px;"></div>
        <Button type="error" size="large" long>清除</Button>
      </Col>
    </Row>
  </Card>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'
import { QiniuHead } from '_conf/config.default'
// import { invert } from 'lodash'

// const formItemTemp = {
//   title: '',
//   secondTitle: '',
//   linkUrl: '',
//   description: '',
//   imgUrl: ''
// }
export default {
  data () {
    return {
      tagValue: '0',
      currentTag: 0,
      tagLabel: [
        {label: '首页', name: '0'},
        {label: '小强学院', name: '1'},
        {label: '最新动态', name: '2'}
      ],
      tagIds: [],
      formItemArr: [[], [], []],
      formItem: {
        title: '',
        secondTitle: '',
        linkUrl: '',
        description: '',
        imgUrl: ''
      },
      formRule: {
        'title': [
          { required: true, message: '请输入主标题！', trigger: 'blur' },
          { type: 'string', max: 20, message: '最多不能超过20个字符', trigger: 'blur' }
        ],
        'secondTitle': [
          { required: true, type: 'string', message: '请选择副标题！', trigger: 'blur' }
        ]
      },
      uploadData: {
        format: ['jpg', 'jpeg', 'png'],
        accept: 'image/jpg, image/jpeg, image/png',
        maxSize: 1024 * 500, // 以 byte 为单位
        name: 'file',
        action: 'https://upload.qbox.me/',
        domain: '',
        disabled: false,
        canUpload: false,
        progress: 0,
        mount: {
          key: '',
          token: ''
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'contentAdd',
      'contentUpdate',
      'websiteTagList',
      'getToken',
      'websiteContentList',
      'websiteContentDetail',
      'websiteContentDelete',
      'websiteNavList'
    ]),
    addBanner () {

    },
    tagChange (name) {
      // console.log('name:', this.tagValue)
      name = Number(name)
      this.currentTag = name
      if (!this.formItemArr[name]) {
        this.getWebsiteContentList(name)
      }
    },
    getWebsiteContentList (name) {
      const params = {
        id: this.tagIds[name]
      }
      this.websiteContentList(params).then(res => {
        if (res.data) {
          const list = res.data.list
          this.formItemArr[name] = list
        }
      })
    },
    getWebsiteNavId () {
      const pageInfo = this.$store.state.content.pageInfo
      const headerInfo = this.$store.state.content.headerInfo
      console.log('pageinfo:', pageInfo)
      const tagLabel = this.tagLabel
      const navArr = tagLabel.map(y => {
        const actionData = headerInfo.find(x => {
          return x.name === y.label
        })
        return actionData
      })
      const tagIds = this.tagIds
      navArr.forEach((y, index) => {
        pageInfo.forEach(x => {
          if (x.parentId === y.id) {
            switch (x.name) {
              case '轮播':
                // tagLabel[index].name = x.id.toString()
                tagIds.push(x.id)
                break
            }
          }
        })
      })
      // console.log('tagLabel:', tagLabel)
      // this.tagValue = tagLabel[0].name
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件 ' + file.name + ' 太大, 不能超过 500M.'
      })
    },
    handleBeforeUpload (file) {
      const date = new Date()
      // 获取文件扩展名
      const fileType = file.name.substring(file.name.lastIndexOf('.'))
      const uid = Math.floor(Math.random() * 10000000)
      const key = 'official/img/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
      date.getDate() + '/' + uid + fileType
      return this.getToken().then(res => {
        // res.token
        // this.uploadData.domain = res.dn
        this.uploadData.mount.token = res.qn_upToken
        this.uploadData.mount.key = key
        return true
      })
    },
    handleOneSuccess (res, file) {
      if (res.key) {
        this.formItem.imgUrl = QiniuHead + res.key
      } else {
        this.$Message.error('上传失败！')
      }
    },
    handleSave () {

    }
  },
  mounted () {
    this.websiteNavList({}).then(() => {
      this.getWebsiteNavId()
    })
  }
}
</script>

<style scoped>
/* .row-text-center{
  text-align: center
} */
</style>
