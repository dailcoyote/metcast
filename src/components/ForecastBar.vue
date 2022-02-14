<template>
  <div class="forecast_bar box col">
    <span class="time">{{ time }}</span>
    <img class="mt-3 vector" :src="asset" width="32" height="32" />
    <span class="mt-3 temperature">{{ temperature }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ForecastBar",
  props: {
    time: String,
    asset: String,
    temperature: String,
  },
});
</script>

<style>
.forecast_bar {
  width: 55px;
}

.forecast_bar > .time {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #bcccf4;
}

.forecast_bar > .vector {
  display: block;
  margin-left: auto;
  margin-right: auto;
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