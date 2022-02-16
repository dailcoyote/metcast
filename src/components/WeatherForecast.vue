<template>
  <section id="weather__section" v-if="!loading">
    <WeatherLocation :location="currentLocation"></WeatherLocation>
    <WeatherStats :stats="currentWeatherStats"></WeatherStats>
    <WeatherBack></WeatherBack>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import WeatherService from "../weather_api/WeatherService";
import CityRepository from "../repositories/Cities";
import WeatherEnums from "../enums/Weather";
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
  computed: {
    currentDateTime() {
      if (this.data && this.data?.current) {
        let d = new Date(this.data.current.dt * 1000);
        return d.toGMTString();
      }
      return new Date().toGMTString();
    },
    currentWeatherStats() {
      let currentStats = {
        dateTime: new Date().toGMTString(),
        tempValue: 0,
        tempUnit: this.temperatureUnit,
        weatherIcon: undefined,
        weatherDescription: "",
        windSpeed: 0,
        pressure: 0,
        humidity: 0,
      };

      if (this.data && this.data?.current) {
        const currentWeatherInfo = this.data.current.weather[0];
        const g = WeatherEnums.WeatherConditions[currentWeatherInfo?.main];
        const asset = g.findWeatherAsset(currentWeatherInfo?.id);
        
        currentStats.dateTime = this.currentDateTime;
        currentStats.tempValue = this.data.current.temp;
        currentStats.weatherDescription = currentWeatherInfo?.description || "";
        currentStats.weatherIcon = asset;
        currentStats.windSpeed = this.data.current.wind_speed;
        currentStats.pressure = this.data.current.pressure;
        currentStats.humidity = this.data.current.humidity;
      }

      return currentStats;
    },
    temperatureUnit() {
      return WeatherEnums.TemperatureUnits.Celsius.grade;
    },
  },
  methods: {
    async updateForecastWeather(coord) {
      try {
        this.data = await WeatherService.fetchForecastWeatherData(
          coord.lat,
          coord.lon
        );
        console.log('Forecast updated')
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

    console.log(coord, this.currentLocation)  

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