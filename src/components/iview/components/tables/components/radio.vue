<template>
  <Radio
    :size="size"
    :label="label"
    :disabled="disabled"
    v-model="single"
    on-change="onChange"
  ></Radio>
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
      type: [String, Number],
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
      if (v) {
        this.tableData[this.index][this.keyValue] = v
        this.$emit('on-change', this.index)
      }
    }
  }
}
</script>
