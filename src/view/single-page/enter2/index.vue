<template>
  <div>
    <Card class="agree-box">
      <Steps :current="1"></Steps>
    </Card>
    <div class="blank"></div>
    <Card class="agree-box">
      <Form :model="formItem" :label-width="120">
        <FormItem label="头像">
          <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择图片</Button>
          </Upload>
          <div v-if="file !== null">
            Upload file: {{ file.name }}
            <Button
              type="text"
              @click="upload"
              :loading="loadingStatus"
            >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
          </div>
          <Avatar icon="ios-person" size="large" />
        </FormItem>
        <FormItem label="真实姓名" prop="name">
          <Input v-model="formItem.name" placeholder="真实姓名"></Input>
        </FormItem>
        <FormItem label="手机">
          <Input v-model="formItem.mobile" placeholder="手机号码"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formItem.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="证件类型">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">身份证</Radio>
            <Radio label="female">护照</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="所在城市">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="个人头衔">
          <Input
            v-model="formItem.email"
            placeholder="限20个字符，示例：xx协会注册会员/硕士/博士/精神科医生/执业医师/三甲医院心理咨询师"
          ></Input>
        </FormItem>
        <FormItem label="一句话签名">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 15}"
            placeholder="限50个字符，方向1：可以写咨询师对咨询的理解(价值观)。示例：有阴影的地方就有阳光。咨询师，就是要让来访者看到更整体、全面的东西。方向2：咨询师想要对来访者说的话。示例：星洲易渡，心河难逾，与你共觅心河之舟。方向3：咨询师最想要来访者了解的讯息。示例：十年正念结合心理学实践经验，致力于推动正念禅修结合心理学。"
          ></Input>
        </FormItem>
        <FormItem label="个人简介">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 15}"
            placeholder="请参照下方的个人简历文本框填写指引。"
          ></Input>
        </FormItem>
        <FormItem label="个人简介填写指引">
          <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-textarea">
            <textarea readonly class="ivu-input define-textarea">
        如果你在以下项目中，有一项或多项有优势，请按照小标题【XXXX】+文字描述的方式填写到「个人简介」文本框中。格式如下。建议精简语言。

 

【教育背景】

示例：美国 XX州注册心理咨询师，美国 XX University全职咨询师

 

【实习经验】

示例：在美国修读硕士的过程中，进入到西雅图当地高中，担任实习school counselor半年。

 

【工作经验】

示例： 毕业以后进入北京国奥心理医院，担任全职心理咨询师，周咨询量稳定在20个。至今积累超过3000小时的个案时长。

 

【擅长领域经验介绍】

示例1：在高校担任专职心理咨询师超过5年，接触过大量与自信心建立和个人成长相关议题的青年个案。尤其对青年女性在成长和独立方面的议题，有独到的见解。曾受邀担任学校女性成长社团特邀讲师/咨询师，陪伴千位现代青年女性发现自己的独特气质，自信面对人生。

 

示例2：我从2007年进入心理咨询行业，先后在三甲医院心理科，心理咨询机构担任高级咨询师。对抑郁症，焦虑症，强迫症等问题有过大量的临床研究和实践。在XX等科学期刊上发表《叙事治疗在抑郁症的优势》《xxx》等文章。

 

示例3：2008年从北京师范大学心理学专业硕士毕业，开始在机构担任心理咨询师。随后受聘成为多家世界500强企业做员工心理辅导。长期为白领提供心理咨询服务，对职场人际关系、职业规划以及跳槽辞职等议题有丰富经验。

 

【个人心路历程】

示例：心理咨询在我看来是艺术和科学的完美结合，我从20XX年开始学习的心理学……

 

【咨询服务流程】

示例：一般来说我的咨询流程是……
        </textarea>
          </div>
          
        </FormItem>
        <div class="define-handle-box">
            <Button type="primary">下一步</Button>
          </div>
      </Form>
    </Card>
  </div>
</template>

<script>
import step from "_vc/step";
let agreementVal = "";
export default {
  name: "enter",
  components: {
    Steps: step
  },
  data() {
    return {
      formItem: {
        name: "",
        mobile: "",
        email: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
      },
      file: null,
      loadingStatus: false,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    testPhone: function(str) {
      //re= /^(13[0-9]{9})|(15[89][0-9]{8})$/;
      re = /^(1[356789][0-9]{9})$/;
      return re.test(str);
    },
    testEmail: function(str) {
      var re = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      return re.test(str);
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    }
  }
};
</script>

<style scoped>

.enter-title {
  font-size: 18px;
  color: #666;
  text-align: center;
}
.ivu-input.define-textarea {
  width: 800px;
  height: 504px;
}
.define-handle-box {
  margin-left:120px;
}
</style>
