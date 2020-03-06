<template>
  <Checkbox
    v-model="single"
    :label="label"
    :disabled="disabled"
    :size="size"
  ></Checkbox>
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
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      single: false
    }
  },
  watch: {
    value: {
      handler (v) {
        this.single = v
      },
      immediate: true
    },
    single (v) {
      this.tableData[this.index][this.keyValue] = v
    }
  }
}
</script>
