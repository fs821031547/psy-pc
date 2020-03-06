<template>
  <Table
    class="iv-ivu-table"
    :size="size"
    :show-header="showHeader"
    :columns="columns"
    :border="border"
    :data="data"
  ></Table>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'iv-table',
  mixins: [mixin],
  provide: function () {
    return {
      tableData: this.data
    }
  },
  props: {
    value: {
      type: [Object, Array]
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    border: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      data: []
    }
  },
  watch: {
    value: {
      handler (v) {
        if (!v) return false
        this.columns = this.columns
        this.data = v.data ? v.data : v
        this.handleColumns(this.columns, this.data)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
