<template lang="html">
  <div id="map" class="map">

  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'event-map',
  components: {

  },
  data(){
    return{
      map: null,
      zoom: 2,
      center: [0.0, -0.0],
      tileLayer: null,
      layers: [],
    };
  },
  mounted () {
    this.initMap();
    this.initLayers();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([this.center[0], this.center[1]], this.zoom);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );
      this.tileLayer.addTo(this.map);
      eventBus.$emit('update-map', this.map);
    },
    initLayers() {

    },
  }
}
</script>
