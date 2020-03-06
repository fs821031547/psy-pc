<template>
  <Modal v-model="modalAdd" footer-hide width="700" @cancel="modalSaveCancel" class="modal-box">
    <div slot="header" style="height:20px;"></div>
    <div>
      <Form ref="form" :model="formItem" :rules="formRule" :label-width="80">
        <FormItem label="类型" prop="content.top.comp_name">
          <RadioGroup v-model="animal">
            <Radio label="新闻动态"></Radio>
            <Radio label="产品咨询"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="标题" prop="content.type">
          <Input v-model="formItem.title" clearable placeholder="请输入动态标题"/>
        </FormItem>
        <FormItem label="标签" prop="content.top.comp_function">
          <Select @on-change="changeHandle($event,'comp_function')" placeholder="请选择标签（支持多选）" label-in-value v-model="formItem.content.top.comp_function" multiple>
            <Option v-for="item in websiteTag.function" :label="item.typeValue" :key="item.typeValue" :value="item.id"></Option>
          </Select>
        </FormItem>
        <FormItem label="简介" prop="description">
          <Input v-model="formItem.description" type="textarea" :rows="4" placeholder="请输入动态简介" />
        </FormItem>
        <editor ref="editor" @on-change="handleChange"/>
        <div class="erp-story-box">
          <Upload
            ref="upload"
            class="my-upload"
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
            style="width:100px;height:100px;margin-left:30px;border-radius:100%;float:left;">
            <div style="width: 100px;height:100px;line-height: 100px;cursor:pointer;">
              <img width="100%" height="100%" v-if="formItem.content.three.img" :src="formItem.content.three.img" :alt="formItem.content.three.img">
              <Icon v-else type="ios-camera" size="20"/>
            </div>
          </Upload>
        </div>
        <div style="height:20px;"></div>
      </Form>
      <Button type="primary" size="large" :loading="btn_loading" style="margin-left:30px" @click.native="handleSave('form')">发布</Button>
    </div>
  </Modal>
</template>

<script>
import Editor from '_c/editor'
export default {
  components: {
    Editor
  },
  props: {

  },
  data () {
    return {
      btn_loading: false
    }
  },
  methods: {
    handleChange () {

    }
  }
}
</script>

<style scoped>

</style>
