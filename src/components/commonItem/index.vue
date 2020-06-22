<template>
  <div class="common-item">
    <i class="common-item-icon" :class="icon"></i>
    <div class="common-item-title">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: 'commonItem',
  props: {
    icon: {
      type: String,
      default: 'el-icon-star-off'
    },
    title: String
  }
}
</script>
<style lang="less" scoped>
  .common-item {
    width: 80px;
    height: 80px;
    margin: auto;
    padding-top: 10px;
    &-icon {
      display: block;
      font-size: 38px;
    }
    &-title {
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
