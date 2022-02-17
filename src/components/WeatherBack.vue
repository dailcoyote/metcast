<template>
  <div id="back_container">
    <ForecastHourlyGrid :hourlyForecast="hourlyForecast"></ForecastHourlyGrid>
    <ForecastDailyGrid :dailyForecast="dailyForecast"> </ForecastDailyGrid>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import WeatherEnums from "../enums/Weather";
import ForecastHourlyGrid from "./ForecastHourlyGrid.vue";
import ForecastDailyGrid from "./ForecastDailyGrid.vue";

export default defineComponent({
  name: "WeatherBack",
  components: {
    ForecastHourlyGrid,
    ForecastDailyGrid,
  },
  props: {
    hourlyWeatherStats: Array,
    dailyWeatherStats: Array,
  },
  computed: {
    hourlyForecast() {
      return this.hourlyWeatherStats.slice(0, 5).map((rec, i) => {
        let time, asset, temperature;

        asset = this.defineAsset(rec.weather[0]?.main, rec.weather[0]?.id);
        temperature = this.convert2TemperatureFormat(rec.temp);
        time = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
          .format(rec.dt * 1000)
          .replace("pm", "PM")
          .replace("am", "AM")
          .split(" ")
          .join("");

        if (i == 0) {
          let now = new Date();
          let diffSec = (now.getTime() - rec.dt * 1000) / 1000;
          let diffMin = diffSec / 60;
          time = diffMin < 60 ? "Now" : time;
        }

        return {
          time,
          asset,
          temperature,
        };
      });
    },
    dailyForecast() {
      const dateFormatOptions = { month: "short", day: "2-digit" };
      const dayFormatOptions = { weekday: "long" };

      return this.dailyWeatherStats.slice(0, 5).map((rec) => {
        let date, day, asset, highTempValue, lowTempValue;

        date = new Intl.DateTimeFormat("en-US", dateFormatOptions).format(
          new Date(rec.dt * 1000)
        );
        day = new Intl.DateTimeFormat("en-US", dayFormatOptions).format(
          new Date(rec.dt * 1000)
        );
        asset = this.defineAsset(rec.weather[0]?.main, rec.weather[0]?.id);
        highTempValue = this.convert2TemperatureFormat(rec.temp?.max);
        lowTempValue = this.convert2TemperatureFormat(rec.temp?.min);

        return {
          date,
          day,
          asset,
          highTempValue,
          lowTempValue,
        };
      });
    },
  },
  methods: {
    convert2TemperatureFormat(tempValue) {
      let v = tempValue > 0 ? "+" : '';
      v += Math.round(tempValue) + "°";
      return v;
    },
    defineAsset(type, id) {
      let g = WeatherEnums.WeatherConditions[type];
      return g && g.findWeatherAsset(id);
    },
  }
});
</script>

<style scoped>
#back_container {
  margin: 25px 0 0 0;
  padding: 20px 15px;
  position: relative;
  min-height: 583px;
  /* width: 100%; */

  background: #3a5cb3;
  border-radius: 22px;
}
</style>