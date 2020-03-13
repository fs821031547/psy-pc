<template>
  <div>
    <Card class="agree-box">
    <Steps :current="3">

    </Steps>
    </Card>
    <div class="blank"></div>
    <Card class="agree-box">
      <Form :model="formItem" :label-width="120">
        <FormItem label="专业形象照">
          <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择图片</Button>
            <div class="xx-photo-box">
              <img src="@/assets/images/xingxiang.jpg" alt="形象照">
            </div>
          </Upload>
        </FormItem>
        <FormItem label="咨询方式价格">
          <div class="formItem-memo">价格需为50的倍数；不填写某个价格，即表示不提供该咨询方式服务</div>
          <FormItem label="文字咨询" :label-width="80">
            <Input class="define-input" v-model="formItem.school" placeholder="文字咨询"></Input> 元 / 50分钟
          </FormItem>
          <FormItem label="电话咨询" :label-width="80">
            <Input class="define-input" v-model="formItem.school" placeholder="电话咨询">
            
            </Input>
            元 / 50分钟
          </FormItem>
        </FormItem>
        <div class="define-handle-box">
          <Button style="margin-right:20px;" size="large" type="default">上一步</Button>
          <Button size="large" type="primary">完美提交</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<script>
import step from '_vc/step'
let agreementVal = ''
export default {
  name: 'enter',
  components: {
    Steps: step
  },
  data () {
    return {
      formItem: {},
    }
  }
}
</script>

<style scoped>

    .enter-title{
        font-size: 18px;
        color:#666;
        text-align: center;
    }
    .ivu-input.define-textarea{
            width: 800px;
    height: 504px;
    }
    .define-handle-box{
        text-align: center;
    }
    .xx-photo-box{
      width:480px;
      height: 200px;
    }
    .xx-photo-box img{
      width:100%;
      height: 100%;
    }
    .define-input{
      display:inline-block;
      width:400px;
    }
</style>
