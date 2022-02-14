<template>
  <div id="forecast_weekly_grid">
    <div class="box col">
      <ForecastCard
        v-for="(item, i) in weeklyForecast"
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
  name: "ForecastWeeklyCard",
  components: {
    ForecastCard,
  },
  props: {
    weeklyForecast: Array,
  },
});
</script>

<style scoped>
#forecast_weekly_grid {
  width: 345px;
  height: 435px;
  margin: 30px 0 0 0;
}
</style>