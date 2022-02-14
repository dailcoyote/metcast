<template>
  <ForecastBar timeStr="Now" temperature="+28°"></ForecastBar>
</template>

<script>
import { defineComponent } from "vue";
import ForecastBar from "./ForecastBar.vue";

export default defineComponent({
  name: "ForecastDailyGrid",
  components: {
      ForecastBar
  }
});
</script>

<style>

</style>