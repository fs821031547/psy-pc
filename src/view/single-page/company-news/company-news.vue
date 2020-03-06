<template>
  <div>
    <Card>
      <div class="search-con">
        <Button type="primary" @click="modalTrigger('add')" icon="plus">发布动态</Button>
        <!-- <Input v-model="keyword" placeholder="搜索关键字" class="search-input">
          <Button slot="append" icon="ios-search"></Button>
        </Input> -->
      </div>
      <Tabs v-model="tagValue" @on-click="tagChange">
        <TabPane v-for="item in tagLabel" :key="item.label" :label="item.label" :name="item.name"></TabPane>
      </Tabs>
      <Table border :loading="listLoding" :columns="listColumns" :data="listDatas"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.pageTotal" :page-size="page.pageSize" :current="page.currentPage" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
    <Modal v-model="modalAdd" footer-hide width="800" @cancel="modalSaveCancel" class="modal-box">
      <div slot="header" style="height:20px;"></div>
      <div>
        <Form ref="form" :model="formItem" :rules="formRule" :label-width="80">
          <FormItem label="类型：">
            <RadioGroup v-model="formItemType" @on-change="radioChange">
              <Radio v-for="(item,index) in tagLabel" v-if="index>0" :key="item.value" :label="item.label"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="标题：" prop="title">
            <Input v-model="formItem.title" clearable placeholder="请输入动态标题"/>
          </FormItem>
          <FormItem label="标签：" prop="content.tag">
            <Select v-if="formItemType=='企业新闻'" @on-change="changeHandle($event,'comp_function')" placeholder="请选择标签（支持多选）" label-in-value v-model="formItem.content.tag" multiple>
              <Option v-for="item in websiteTag.news" :label="item.typeValue" :key="item.typeValue" :value="item.id"></Option>
            </Select>
            <Select v-else  @on-change="changeHandle($event,'comp_function')" placeholder="请选择标签（支持多选）" label-in-value v-model="formItem.content.tag" multiple>
              <Option v-for="item in websiteTag.info" :label="item.typeValue" :key="item.typeValue" :value="item.id"></Option>
            </Select>
          </FormItem>
          <FormItem label="简介：" prop="description">
            <Input v-model="formItem.description" type="textarea" :rows="4" placeholder="请输入动态简介" />
          </FormItem>
          <FormItem label="配图：" prop="imgUrl">
            <Upload
                ref="upload"
                class="upload-item"
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
                style="width:500px;"
                >
              <Input v-model="formItem.imgUrl" clearable placeholder="点击上传配图"/>
            </Upload>
          </FormItem>
          <div style="height:20px;"></div>
          <FormItem label="正文：">
            <editor ref="editor" @on-change="editChange" :upload="uploadData.mount"/>
          </FormItem>
          <div style="height:20px;"></div>
        </Form>
        <Button type="primary" size="large" :loading="btn_loading" style="margin-left:30px" @click.native="handleSave('form')">{{ contentId ? '修改':'发布'}}</Button>
      </div>
    </Modal>
    <Modal
    v-model="modalDelete"
    title="删除客户案例"
    :loading="true"
    @on-ok="modalDeleteOk"
    >
    <p>你确定要删除该客户案例吗？</p>
    </Modal>
  </div>
</template>

