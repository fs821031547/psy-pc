<template>
  <Poptip
    :title="title"
    :confirm="confirm"
    :placement="placement"
    @on-ok="ok"
    @on-cancel="cancel">
      <Icon style="position: relative; top: 8px; left: 1px;" class='ivu-icon-del' type="md-trash" size="18"/>
  </Poptip>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '您确认删除这条内容吗？'
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    confirm: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ok () {
      this.$emit('on-ok')
    },
    cancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang='less'>
.ivu-table-cell .ivu-poptip-confirm .ivu-poptip-body .ivu-icon{
  left:15px;
}
.ivu-icon-del{
  cursor: pointer;
  transition: .3s;
  &:hover{
    color: #208bf6;
  }
}
</style>
