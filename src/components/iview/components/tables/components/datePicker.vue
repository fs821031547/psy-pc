<template>
  <div class="iv-ivu-form-item" :class='required && errShow && "error"'>
    <DatePicker
      :type="type"
      v-model="model"
      @on-change="onChange"
      :start-date="startDate"
      :size="size"
      :transfer='true'
      :disabled="disabled"
      :clearable="clearable"
      :readonly="readonly"
      format="yyyy-MM-dd"
      :placeholder="placeholder" />
    <div class='tooltip' v-if='errShow && required'>
      {{requiredVal}}
    </div>
  </div>

</template>
<script>
export default {
  inject: [
    'tableData'
  ],
  props: {
    keyValue: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    },
    requiredVal: {
      type: [String, Number],
      default: '不能为空'
    },
    required: {
      type: [Boolean],
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    startDate: {
      type: Date,
      default () {
        return new Date()
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      model: '',
      errShow: this.value === ''
    }
  },
  methods: {
    onChange (v) {
      this.tableData[this.index][this.keyValue] = v
    }
  },
  watch: {
    value: {
      handler (v) {
        this.model = v
      },
      immediate: true
    }
  }
}
</script>
<style lang='less'>
@import '../../../less/main.less';
</style>
