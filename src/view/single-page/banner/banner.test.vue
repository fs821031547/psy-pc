<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<div id="app">
    <tabs v-model="tagValue" style="display:inline-block" @on-click="tagChange">
      <tab-pane :key="tagLabel[0].label" :label="tagLabel[0].label" :name="tagLabel[0].name"></tab-pane>
      <tab-pane :key="tagLabel[1].label" :label="tagLabel[1].label" :name="tagLabel[1].name"></tab-pane>
      <tab-pane :key="tagLabel[2].label" :label="tagLabel[2].label" :name="tagLabel[2].name"></tab-pane>
    </tabs>
    <div style="float:right;margin-right:10px;">
      <i-button type="primary" size="large" @click="addBanner">添加轮播</i-button>
    </div>
    <row class="row-text-center" :gutter="16">
      <i-col offset="1" span="14">
          <i-form ref="form1" v-if="tagValue==0" v-for="item in formItemArr1" :key="item.id" :label-width="80" :model="formItemArr1[currentTag]" :rules="formRule">
            <form-item label="主标题：" prop="title">
              <i-input v-model="item.title" clearable placeholder="请输入主标题"/>
            </form-item>
            <form-item label="副标题：" prop="secondTitle">
              <i-input v-model="item.secondTitle" clearable placeholder="请输入副标题"/>
            </form-item>
            <form-item label="按钮链接：">
              <i-input v-model="item.linkUrl" clearable placeholder="请输入按钮链接"/>
            </form-item>
            <form-item label="按钮文字：">
              <i-input v-model="item.description" clearable placeholder="请输入按钮文字"/>
            </form-item>
          </i-form>
          <i-form ref="form2" v-if="tagValue==1" v-for="item in formItemArr2" :key="item.id" :label-width="80" :model="formItemArr2[currentTag]" :rules="formRule">
            <form-item label="主标题：" prop="title">
              <i-input v-model="item.title" clearable placeholder="请输入主标题"/>
            </form-item>
            <form-item label="副标题：" prop="secondTitle">
              <i-input v-model="item.secondTitle" clearable placeholder="请输入副标题"/>
            </form-item>
            <form-item label="按钮链接：">
              <i-input v-model="item.linkUrl" clearable placeholder="请输入按钮链接"/>
            </form-item>
            <form-item label="按钮文字：">
              <i-input v-model="item.description" clearable placeholder="请输入按钮文字"/>
            </form-item>
          </i-form>
          <i-form ref="form3" v-if="tagValue==2" v-for="item in formItemArr3" :key="item.id" :label-width="80" :model="formItemArr3[currentTag]" :rules="formRule">
            <form-item label="主标题：" prop="title">
              <i-input v-model="item.title" clearable placeholder="请输入主标题"/>
            </form-item>
            <form-item label="副标题：" prop="secondTitle">
              <i-input v-model="item.secondTitle" clearable placeholder="请输入副标题"/>
            </form-item>
            <form-item label="按钮链接：">
              <i-input v-model="item.linkUrl" clearable placeholder="请输入按钮链接"/>
            </form-item>
            <form-item label="按钮文字：">
              <i-input v-model="item.description" clearable placeholder="请输入按钮文字"/>
            </form-item>
          </i-form>
        </i-col>
        <i-col offset="1" span="2">
          <div style="height:20px;"></div>
          <i-button type="primary" size="large" @click="handleSave" long>保存</i-button>
          <div style="height:20px;"></div>
          <i-button type="error" size="large" long>清除</i-button>
        </i-col>
      </row>
</div>

    var formItemTemp = {
      title: '',
      secondTitle: '',
      linkUrl: '',
      description: '',
      imgUrl: ''
     }
    var Main = {
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
        formItemArr1: [{
      title: '',
      secondTitle: '',
      linkUrl: '',
      description: '',
      imgUrl: ''
     }],
        formItemArr2: [{
      title: '',
      secondTitle: '',
      linkUrl: '',
      description: '',
      imgUrl: ''
     }],
        formItemArr3: [{
      title: '',
      secondTitle: '',
      linkUrl: '',
      description: '',
      imgUrl: ''
     }],
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
    addBanner () {
      var str = 'formItemArr'+this.currentTag
      console.log(str)
      console.log(this[str])
      this[str].push({
      title: '',
      secondTitle: '',
      linkUrl: '',
      description: '',
      imgUrl: ''
     })
    },
    handleSave(){

    },
    tagChange (name) {
      // console.log('name:', this.tagValue)
      name = Number(name)
      this.currentTag = name
    },
    handleSave () {
			console.log('formitemArr1:',this.formItemArr1)
      console.log('formitemArr2:',this.formItemArr2)
      console.log('formitemArr3:',this.formItemArr3)
    }
 	}
 }
var Component = Vue.extend(Main)
new Component().$mount('#app')
