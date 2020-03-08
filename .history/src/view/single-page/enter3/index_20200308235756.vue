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
      <Form :model="formItem" :label-width="80">
        <FormItem label="专长领域：">
              <CheckboxGroup v-model="formItem.checkbox">
                  <Checkbox :label="item" v-for="item,$index in fieldArr1" @click.native="showField($index)"></Checkbox>
              </CheckboxGroup>
            <div class="formItem-memo">选1-3项最擅长的领域</div>
        </FormItem>
        <FormItem label="个人成长" class="form-item-child">
          <div class="formItem-memo">每个专长最多选5个类型</div>
          <CheckboxGroup v-if="currentField==$index" v-model="formItem.checkbox" v-for="items,$index in fieldArrVals">
              <Checkbox :label="item" v-for="item in items"></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import step from '_vc/step'
let fieldArrValStr0 = '心理韧性、自我修复、童年创伤、时间管理、女性成长、跨文化适应、跨地区适应、压力管理、人生规划、自我管理、自我成长、社会适应、应对方式、理想主义、胆小、独处、安全感、爱无能、依恋问题、完美主义、注意力、拖延、身份认同、性格完善'
let fieldArrValStr1 = '绝望、寂寞、羞涩、痛苦、敌意、怨恨、后悔、嫉妒、淡漠、厌恶、心理疲劳、情绪调节、情绪失控、情绪疏导、情绪低落、情绪管理、空虚感、无助感、羞耻感、内疚、压抑、暴躁、紧张、怯场、孤独、恐惧、自信心、自卑、悲观、脆弱、敏感、愤怒、焦虑、抑郁'
let fieldArrValStr2 = '梦、神经质、多重人格、精神分裂、病态人格、控制狂、幻觉、慢性压力、痉挛、疲劳、死忙、丧失与哀伤辅导、成瘾、神经功能失调、自杀倾向、适应障碍、心理创伤、突发危机干预、意外事件创伤、分离创伤、情感创伤修复、成长创伤、癔症、创伤后应急障碍、神经衰弱、躁狂症、疑病症、焦虑症、抑郁症、强迫症、恐惧症、心境障碍、精神障碍、人格障碍、长期障碍、抽动、进食障碍、失眠'
let fieldArrValStr3 = '亲密关系、安全感、父母养老、父母同住、家庭暴力、家庭创伤、家庭冲突、单亲家庭、原生家庭、组合家庭、家庭矛盾、产前心理、产后抑郁、大龄未婚困扰、复婚、挽回、丧偶、夫妻相处技巧、第三者、婚姻质量、婚姻破裂、婚姻危机、婚姻挽救、相处模式、夫妻沟通、信任问题、平淡期、吵架、出轨、再婚、逼婚、婚外情、离婚、新婚、恐婚、不婚、婚姻冷战、婚前恐惧、婚前焦虑'
let fieldArrValStr4 = '暧昧、性格匹配、情感、性格不合、冷暴力、两性差异、灵魂伴侣、陪伴、相亲、沟通技巧、单身、择偶、复合、分手、感情纠纷、恋爱技巧、脱单攻略、同性恋、师生恋、异地恋、网恋、三角恋、失恋'
let fieldArrValStr5 = '舍友关系、陌生人、朋友沟通、同学交往、人际间关系协调、人际关系冲突、人际沟通不畅、社交恐惧、交往模式、社交技巧'
let fieldArrValStr6 = '职场压力、跳槽、同级关系、工作迷茫、职场焦虑、职业倦怠、职场性骚扰、办公室恋情、潜规则、职场沟通、上下级关系、职场人际关系、工作与家庭生活平衡、新人适应、辞职、职业转型、职业规划、职业发展'
let fieldArrValStr7 = '二孩、儿童发展、父母成长、行为纠正、习惯培养、育儿困惑、代际沟通、亲子冲突、青春期困惑、青春期独立、选择专业、考前焦虑、中考高考压力释放、休学退学、逃学、辍学、注意力不集中、厌学、学习压力大、学习困难、攻击性行为干预、青少年抑郁、离家出走、睡眠习惯差、适应新环境、分离焦虑、自理能力差、打架斗殴、孤僻、自闭、懒惰、网瘾、贪玩、多动、撒谎、叛逆'
let fieldArrValStr8 = '暴露狂、露阴癖、性暴力、心理性别、性侵害、性骚扰、性压抑、性幻想、处女情结、性冷淡、性恐惧、性成瘾、性障碍、易性癖、双性恋、同性恋、性偏好、性取向、性身份、SM'

export default {
  name: 'enter',
  components: {
    Steps: step
  },
  data () {
    return {
      formItem: {},
      fieldArr1: ['个人成长', '情绪管理', '心理健康', '婚姻家庭', '恋爱心理', '人际关系', '职场心理', '亲子教育', '性心理'],
      fieldArr2: [],
      fieldArrVal: [fieldArrValStr0, fieldArrValStr1, fieldArrValStr2, fieldArrValStr3, fieldArrValStr4, fieldArrValStr5, fieldArrValStr6, fieldArrValStr7, fieldArrValStr8],
      currentField: 0
    }
  },
  computed: {
    fieldArrVals () {
      let filedArr = this.fieldArrVal
      let fieldArrVal = filedArr.map(x => { return x.split('、') })
      return fieldArrVal
    }
  },
  methods: {
    showField (index) {
      console.log(index)
      this.currentField = index
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
    .formItem-memo{
      color:#999;
    }
    .form-item-child{
      background: #f2f2f2;
      margin-left:80px;
    }
</style>
