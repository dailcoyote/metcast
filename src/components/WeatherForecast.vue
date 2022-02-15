<template>
  <section id="weather__section">
    <WeatherLocation></WeatherLocation>
    <WeatherStats></WeatherStats>
    <WeatherBack></WeatherBack>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import CityRepository from "../repositories/Cities";
import WeatherLocation from "./WeatherLocation.vue";
import WeatherStats from "./WeatherStats.vue";
import WeatherBack from "./WeatherBack.vue";

export default defineComponent({
  name: "WeatherForecast",
  components: {
    WeatherLocation,
    WeatherStats,
    WeatherBack,
  },
  created() {
    CityRepository.createABCIndex();
    console.log(CityRepository.abcIndex);

    console.log('Searching...', new Date())
    let resultSet = CityRepository.getSuggestions('Atlanta');
    console.log('Finish...', new Date(), resultSet);
  },
});
</script>

<style scoped>
#weather__section {
  margin: 21px 0;
  width: 375px;
}
</style>