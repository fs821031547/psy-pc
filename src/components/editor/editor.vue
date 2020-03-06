<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    upload: {
      type: Object,
      default () {
        return {
          token: ''
        }
      }
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      time: null,
      timeout: null,
      content: '',
      editor: null,
      domain: '',
      token: '',
      loading: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  watch: {
    upload: {
      handler (val) {
        // 获取到七牛token后在初始化编辑器
        this.token = val.token
        // this.loading = false;
        if (this.editor) return
        this.editor = this.setEditor()
      },
      deep: true // 深度监听对象中属性的变化
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    },
    setEditor () {
      const editor = new Editor(`#${this.editorId}`)
      const _this = this
      let loadingMsg = null
      editor.customConfig.onchangeTimeout = this.changeInterval
      // 配置上传图片至七牛云服务
      editor.customConfig.uploadImgServer = 'https://upload.qbox.me/'
      editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      editor.customConfig.zIndex = 100 // 编辑区层级初始化
      editor.customConfig.uploadImgMaxSize = 4 * 1024 * 1024 // 限制图片大小为 4M
      editor.customConfig.onchange = true // 可以使用editor.change() 监听js动态修改的内容
      editor.customConfig.pasteFilterStyle = false // 不过虑黏贴样式
      editor.customConfig.uploadFileName = 'file' // 七牛需指定 name="file"
      editor.customConfig.uploadImgParams = {
      // 属性值会自动进行 encode ，此处无需 encode, 七牛上传不需要encode，encode会导致token失效
        token: this.token
      }

      editor.customConfig.onchange = (html) => {
        let text = this.editor.txt.text()
        if (this.cache) localStorage.editorCache = html
        this.$emit('input', this.valueType === 'html' ? html : text)
        this.$emit('on-change', html, text)
      }
      // 图片上传触发回调
      editor.customConfig.uploadImgHooks = {
        before (xhr, editor, files) {
          const date = new Date()
          // 获取文件扩展名
          const fileType = files[0].name.substring(files[0].name.lastIndexOf('.'))
          const uid = Math.floor(Math.random() * 10000000)
          const key = 'official/img/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
          date.getDate() + '/' + uid + fileType
          editor.customConfig.uploadImgParams.key = key
          loadingMsg = _this.$Message.loading({
            content: '图片正在上传...',
            duration: 0
          })
        },
        success (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          loadingMsg() // 移除loading 提示
          _this.$Message.success('图片上传成功！')
        },
        fail (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          loadingMsg() // 移除loading 提示
          _this.error('图片上传失败！', result)
        },
        error (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          loadingMsg() // 移除loading 提示
        },
        timeout (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          loadingMsg() // 移除loading 提示
        },
        customInsert (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          loadingMsg() // 移除loading 提示
          const imgUrl = `https://ohp96o3wl.qnssl.com/${result.key}`
          insertImg(imgUrl)
        }
      }
      editor.create()
      // 如果本地有存储加载本地存储内容
      let html = this.cache && (this.value || localStorage.editorCache)
      if (html) editor.txt.html(html)
      return editor
    }
  },
  mounted () {

    // this.editor = editor
    // // 如果本地有存储加载本地存储内容
    // let html = this.value || localStorage.editorCache
    // if (html) editor.txt.html(html)
  }
}
</script>

<style>

</style>
