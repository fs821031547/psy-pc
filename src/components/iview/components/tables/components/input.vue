<template>
  <Input
    :type="type"
    v-model="currValue"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :maxlength='maxlength'
    :placeholder="placeholder"
    :rows="rows"
    :name="name"
    @on-blur="onBlur"
  />
</template>
<script>
export default {
  props: {
    keyValue: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 0
    },
    labelWidth: {
      type: String
    },
    required: {
      type: [Boolean, String, Number],
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    placeholder: {
      type: [String, Number],
      default: '请输入...'
    }
  },
  inject: [
    'tableData'
  ],
  data () {
    return {
      currValue: this.value
    }
  },
  methods: {
    onBlur () {
      this.tableData[this.index][this.keyValue] = this.currValue
    }
  },
  watch: {
    value (val) {
      this.currValue = val
    }
  }
}
</script>
