<template>
  <div class="top-bar">
    <el-button class="add-layer btn" icon="el-icon-circle-plus-outline" circle  @click="addLayer" title="添加图层" :disabled="isDisable"></el-button>
    <!-- <i class="add-layer el-icon-circle-plus-outline" @click="addLayer" title="添加图层" :disabled="isDisable"></i> -->
    <el-button class="map-setting btn" icon="el-icon-setting" @click="mapStyle" circle title="地图设置"></el-button>
    <!-- <i class="map-setting el-icon-setting" @click="mapStyle" title="地图设置"></i> -->
  </div>
</template>
<script>
export default {
  name: 'TopBar',
  props: {
    isDisable: Boolean
  },
  data () {
    return {
      addLayerDisable: false
    }
  },
  methods: {
    addLayer () {
      this.$emit('addLayer')
    },
    mapStyle () {
      this.$emit('changeMapStyle')
    }
  }
}
</script>
<style lang="less" scoped>
  .top-bar {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 38px;
    background: transparent;
    .btn {
      position: absolute;
      top: 10px;
      cursor: pointer;
    }
    .add-layer {
      right: 10px;
      color: #409EFF;
    }
    .is-disabled {
      color: #ddd;
    }
    .map-setting {
      left: 10px;
    }
  }
</style>
