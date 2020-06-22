<template>
  <div class="draw-layer">
    <div class="draw-type-item" v-for="(item,index) in drawTypeConfig" :key="index" @click="selectType(item.key)">
      <common-item  :title="item.name" :icon="item.icon"></common-item>
    </div>
  </div>
</template>
<script>
import commonItem from '@/components/commonItem'
export default {
  name: 'drawLayer',
  components: {
    commonItem
  },
  props: {
    type: String
  },
  data () {
    return {
      drawTypeConfig: [
        {
          name: '折线',
          key: 'line',
          icon: 'el-icon-minus'
        },
        {
          name: '圆',
          key: 'circle',
          icon: 'el-icon-help'
        },
        {
          name: '多边形',
          key: 'polygon',
          icon: 'el-icon-folder'
        }
      ]
    }
  },
  methods: {
    selectType (type) {
      this.$emit('selectDrawType', type)
    }
  }
}
</script>
<style lang="less" scoped>
.draw-layer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-start;
  .draw-type-item {
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border: 2px solid #909399;
    border-radius: 8px;
    transition: 0.3s linear;
    margin: auto;
    &:hover {
      width: 120px;
      height: 120px;
      border-color: #409EFF;
      color: #409EFF;
    }
    .common-item {
      position: absolute;
      left: 50%;
      top:50%;
      margin-left: -40px;
      margin-top: -40px;
    }
  }
}
</style>
