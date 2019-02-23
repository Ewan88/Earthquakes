<template lang="html">
  <div>
    <p>{{event.properties.place}}</p>
    <p>{{event.properties.mag}}</p>
    <p>{{event.geometry.coordinates[3]}}</p>
  </div>
</template>

<script>
export default {
  name: "event-detail",
  props: ["event"]
}
</script>

<style lang="css" scoped>
</style>
