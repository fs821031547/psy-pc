<template>
  <div class="muti-container">
    <div v-for="(item, index) in list" :key="index" class="muti-item" :style="{height: size === 'small' ? '40px' : size === 'large' ? '60px' : '48px', lineHeight: size === 'small' ? '40px' : size === 'large' ? '60px' : '48px'}">{{ item[subKey] }} </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    },
    subKey: {
      type: [String, Number],
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    }
  }
}
</script>
<style lang="less" scoped>
.muti-container {
  margin: 0 -18px;
}
.muti-item {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  min-width: 0;
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  padding: 0 18px;
  border-bottom: 1px solid #e8eaec;
}
.muti-item:last-child {
  border: none;
}
</style>
