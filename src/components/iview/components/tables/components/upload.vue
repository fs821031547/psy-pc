<template>
  <iv-fileUpload
    @onFormatError='onFormatError'
    @exceededSize='exceededSize'
    @onRemove='onRemove'
    @downFileSuc='downFileSuc'
    @downFileErr='downFileErr'
    @beforeUpload='beforeUpload'
    @onError='onError'
    @onSuccess='onSuccess'
    :fileDownUrl='fileConfig.fileDownUrl || ""'
    :action='fileConfig.action || ""'
    :defaultFileList='fileConfig.defaultFileList || []'
    :maxSize='fileConfig.maxSize || 20*1024'
    :formatData='fileConfig.formatData || []'/>
</template>

<script>
export default {
  props: {
    fileConfig: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 上传文件格式失败
    onFormatError (file, fileList) {
      this.$emit('onFormatError', file, fileList)
    },
    // 上传文件大小失败
    exceededSize (file, fileList) {
      this.$emit('exceededSize', file, fileList)
    },
    // 上传成功的值
    onSuccess (res, file, list) {
      this.$emit('setDefault', res, file, list)
      this.$emit('onSuccess', res, file, list)
    },
    // 删除文件回调
    onRemove () {
      this.$emit('onRemove')
    },
    // 下载文件成功回调
    downFileSuc (file) {
      this.$emit('downFileSuc', file)
    },
    // 下载文件失败回调
    downFileErr (file, error) {
      this.$emit('downFileErr', file, error)
    },
    // 上传文件之前的回调
    beforeUpload (file, list) {
      this.$emit('beforeUpload', file, list)
    },
    // 上传文件失败回调
    onError (error, file, fileList) {
      this.$emit('onError', error, file, fileList)
    }
  }
}
</script>

<style>

</style>