<script>
import './index.less'
import { contentInit } from './data'
import { invert, cloneDeep } from 'lodash'
import { QiniuHead } from '_conf/config.default'
import Editor from '_c/editor'
// import { listColumns, listDatas } from './table'
import { mapActions } from 'vuex'
const cloneContentInit = cloneDeep(contentInit)
export default {
  name: 'company-news',
  components: {
    Editor
  },
  data () {
    return {
      keyword: '',
      contentList: '',
      navId: '',
      navObj: {},
      tagValue: 'name',
      tagLabel: [
        {label: '全部', name: ''},
        {label: '企业新闻', name: ''},
        {label: '产品资讯', name: ''}
      ],
      websiteTag: {
        news: [],
        info: []
      },
      page: {
        pageTotal: 0,
        pageSize: 10,
        currentPage: 1
      },
      contentId: '',
      btn_loading: false,
      formItem: contentInit,
      formItemType: '企业新闻',
      formRule: {
        'title': [
          { required: true, message: '请输入标题！', trigger: 'blur' },
          { type: 'string', max: 50, message: '最多不能超过50个字符', trigger: 'blur' }
        ],
        'content.tag': [
          { required: true, type: 'array', message: '请选择标签！', trigger: 'change' }
        ],
        'description': [
          { required: true, message: '请输入简介！', trigger: 'blur' }
        ],
        'imgUrl': [
          { required: true, message: '请上传配图！', trigger: 'blur' }
        ]
      },
      modalAdd: false,
      modalStatus: '',
      modalDelete: false,
      listLoding: false,
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
      },
      listColumns: [{
        title: '标题',
        key: 'title',
        align: 'center'
      },
      {
        title: '类型',
        key: 'type',
        align: 'center'
      },
      {
        title: '发布日期',
        key: 'showTime',
        align: 'center'
      },
      // {
      //   title: '发布者',
      //   key: 'title',
      //   align: 'center'
      // },
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
          const renderObj1 = h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                const paramsId = contentCurrent.id
                const paramsObj = {
                  id: paramsId
                }
                this.contentId = paramsId
                this.modalTrigger('edit')
                this.handleUpdateView(paramsObj)
              }
            }
          }, '改')
          const renderObj2 = h('Button', {
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
          const contentCurrent = this.contentList[params.index]

          let renderArr
          if (this.navObj[contentCurrent.navId] === '同业专访') {
            renderArr = [renderObj2]
          } else {
            renderArr = [renderObj1, renderObj2]
          }
          return h('div', renderArr)
        }
      }
      ],
      listDatas: []
    }
  },
  methods: {
    ...mapActions([
      'getToken',
      'contentAdd',
      'contentUpdate',
      'websiteContentList',
      'websiteContentDetail',
      'websiteContentDelete',
      'websiteNavList',
      'websiteTagList'
    ]),
    radioChange (item) {
      const invertNavObj = invert(this.navObj)
      this.formItem.navId = invertNavObj[item]
      console.log('item:', this.websiteTag.info)
    },
    editChange (html, text) {
      this.formItem.content.content = html
      // console.log('text:', text)
      // console.log('html:', html)
    },
    tagChange (name) {
      // console.log('name:', this.tagValue)
      this.navId = name
      this.followRequest()
    },
    changePage (page) {
      this.page.currentPage = page
      this.followRequest()
    },
    changeHandle (event, value) {
      if (event) {
        const valueArr = event.map(x => {
          return x.label
        })
        this.tags = valueArr
      }
    },
    changeEditorText (html) {
      if (html.startsWith('<p>') && html.endsWith('</p>')) {
        this.$refs.editor.setHtml(html)
        return
      }
      this.$refs.editor.setHtml(`<p>${html}</p>`)
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
    // 显示修改内容
    handleUpdateView (paramsObj) {
      this.websiteContentDetail(paramsObj).then(res => {
        if (res.data) {
          const content = res.data
          const tempObject = {}
          const contentObj = JSON.parse(content.content)
          content.content = contentObj
          const contentTag = (contentObj.tag && contentObj.tag.split(',')) || [] // tag字符串转换成tag字符串数组
          let websiteTag
          const contentNavTitle = this.navObj[content.navId]
          if (contentNavTitle === '企业新闻') {
            websiteTag = this.websiteTag.news
          } else {
            websiteTag = this.websiteTag.info
          }
          this.formItemType = contentNavTitle
          console.log('websiteTag:', websiteTag)
          console.log('contentTag:', contentTag)
          const selectTag = contentTag.map(x => {
            const result = websiteTag.find(y => {
              return x === y.typeValue
            })
            return result ? result.id : result
          })
          // result && this.changeHandle({label: result.typeValue, id: result.id})

          // console.log('selectTag:', selectTag)

          // contentTag.tag = selectTag
          const formItemKeys = Object.keys(this.formItem)
          formItemKeys.forEach(x => {
            tempObject[x] = content[x]
          })
          this.formItem = tempObject
          this.changeEditorText(tempObject.content.content)
          this.formItem.content.tag = selectTag
          console.log('this.formitem:', this.formItem)
          // console.log('contentList:', tempObject)
        }
      })
    },
    handleSave (name) {
      this.$refs[name].validate((valid) => {
        console.log('valid:', this.formItem)
        console.log(valid)
        if (valid) {
          const invertNavObj = invert(this.navObj)
          const contentAdd = cloneDeep(this.formItem)
          if (!contentAdd.content.content) {
            this.$Message.error('请输入正文!')
            return
          }
          const tagsLabel = this.tags
          contentAdd.content.tag = tagsLabel.join()
          contentAdd.navId = invertNavObj[this.formItemType]
          console.log('contentAdd:', this.formItem.content.tag)
          contentAdd.tags = this.formItem.content.tag.join()
          contentAdd.content = JSON.stringify(contentAdd.content)
          this.btn_loading = true
          this.handleRequest(contentAdd).then(res => {
            this.btn_loading = false
            if (res.status === '110000') {
              this.$Message.success('操作成功！')
            } else {
              this.$Message.error('操作失败！')
            }
            this.contentId = ''
            this.modalTrigger('edit')
            this.followRequest()
          })
        } else {
          this.$Message.error('保存失败!')
        }
      })
    },
    // 操作请求 新增内容或修改内容
    handleRequest (data) {
      console.log('data:', data)
      console.log('contentId:', this.contentId)
      if (this.contentId) {
        data.id = this.contentId
        return this.contentUpdate(data)
      }
      return this.contentAdd(data)
    },
    modalTrigger (params) {
      if (params === 'add' && this.modalStatus !== 'add') {
        // console.log('this.modalstatus:', this.modalStatus)
        this.contentId = ''
        this.formItem = cloneDeep(cloneContentInit)
        this.$refs.form.resetFields()
      } else if (params === 'edit') {
        this.formItem = cloneDeep(cloneContentInit)
        this.$refs.form.resetFields()
      }

      this.modalStatus = params
      this.modalAdd = !this.modalAdd
    },
    modalDeleteOk () {
      const contentId = this.contentId
      const paramsId = this.contentList[contentId].id
      const paramsObj = { id: paramsId }
      this.websiteContentDelete(paramsObj).then(res => {
        this.contentId = ''
        this.modalDelete = false
        this.followRequest()
      })
    },
    modalSaveCancel () {
      this.contentId = ''
    },
    initRequest () {
      this.listLoding = true
      this.websiteNavList({}).then(() => {
        this.followRequest()
      })
    },
    followRequest () {
      const pageInfo = this.$store.state.content.pageInfo
      const headerInfo = this.$store.state.content.headerInfo
      // console.log('pageinfo:', pageInfo)
      if (!this.navId) {
        let navIdArr = []
        const navObj = this.navObj
        const actionData = headerInfo.find(x => {
          return x.name === '最新动态'
        })
        pageInfo.forEach(x => {
          if (x.parentId === actionData.id) {
            switch (x.name) {
              case '企业新闻':
                navIdArr[0] = x.id
                navObj[x.id] = x.name
                break
              case '产品资讯':
                navIdArr[1] = x.id
                navObj[x.id] = x.name
                break
              case '同业专访':
                navIdArr[2] = x.id
                navObj[x.id] = x.name
                break
              default:
                break
            }
          }
        })
        this.navId = actionData.id
        const tagLabel = this.tagLabel
        tagLabel[0].name = actionData.id.toString()
        tagLabel[1].name = navIdArr[0].toString()
        tagLabel[2].name = navIdArr[1].toString()
        this.tagValue = actionData.id.toString()
      }
      const page = this.page
      const tagLabel = this.tagLabel
      const contentParams = {
        pageNum: page.currentPage,
        pageSize: page.pageSize,
        // navId: this.navId
        navIds: [tagLabel[1].name, tagLabel[2].name]

      }
      this.listLoding = true
      const navObj = this.navObj
      this.websiteContentList(contentParams).then(res => {
        if (res.data) {
          this.listLoding = false
          const listDatas = []
          const tempList = res.data.list
          tempList.forEach(x => {
            // if (navObj[x.navId]) {
            const tempObj = {}
            x.content = JSON.parse(x.content)
            tempObj.type = navObj[x.navId]
            Object.assign(tempObj, x)
            listDatas.push(tempObj)
            // }
          })
          this.listDatas = listDatas
          this.contentList = res.data.list
          page.pageTotal = res.data.total
        }
      })
    },
    setToken () {
      this.getToken().then(res => {
        this.uploadData.mount.token = res.qn_upToken
        return true
      })
    }
  },
  mounted () {
    this.initRequest()
    this.setToken()
    this.websiteTagList().then(res => {
      const websiteTag = this.websiteTag
      if (res.data) {
        res.data.list.forEach(item => {
          switch (item.type) {
            case 5:
              websiteTag.news.push(item)
              break
            case 6:
              websiteTag.info.push(item)
              break
            default:
              break
          }
        })
        console.log(websiteTag)
      } else {
        this.$Message.error('后台小哥哥发脾气了,并给你抛出了：', res.msg)
      }
    })
  }
}
</script>

<style>

</style>
