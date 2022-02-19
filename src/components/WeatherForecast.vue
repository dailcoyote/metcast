<template>
  <section id="weather__section" v-if="!loading">
    <WeatherLocation
      :defaultSettings="defaultSettings"
      :applySuggestionsFunc="applySuggestions"
    ></WeatherLocation>
    <WeatherStats :stats="currentWeatherStats"></WeatherStats>
    <WeatherBack
      :hourlyWeatherStats="hourlyWeatherStats"
      :dailyWeatherStats="dailyWeatherStats"
    ></WeatherBack>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import OpenWeatherMap from "../api/OpenWeatherMap";
import CityFinder from "../api/CityFinder";
import WeatherComposition from "../types/WeatherComposition";
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
      defaultSettings: {
        location: undefined,
        temp: undefined,
        wind: undefined,
        pressure: undefined,
      },
      currentWeatherData: undefined,
      applySuggestions: CityFinder.getSuggestions.bind(CityFinder),
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
      if (this.currentWeatherData && this.currentWeatherData?.current) {
        date = new Date(this.currentWeatherData.current.dt * 1000);
      }
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    currentWeatherStats() {
      let currentStats = {
        dateTime: new Date().toGMTString(),
        tempValue: 0.0,
        weatherIcon: undefined,
        weatherDescription: "",
        windSpeed: 0.0,
        pressure: 0.0,
        humidity: 0.0,
        tempUnit: this.defaultSettings.temp,
        windSpeedUnit: this.defaultSettings.windSpeed,
        pressureUnit: this.defaultSettings.pressure,
      };

      if (this.currentWeatherData && this.currentWeatherData?.current) {
        const { weather, temp, wind_speed, pressure, humidity } =
          this.currentWeatherData.current;
        const currentWeatherInfo = weather[0];
        const g =
          WeatherComposition.WeatherConditions[currentWeatherInfo?.main];
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
    currentMeasureUnit() {
      return WeatherComposition.MeasurementUnits[
        import.meta.env.VITE_DEFAULT_MEASUREMENT_UNIT
      ];
    },
    hourlyWeatherStats() {
      return this?.currentWeatherData?.hourly || [];
    },
    dailyWeatherStats() {
      return this?.currentWeatherData?.daily || [];
    },
  },
  methods: {
    async updateForecastWeather(coord) {
      try {
        this.currentWeatherData = await OpenWeatherMap.fetchForecastWeatherData(
          coord.lat,
          coord.lon,
          import.meta.env.VITE_DEFAULT_MEASUREMENT_UNIT
        );
        console.log("Forecast updated");
      } catch (error) {
        alert(error.message);
      } finally {
        if (this.loading) this.loading = !this.loading;
      }
    },
    setCurrentLocation(location) {
      this.defaultSettings.location = location;
    },
    fillDefaultSettings() {
      this.defaultSettings.location = import.meta.env.VITE_DEFAULT_LOCATION;
      this.defaultSettings.temp = this.currentMeasureUnit.temp;
      this.defaultSettings.wind = this.currentMeasureUnit.windSpeed;
      this.defaultSettings.pressure = this.currentMeasureUnit.pressure;
    },
  },
  created() {
    console.log("Building ABC index...", new Date());
    this.loading = !this.loading;

    this.fillDefaultSettings();
    CityFinder.createABCIndex();

    let { coord } =
      CityFinder.fetchLocationDetail(this.defaultSettings.location) || {};

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