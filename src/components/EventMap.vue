<template lang="html">
  <div id="map">

  </div>
  <!-- <l-map
  :ref="map"
  :zoom="z"
  :center="center"
  /> -->
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  name: 'event-map',
  components: {
    "l-map": LMap,
    "l-tile": LTileLayer,
    "l-marker": LMarker
  },
  data(){
    return{
      map: null,
      z: 0,
      center: [0.0, 0.0]
    };
  },
  mounted () {
    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });

    // this.$nextTick(() => {
    //   this.map = this.$refs.map.mapObject
    // });

    L.tileLayer(`https://tile.openstreetmap.org/${this.z}/${this.center[0]}/${this.center[1]}.png`).addTo(this.map);
  },
}
</script>

<style lang="css" scoped>
  #map {
    height: 180px;
    width: -webkit-fill-available;
  }
  l-map {
    height: 180px;
  }
</style>
