<template>
  <div id="stats_grid">
    <div id="stats_grid__header">
      <div class="row">
        <h4 id="stats_grid__header__datetime">2: 23 PM Aug 14th, 2022</h4>
      </div>
      <div id="stats_grid__header__content" class="row">
        <span id="stats_grid__header__content_temperature"> +28C </span>
        <img
          id="stats_grid__header__content_precipitation"
          :src="icons.sun"
          width="96"
          height="96"
          class="pointer"
        />
      </div>
      <h4 id="stats_grid_header__status">Very Sunny</h4>
    </div>
    <div id="stats_grid__indicators"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import sun from "../assets/sun.png";

export default defineComponent({
  name: "WeatherStats",
  data() {
    return {
      icons: {
        sun,
      },
    };
  },
});
</script>

<style>
#stats_grid {
  margin: 24px 0 0 0;
}
#stats_grid__header {
  width: 80%;
  margin: 0 auto;
}
#stats_grid__header__content {
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
</style>