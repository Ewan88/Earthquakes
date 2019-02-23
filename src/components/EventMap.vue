<template lang="html">
  <l-map ref="map" :zoom=13 :center="[47.413220, -1.219482]">
    {{this.$refs.map}}
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

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
      layersToAdd: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
}
</script>

<style lang="css" scoped>
</style>
