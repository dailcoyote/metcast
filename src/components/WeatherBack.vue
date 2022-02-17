<template>
  <div id="back_container">
    <ForecastHourlyGrid
      :hourlyForecast="hourlyForecast"
      v-if="dailyForecast.length"
    ></ForecastHourlyGrid>
    <ForecastDailyGrid :weeklyForecast="weeklyForecast"> </ForecastDailyGrid>
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
    dailyWeatherStats: Array
  },
  data() {
    return {
      dailyForecast: new Array(),
      weeklyForecast: new Array(),
    };
  },
  computed: {
    hourlyForecast() {
      return this.hourlyWeatherStats.slice(0, 5).map((rec, i) => {
        let time, g, asset, temperature;

        time = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
          .format(rec.dt * 1000)
          .replace("pm", "PM")
          .replace("am", "AM")
          .split(" ")
          .join("");
        g = WeatherEnums.WeatherConditions[rec.weather[0]?.main];
        asset = g.findWeatherAsset(rec.weather[0]?.id);
        temperature = rec.temp > 0 ? "+" : "-";
        temperature += Math.round(rec.temp) + "°";

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
  },
  mounted() {
    this.dailyForecast = [
      {
        time: "Now",
        asset: this.assets.weather.sun,
        temperature: "+28°",
      },
      {
        time: "3:00PM",
        asset: this.assets.weather.rainCloudLow,
        temperature: "+25°",
      },
      {
        time: "4:00PM",
        asset: this.assets.weather.rain,
        temperature: "+24°",
      },
      {
        time: "5:00PM",
        asset: this.assets.weather.heavyRain,
        temperature: "+24°",
      },
      {
        time: "6:00PM",
        asset: this.assets.weather.stormyWeather,
        temperature: "+20°",
      },
    ];
    this.weeklyForecast = [
      {
        date: "Aug 15th",
        day: "Sunday",
        asset: this.assets.weather.rainCloudLow,
        highTempValue: "+26°",
        lowTempValue: "+21°",
      },
      {
        date: "Aug 16th",
        day: "Monday",
        asset: this.assets.weather.clouds,
        highTempValue: "+24°",
        lowTempValue: "+22°",
      },
      {
        date: "Aug 17th",
        day: "Tuesday",
        asset: this.assets.weather.rainCloudLow,
        highTempValue: "+20",
        lowTempValue: "+15°",
      },
      {
        date: "Aug 18th",
        day: "Wednesday",
        asset: this.assets.weather.rain,
        highTempValue: "+18°",
        lowTempValue: "+15°",
      },
      {
        date: "Aug 19th",
        day: "Thursday",
        asset: this.assets.weather.stormyWeather,
        highTempValue: "+15°",
        lowTempValue: "+9°",
      },
    ];
  },
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