<template>
  <div id="back_container">
    <ForecastDailyGrid
      :dailyForecast="dailyForecast"
      v-if="dailyForecast.length"
    ></ForecastDailyGrid>
    <ForecastWeeklyGrid :weeklyForecast="weeklyForecast"> </ForecastWeeklyGrid>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastDailyGrid from "./ForecastDailyGrid.vue";
import ForecastWeeklyGrid from "./ForecastWeeklyGrid.vue";

export default defineComponent({
  name: "WeatherBack",
  components: {
    ForecastDailyGrid,
    ForecastWeeklyGrid,
  },
  data() {
    return {
      dailyForecast: new Array(),
      weeklyForecast: new Array(),
    };
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