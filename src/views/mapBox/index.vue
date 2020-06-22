<template>
  <div class="map-box-wrap">
    <top-bar @addLayer="showAddLayerDialog" :isDisable="drawType !== ''"></top-bar>
    <div class="map-container" id="map-container">
    </div>
    <div class="draw-tips" v-if="drawType">
      <div class="draw-tips-title">当前绘制方式：</div>
      <i class="draw-tips-icon el-icon-star-on"></i>
      <div class="draw-tips-type">{{drawType ==='line' ? '折线':drawType ==='circle'? '圆形':'多边形'}}</div>
      <el-button class="draw-done" @click="drawDone" :disabled="!layerIsEditing">完成绘制</el-button>
      <el-button class="draw-cancel" @click="drawCancel">取消绘制</el-button>

    </div>
    <add-layer-dialog  ref="addLayerDialog" :addLayerVisible="addLayerVisible" @selectDrawType="selectDrawType"></add-layer-dialog>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import addLayerDialog from '@/components/addLayerDialog'
const LAYER_OPTIONS = {
  strokeColor: '#F33',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: 'ee2200',
  fillOpacity: 0.35
}

export default {
  name: 'MapToolBox',
  components: {
    topBar,
    addLayerDialog
  },
  data () {
    return {
      addLayerVisible: false,
      drawType: '',
      allLayer: [],
      layerIsEditing: false
    }
  },
  async mounted () {
    this.AMap = window.AMap
    this.mapInit()
    await this.loadMapPlugin()
  },
  methods: {
    mapInit () {
      this.map = new this.AMap.Map('map-container', {
        center: [116.397428, 39.90923],
        zoom: 13
      })
    },
    loadMapPlugin () {
      return new Promise((resolve, reject) => {
        this.AMap.plugin(
          [
            'AMap.Heatmap',
            'AMap.DistrictSearch',
            'AMap.MouseTool',
            'AMap.Autocomplete',
            'AMap.PlaceSearch',
            'AMap.CitySearch',
            'AMap.DistrictSearch',
            'AMap.CircleEditor',
            'AMap.RectangleEditor',
            'AMap.PolyEditor'
          ], () => {
            this.setMapPlugin()
            resolve()
          }
        )
      })
    },
    setMapPlugin () {
      // this.districtSearch = new this.AMap.DistrictSearch()
      this.mouseTool = new this.AMap.MouseTool(this.map)
      this.mouseTool.on('draw', (e) => {
        console.log(this.drawType, e.obj)
        this.addLayerEditor(e.obj)
        this.mouseTool.close(true)
      })
    },
    showAddLayerDialog () {
      this.$refs.addLayerDialog.addLayerVisible = true
    },
    addLayerEditor (e) {
      switch (this.drawType) {
        case 'line': {
          this.drawingLayer = new this.AMap.Polyline({
            map: this.map,
            path: e.getPath(),
            ...LAYER_OPTIONS
          })
          this.layerEditor = new this.AMap.PolyEditor(this.map, this.drawingLayer)
          this.layerEditor.open()
          this.layerIsEditing = true
          this.layerEditor.on('end', (e) => {
            this.afterDrawDone(e)
          })
          break
        }
        case 'circle': {
          this.drawingLayer = new this.AMap.Circle({
            map: this.map,
            center: e.getCenter(),
            radius: e.getRadius(),
            ...LAYER_OPTIONS
          })
          this.layerEditor = new this.AMap.CircleEditor(this.map, this.drawingLayer)
          this.layerEditor.open()
          this.layerIsEditing = true
          this.layerEditor.on('end', (e) => {
            this.afterDrawDone(e)
          })
          break
        }
        case 'polygon': {
          this.drawingLayer = new this.AMap.Polygon({
            map: this.map,
            path: e.getPath(),
            ...LAYER_OPTIONS
          })

          this.layerEditor = new this.AMap.PolyEditor(this.map, this.drawingLayer)
          this.layerEditor.open()
          this.layerIsEditing = true
          this.layerEditor.on('end', (e) => {
            this.afterDrawDone(e)
          })
          break
        }
        default:
          break
      }
    },
    selectDrawType (type) {
      this.drawType = type
      this.$refs.addLayerDialog.addLayerVisible = false
      this.drawLayer(type)
    },
    drawLayer (type) {
      switch (type) {
        case 'line':
          this.mouseTool.polyline({
            strokeColor: '#80d8ff'
          })
          break
        case 'polygon':
          this.mouseTool.polygon({
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff'
          })
          break
        case 'circle': {
          this.mouseTool.circle({
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff'
          })
          break
        }
        default:
          break
      }
    },
    drawDone () {
      this.layerEditor && this.layerEditor.close()
    },
    afterDrawDone (e) {
      this.layerIsEditing = false
      switch (this.drawType) {
        case 'line':

          break

        default:
          break
      }
      this.drawType = ''
    },
    drawCancel () {
      this.layerIsEditing = false
      this.drawType = ''
      this.mouseTool && this.mouseTool.close(true)
      this.layerEditor && this.layerEditor.close()
      this.drawingLayer && this.drawingLayer.hide()
    }

  }
}
</script>
<style lang="less" scoped>
.map-box-wrap {
  position: relative;
  .top-bar {
    position: absolute;
    top: 0;
    z-index: 1000;
  }
  .map-container {
    height: 100vh;
    width: 100%;
    z-index: 0;
  }
  .draw-tips {
    position: absolute;
    right: 10px;
    top:80px
  }
}

</style>
