<template>
  <div id="stats_grid">
    <div id="stats_grid__header">
      <div class="row">
        <h4 id="stats_grid__header__datetime">2: 23 PM Aug 14th, 2022</h4>
      </div>
      <div id="stats_grid__header__content" class="row">
        <span id="stats_grid__header__content_temperature"> +28°C </span>
        <img
          id="stats_grid__header__content_precipitation"
          :src="icons.sun"
          width="96"
          height="96"
        />
      </div>
      <h4 id="stats_grid_header__status">Very Sunny</h4>
    </div>
    <div id="stats_grid__indicators">
      <div id="stats_grid__indicators__content" class="row">
        <div class="box row w45">
          <img :src="icons.wind" width="32" height="32" />
          <span class="indicator__label">2.1m.e, E</span>
          <img :src="icons.compass" width="22" height="22" />
        </div>
        <div class="box row w25">
          <img :src="icons.hygrometer" width="32" height="32" />
          <span class="indicator__label">87%</span>
        </div>
         <div class="box row w30">
          <img :src="icons.pressureGauge" width="32" height="32" />
          <span class="indicator__label">1012hPa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import sun from "../assets/sun.png";
import compass from "../assets/compass.png";
import hygrometer from "../assets/hygrometer.png";
import pressureGauge from "../assets/pressure_gauge.png";
import wind from "../assets/wind.png";

export default defineComponent({
  name: "WeatherStats",
  data() {
    return {
      icons: {
        sun,
        compass,
        hygrometer,
        pressureGauge,
        wind,
      },
    };
  },
});
</script>

<style scoped>
#stats_grid {
  margin: 24px 0 0 0;
}
#stats_grid__header {
  width: 271px;
  margin: 0 auto;
}
#stats_grid__header__content, #stats_grid__indicators__content {
  display: flex;
  justify-content: center;
}
#stats_grid__header__datetime {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #bcccf4;
}

#stats_grid__header__content_temperature {
  margin-top: 12px;
  font-weight: bold;
  font-size: 62px;
  line-height: 73px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}

#stats_grid__header__content_precipitation {
  margin-left: 5px;
}

#stats_grid_header__status {
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}

#stats_grid__indicators {
  margin-top: 18px;
  width: 344px;
  padding: 0 12px;
}

.indicator__label {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  margin-left: 6px;
  margin-top: 6px;

  color: #ffffff;
}
</style>