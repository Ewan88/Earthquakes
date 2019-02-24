<template>
  <div id="app">

    <div id="form">
      <label for="from">from:</label>
      <input class="from" type="date" v-model="from" v-on:input="getEvents"/>
      <label for="to">to:</label>
      <input class="to" type="date" v-model="to" v-on:input="getEvents"/>
      <label for="mag">mag:</label>
      <input class="mag" type="number" v-model="mag" v-on:input="getEvents"/>
    </div>

    <div id="drop-down">
      <event-list :events="events"/>
    </div>

    <div id="detail" v-if="selectedEvent">
      <event-detail :event="selectedEvent"/>
    </div>

    <div id="map" class="map">

    </div>

  </div>
</template>

<script>
import EventList from './components/EventList.vue';
import EventDetail from './components/EventDetail.vue';
import { eventBus } from './main.js';

export default {
  name: 'App',
  data(){
    return {
      from: '2019-02-12',
      to: '2019-02-22',
      mag: '5',
      events: {},
      selectedEvent: null,
      map: null,
      zoom: 6,
      center: [58.0, -4.0],
      tileLayer: null,
      layers: [],
    };
  },
  components: {
    "event-list": EventList,
    "event-detail": EventDetail,
  },
  mounted(){
    this.getEvents();
    this.initMap();
    this.initLayers();
  },
  methods: {
    getEvents(){
      fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.from}&endtime=${this.to}&minmagnitude=${this.mag}`)
      .then(res => res.json())
      .then(events => this.events = events)

      eventBus.$on('selected-event', (event) => {
        this.selectedEvent = event;
      });
    },
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
    },
    initLayers() {

    },
  }
}
</script>
