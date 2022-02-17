<template>
  <div id="forecast_hourly__grid">
    <div class="box row">
      <ForecastBar
        v-for="(item, i) in hourlyForecast"
        :key="i"
        :class="i > 0 && 'ml-5'"
        :time="item.time"
        :temperature="item.temperature"
        :asset="item.asset"
      ></ForecastBar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastBar from "./ForecastBar.vue";

export default defineComponent({
  name: "ForecastHouryGrid",
  components: {
    ForecastBar,
  },
  props: {
    hourlyForecast: Array,
  },
});
</script>

<style scoped>
#forecast_hourly__grid {
  width: 330px;
  min-height: 81px;
}
</style>