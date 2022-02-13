<template>
  <div class="box">
    <div id="location__section" class="row">
        <img :src="icons.location" width="20" height="20" class="pointer" />
        <span>Los Angeles</span>
    </div>
    <div id="settings__section">
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
#location__section {
  width: 340px;
  display: flex;
  justify-content: center;
}
#settings__section {
  width: 24px;
}

#location__section > img {
    margin-right: 2px;
}
#location__section > span {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}
</style>
