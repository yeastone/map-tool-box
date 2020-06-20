<template>
  <div class="map-container" id="map-container">
    地图来啦
  </div>
</template>

<script>

export default {
  name: 'MapToolBox',
  components: {
  },
  mounted () {
    this.AMap = window.AMap
    this.mapInit()
  },
  methods: {
    mapInit () {
      this.map = new this.AMap.Map('map-container', {
        center: [116.397428, 39.90923],
        zoom: 13
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .map-container {
    height: 100vh;
    width: 100%;
  }
</style>
