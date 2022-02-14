<template>
  <div id="back_container">
      <ForecastDailyGrid></ForecastDailyGrid>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ForecastDailyGrid from "./ForecastDailyGrid.vue";

export default defineComponent({
  name: "WeatherBack",
  components: {
      ForecastDailyGrid
  },
  data() {
    return {};
  },
});
</script>

<style scoped>
#back_container {
  margin: 25px 0 0 0;
  padding: 20px 15px;
  position: relative;
  min-height: 583px;
  width: 100%;

  background: #3a5cb3;
  border-radius: 22px;
}
</style>