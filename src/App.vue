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
    <div>
      <event-map :map="map"/>
    </div>
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

      eventBus.$on("selected-event", (event) => {
        this.selectedEvent = event;
      });
    },
    getMap(){
      eventBus.$on("update-map", (map) => {
        this.map = map;
      });
    }
  }
}
</script>

<style>
#app {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}
#form {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
  border: 2px solid grey;
  border-radius: 15px;
  padding: 5px 10px;
  background-color: silver;
}
input {
  margin-right: 10px;
}
label {
  margin-right: 5px;
  font-weight: bold;
}
input[type="date"] {
  width: 125px;
}
input.mag {
  width: 30px;
  margin-right: 0;
}
</style>
