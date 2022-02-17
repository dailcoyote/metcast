<template>
  <div id="forecast_daily__grid">
    <div class="box col">
      <ForecastCard
        v-for="(item, i) in dailyForecast"
        :key="i"
        :class="i > 0 && 'mt-2hf'"
        :date="item.date"
        :day="item.day"
        :asset="item.asset"
        :temperature="item.temperature"
        :highTempValue="item.highTempValue"
        :lowTempValue="item.lowTempValue"
      ></ForecastCard>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastCard from "./ForecastCard.vue";

export default defineComponent({
  name: "ForecastDailyGrid",
  components: {
    ForecastCard,
  },
  props: {
    dailyForecast: Array,
  },
});
</script>

<style scoped>
#forecast_daily__grid {
  width: 345px;
  height: 435px;
  margin: 30px 0 0 0;
}
</style>