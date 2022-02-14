<template>
  <div class="forecast_bar box col">
    <span class="time">{{ timeStr }}</span>
    <span class="temperature">{{ temperature }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ForecastBar",
  props: {
    timeStr: String,
    // asset: String,
    temperature: String,
  },
});
</script>

<style>
.forecast_bar {
  max-width: 55px;
}

.forecast_bar > .time {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #bcccf4;
}

.forecast_bar > .temperature {
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}
</style>