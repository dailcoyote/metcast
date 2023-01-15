<template>
  <section id="weather__section" v-if="!loading">
    <WeatherLocation
      :defaultSettings="defaultSettings"
      :applySuggestionsFunc="applySuggestions"
      :registerSettingsChangesFunc="registerSettingsChanges"
      :getCurrentGeoPositionFunc="getCurrentGeoPosition"
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
import EmbeddedStoreInterface from "../api/EmbeddedStoreInterface";
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
        coord: undefined,
        temp: undefined,
        wind: undefined,
        pressure: undefined,
      },
      currentWeatherData: undefined,
      applySuggestions: CityFinder.search.bind(CityFinder)
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
        windSpeedUnit: this.defaultSettings.wind,
        pressureUnit: this.defaultSettings.pressure,
      };

      if (this.currentWeatherData && this.currentWeatherData?.current) {
        const { weather, temp, wind_speed, pressure, humidity } =
          this.currentWeatherData.current;
        const currentWeatherInfo = weather[0];
        const g =
          WeatherComposition.WeatherConditions[currentWeatherInfo?.main];
        const asset = g && g.findWeatherAsset(currentWeatherInfo?.id);

        if (import.meta.env.VITE_DEFAULT_MEASUREMENT_UNIT === "Metric") {
          currentStats.tempValue =
            this.defaultSettings.temp !== this.currentMeasureUnit.temp
              ? WeatherComposition.MeasurementUnits.convertCelsius2Fahrenheit(
                  temp
                )
              : temp;
          currentStats.pressure =
            this.defaultSettings.pressure !== this.currentMeasureUnit.pressure
              ? WeatherComposition.MeasurementUnits.convertPascal2mmHg(pressure)
              : pressure;
          currentStats.windSpeed =
            this.defaultSettings.wind !== this.currentMeasureUnit.windSpeed
              ? WeatherComposition.MeasurementUnits.convertMs2Mph(wind_speed)
              : wind_speed;
        }

        currentStats.dateTime = this.currentDateTime;
        currentStats.weatherDescription = currentWeatherInfo?.description || "";
        currentStats.weatherIcon = asset;
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
      return (
        this?.currentWeatherData?.hourly.map(this.genForecastHourlyMap) || []
      );
    },
    dailyWeatherStats() {
      return (
        this?.currentWeatherData?.daily.map(this.genForecastDailyMap) || []
      );
    },
  },
  methods: {
    genForecastHourlyMap(rec) {
      let temp;
      if (import.meta.env.VITE_DEFAULT_MEASUREMENT_UNIT === "Metric") {
        temp =
          this.defaultSettings.temp !== this.currentMeasureUnit.temp
            ? WeatherComposition.MeasurementUnits.convertCelsius2Fahrenheit(
                rec.temp
              )
            : rec.temp;
      }
      return {
        ...rec,
        temp,
      };
    },
    genForecastDailyMap(rec) {
      let max, min, temp;
      if (import.meta.env.VITE_DEFAULT_MEASUREMENT_UNIT === "Metric") {
        max =
          this.defaultSettings.temp !== this.currentMeasureUnit.temp
            ? parseFloat(
                WeatherComposition.MeasurementUnits.convertCelsius2Fahrenheit(
                  rec.temp.max
                )
              )
            : rec.temp.max;
        min =
          this.defaultSettings.temp !== this.currentMeasureUnit.temp
            ? parseFloat(
                WeatherComposition.MeasurementUnits.convertCelsius2Fahrenheit(
                  rec.temp.min
                )
              )
            : rec.temp.min;
        temp = {
          ...rec.temp,
          min,
          max,
        };
      }
      return {
        ...rec,
        temp,
      };
    },
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
    getCurrentGeoPosition() {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log("Finding Nearby Places");
            let ret = CityFinder.findPlaceNearby(
              position.coords.latitude,
              position.coords.longitude
            );
            console.log("Geolocation determined");
            resolve(ret);
          });
        }
      });
    },
    registerSettingsChanges(settings) {
      if (!settings.coord) {
        let { coord, name, country } =
          CityFinder.findDetailedLocation(settings.location) || {};
        this.defaultSettings = {
          ...settings,
          location: name + "," + country,
          coord,
        };
      } else {
        this.defaultSettings = { ...settings };
      }

      const { location, coord } = this.defaultSettings;

      if (!coord) {
        return 0x10;
      }

      if (
        coord?.lat !== EmbeddedStoreInterface.getGeoLocation()?.coord?.lat &&
        coord?.lon !== EmbeddedStoreInterface.getGeoLocation()?.coord?.lon
      ) {
        EmbeddedStoreInterface.saveGeoLocation({
          coord,
          location,
        });
      }
      this.updateForecastWeather(coord);

      return 0xba;
    },
  },
  created() {
    this.loading = !this.loading;

    this.registerSettingsChanges({
      location:
        EmbeddedStoreInterface.getGeoLocation()?.location ||
        import.meta.env.VITE_DEFAULT_LOCATION,
      coord: EmbeddedStoreInterface.getGeoLocation()?.coord,
      temp: this.currentMeasureUnit.temp,
      wind: this.currentMeasureUnit.windSpeed,
      pressure: this.currentMeasureUnit.pressure,
    });
  },
});
</script>

<style scoped>
#weather__section {
  margin: 21px 0;
  width: 375px;
}
</style>