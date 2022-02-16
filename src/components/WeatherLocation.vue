<template>
  <div class="box">
    <div id="location_block" class="row">
        <img :src="icons.location" width="20" height="20" class="pointer" />
        <span>{{location}}</span>
    </div>
    <div id="settings__block">
        <img :src="icons.settings" width="24" height="24" class="pointer" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import location from "../assets/location.png";
import settings from "../assets/settings.png";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    location: String
  },
  data() {
      return {
          icons: {
              location,
              settings
          }
      }
  }
});
</script>

<style scoped>
#location_block {
  width: 328px;
  display: flex;
  justify-content: center;
}
#settings__block {
  width: 24px;
}

#location_block > img {
    margin-right: 2px;
}
#location_block > span {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}
</style>
