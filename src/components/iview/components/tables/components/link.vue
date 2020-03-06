<template>
  <div class="iv-table-cell-link" v-if="value">
    <a :href="value && value.href" v-if="value.href" :target="target" class="iv-table-cell-link">{{value.value}}</a>
    <router-link v-else class="iv-table-cell-link" :to="value.path">{{value.value}}</router-link>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Object],
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  data () {
    return {}
  }
}
</script>
