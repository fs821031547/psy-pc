<template>
  <InputNumber
    :max="max"
    :min="min"
    :step="step"
    v-model="currValue">
  </InputNumber>
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
    value: {
      type: [Number, String],
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currValue: 0
    }
  },
  watch: {
    value: {
      handler (v) {
        this.currValue = v
      },
      immediate: true
    },
    currValue (val) {
      this.tableData[this.index][this.keyValue] = val
    }
  }
}
</script>
