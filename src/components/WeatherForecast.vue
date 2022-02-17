<template>
  <section id="weather__section" v-if="!loading">
    <WeatherLocation :location="currentLocation"></WeatherLocation>
    <WeatherStats :stats="currentWeatherStats"></WeatherStats>
    <WeatherBack
      :hourlyWeatherStats="hourlyWeatherStats"
      :dailyWeatherStats="dailyWeatherStats"
    ></WeatherBack>
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
      let date = new Date(),
        options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
      if (this.data && this.data?.current) {
        date = new Date(this.data.current.dt * 1000);
      }
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    currentWeatherStats() {
      let currentStats = {
        dateTime: new Date().toGMTString(),
        tempValue: 0.0,
        tempUnit: this.temperatureUnit.grade,
        weatherIcon: undefined,
        weatherDescription: "",
        windSpeed: 0.0,
        pressure: 0.0,
        humidity: 0.0,
      };

      if (this.data && this.data?.current) {
        const { weather, temp, wind_speed, pressure, humidity } =
          this.data.current;
        const currentWeatherInfo = weather[0];
        const g = WeatherEnums.WeatherConditions[currentWeatherInfo?.main];
        const asset = g && g.findWeatherAsset(currentWeatherInfo?.id);

        currentStats.dateTime = this.currentDateTime;
        currentStats.tempValue = temp;
        currentStats.weatherDescription = currentWeatherInfo?.description || "";
        currentStats.weatherIcon = asset;
        currentStats.windSpeed = wind_speed;
        currentStats.pressure = pressure;
        currentStats.humidity = humidity;
      }

      return currentStats;
    },
    hourlyWeatherStats() {
      return this?.data?.hourly || [];
    },
    dailyWeatherStats() {
      return this?.data?.daily || [];
    },
    temperatureUnit() {
      return (
        WeatherEnums.TemperatureUnits[
          import.meta.env.VITE_DEFAULT_TEMPERATURE_UNIT
        ] || WeatherEnums.TemperatureUnits.Celsius
      );
    },
  },
  methods: {
    async updateForecastWeather(coord) {
      try {
        this.data = await WeatherService.fetchForecastWeatherData(
          coord.lat,
          coord.lon,
          this.temperatureUnit.unit
        );
        console.log("Forecast updated");
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