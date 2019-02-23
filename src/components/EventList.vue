<template lang="html">
       <select v-if="events" v-model="selectedEvent" v-on:change="handleSelect">
         <option disabled value=''>select an event</option>
         <option v-for="(event, index) in events.features" :key="index" :value="event">
           {{event.properties.title}}
         </option>
       </select>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  data(){
    return {
      selectedEvent: null
    }
  },
  name: "event-list",
  props: ["events"],
  methods: {
    handleSelect(){
      eventBus.$emit('selected-event', this.selectedEvent);
    }
  }
}
</script>

<style lang="css" scoped>
select {
    margin: 10px;
}
</style>
