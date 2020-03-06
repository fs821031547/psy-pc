<template>
  <Select
    v-model="model"
    :placeholder="placeholder"
    :filterable="filterable"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
  >
    <Option v-if="data.length" v-for="item in data" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
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
    index: {
      type: Number,
      default: 0
    },
    value: {
      type: [String, Array, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: ''
    }
  },
  watch: {
    value: {
      handler (v) {
        this.model = v
      },
      immediate: true
    },
    model (v) {
      this.tableData[this.index][this.keyValue] = v
    }
  }
}
</script>
