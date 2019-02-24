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

      <event-map :map="map"/>
      
  </div>
</template>

<script>
import EventList from './components/EventList.vue';
import EventDetail from './components/EventDetail.vue';
import EventMap from './components/EventMap.vue';
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
      map: null
    };
  },
  components: {
    "event-list": EventList,
    "event-detail": EventDetail,
    "event-map": EventMap
  },
  mounted(){
    this.getEvents();
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
  }
}
</script>
