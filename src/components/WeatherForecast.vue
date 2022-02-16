<template>
  <section id="weather__section" v-if="!loading">
    <WeatherLocation :location="currentLocation"></WeatherLocation>
    <WeatherStats></WeatherStats>
    <WeatherBack></WeatherBack>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import WeatherService from "../weather_api/WeatherService";
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
  data() {
    return {
      loading: false,
      data: undefined,
      currentLocation: undefined,
    };
  },
  methods: {
    async updateForecastWeather(coord) {
      try {
        this.data = await WeatherService.fetchForecastWeatherData(
          coord.lat,
          coord.lon
        );
      } catch (error) {
        alert(error.message);
      } finally {
        if (this.loading) this.loading = !this.loading;
      }
    },
  },
  async created() {
    console.log("Building ABC index...", new Date());
    this.loading = !this.loading;
    CityRepository.createABCIndex();

    if (!this.currentLocation) {
      this.currentLocation = import.meta.env.VITE_DEFAULT_LOCATION;
    }
    let { coord } =
      CityRepository.fetchLocationDetail(this.currentLocation) || {};

    if (coord) {
      this.updateForecastWeather(coord);
    }
  },
});
</script>

<style scoped>
#weather__section {
  margin: 21px 0;
  width: 375px;
}
</style>