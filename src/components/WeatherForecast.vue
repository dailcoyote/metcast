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
    console.log("Building ABC index...", new Date());
    CityRepository.createABCIndex();
    console.log(CityRepository.abcIndex);
    console.log(import.meta.env.VITE_DEFAULT_LOCATION);

    console.log("Searching...", new Date());
    let { name, coord } =
      CityRepository.fetchLocationDetail(
        import.meta.env.VITE_DEFAULT_LOCATION
      ) || {};
    console.log("Finish...", new Date(), name, coord);
  },
});
</script>

<style scoped>
#weather__section {
  margin: 21px 0;
  width: 375px;
}
</style>