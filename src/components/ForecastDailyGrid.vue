<template>
  <div id="forecast_daily__grid"></div>
  <div class="box row">
    <ForecastBar
      v-for="(item, i) in dailyForecast"
      :key="i"
      :class="i > 0 && 'ml-5'"
      :time="item.time"
      :temperature="item.temperature"
      :asset="item.asset"
    ></ForecastBar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastBar from "./ForecastBar.vue";

export default defineComponent({
  name: "ForecastDailyGrid",
  components: {
    ForecastBar,
  },
  props: {
    dailyForecast: Array,
  },
  created() {
    //   console.log(this.assets.weather.cloud)
  },
});
</script>

<style scoped>
#forecast_daily__grid {
    width: 330px;
}
</style>