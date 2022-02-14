<template>
  <div class="forecast-card">
    <div class="box row">
      <div class="w30 col">
        <span class="date">{{ date }}</span>
        <span class="day">{{ day }}</span>
      </div>
      <div class="w40 col">
        <img class="center" :src="asset" width="44" height="44" />
      </div>
      <div class="w30 col">
        <div class="box row">
          <div class="w50 tempvalue black--color">{{ highTempValue }}</div>
          <div class="w50 tempvalue gray--color">{{ lowTempValue }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ForecastCard",
  props: {
    date: String,
    day: String,
    asset: String,
    highTempValue: String,
    lowTempValue: String,
  },
});
</script>

<style scoped>
.forecast-card {
  width: 345px;
  height: 79px;

  background: #e9eefa;
  border-radius: 22px;
}

.tempvalue {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
}

.forecast-card > .box {
  height: inherit;
  margin: 0 14px;
}

.forecast-card > .box > div {
  display: flex;
  justify-content: center;
}

.forecast-card > .box > div > img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.forecast-card > .box > div > .date {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  color: rgba(0, 0, 0, 0.28);
}

.forecast-card > .box > div > .day {
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  margin-top: 3px;
  /* identical to box height */

  color: #000000;
}
</style>