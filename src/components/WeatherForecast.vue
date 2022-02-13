<template>
  <section id="weather__section">
    <WeatherLocation></WeatherLocation>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import WeatherLocation from "./WeatherLocation.vue";

export default defineComponent({
  name: "WeatherForecast",
  components: {
    WeatherLocation,
  },
});
</script>

<style scoped>
    #weather__section {
    margin: 21px 0;
    }
</style>