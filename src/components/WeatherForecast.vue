<template>
  <section id="weather__section">
    <WeatherLocation></WeatherLocation>
    <WeatherStats></WeatherStats>
    <WeatherBack></WeatherBack>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import WeatherLocation from "./WeatherLocation.vue";
import WeatherStats from "./WeatherStats.vue";
import WeatherBack from "./WeatherBack.vue";

export default defineComponent({
  name: "WeatherForecast",
  components: {
    WeatherLocation,
    WeatherStats,
    WeatherBack
  },
});
</script>

<style scoped>
#weather__section {
    margin: 21px 0;
    width: 375px;
}
</style>