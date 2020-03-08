<template>
  <div>
    <Card class="agree-box">
    <Steps :current="3">
        
    </Steps>
    </Card>
    <div class="blank"></div>
    
  </div>
</template>

<script>
import step from '_vc/step'
let agreementVal = ''
export default {
  name: 'enter',
  components: {
    Steps:step,
  },
  data() {
      return {
      }
  },
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
</style>
