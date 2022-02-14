<template>
  <div id="back_container">
    <ForecastDailyGrid
      :dailyForecast="dailyForecast"
      v-if="dailyForecast.length"
    ></ForecastDailyGrid>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastDailyGrid from "./ForecastDailyGrid.vue";

export default defineComponent({
  name: "WeatherBack",
  components: {
    ForecastDailyGrid,
  },
  data() {
    return {
      dailyForecast: new Array(),
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