<template>
  <div>
    <Card class="agree-box">
    <Steps :current="2">

    </Steps>
    </Card>
    <div class="blank"></div>
    <Card class="agree-box">

      <div class="t1-desc">
        必填内容：擅长领域和疗法、教育背景、从业资质、个案累计时长、培训经历、接受督导经历
        <br>
        <br>
        十分建议您通过上传相关证明图片来展示您的经历。若您在「个案时长」、「培训经历」这两项未能提供证明图片，可选择填写证明人姓名及联系方式，工作人员保留后续要求您补充提供相关资料的权力，包括但不限于证明人相关文件、资质、证明等，以确保证明人的有效性。
      </div>
      <Divider class="define-divider" orientation="left">擅长领域和疗法</Divider>
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
    .t1-desc{
      padding-left: 30px;
    }
    .ivu-divider.define-divider{
      font-size: 18px;
    }
</style>
