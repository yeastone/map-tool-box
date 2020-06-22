<template>
  <el-dialog class="add-layer-dialog" title="添加图层" :visible.sync="addLayerVisible" v-if="addLayerVisible" @close="dialogClosed">
    <div class="add-layer-tips">{{tips}}</div>
    <div class="select-layer-type step-0" v-if="step === 0">
      <div class="layer-type-item" v-for="(item,index) in layerTypeConfig" :key="index" @click="selectLayerType(item.type)" >
        <common-item  :title="item.name" :icon="item.icon"></common-item>
      </div>
    </div>
    <div class="step-1" v-if="step === 1">
      <div :is="type" @selectDrawType="selectDrawType"> </div>
       <!-- <draw-layer></draw-layer> -->
    </div>
    <div class="footer"></div>

  </el-dialog>
</template>
<script>
import commonItem from '@/components/commonItem'
import drawLayer from './drawLayer'
export default {
  name: 'AddLayerDialog',
  components: {
    drawLayer,
    commonItem
  },
  props: {
    // addLayerVisible: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data () {
    return {
      addLayerVisible: false,
      step: 0,
      type: '',
      tips: '选择添加图层类型',
      layerTypeConfig: [
        {
          name: '绘制覆盖物',
          type: 'drawLayer',
          icon: 'iconfont icon-zhongguo'
        },
        {
          name: '热力图',
          type: 'heatmap',
          icon: 'iconfont icon-fsux_tubiao_relitu'
        },
        {
          name: 'Geohash',
          type: 'geohash',
          icon: 'iconfont icon-wangge'
        },
        {
          name: '飞线图',
          type: 'flyLine',
          icon: 'iconfont icon-feixianditux'
        }
      ]
    }
  },
  methods: {
    selectLayerType (type) {
      console.log(type)

      this.type = type
      this.step = 1
    },
    selectDrawType (type) {
      this.step = 0
      this.type = ''
      this.$emit('selectDrawType', type)
    },
    dialogClosed () {
      console.log(123)
      this.step = 0
      this.type = ''
    }
  }
}
</script>
<style lang="less" scoped>
  .add-layer-dialog {
    .add-layer-tips {

    }
    .select-layer-type {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      justify-content: space-between;
      .layer-type-item {
        position: relative;
        cursor: pointer;
        width: 100px;
        height: 100px;
        border: 2px solid #909399;
        border-radius: 8px;
        transition: 0.3s linear;
        &:hover {
          border-color: #409EFF;
          color: #409EFF;
          width: 120px;
          height: 120px;
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
  }

</style>
