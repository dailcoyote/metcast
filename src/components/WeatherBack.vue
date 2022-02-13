<template>
  <div id="back_container"></div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherBack",
  data() {
    return {};
  },
});
</script>

<style scoped>
#back_container {
  margin: 25px 0 0 0;
  position: relative;
  min-height: 583px;
  width: 100%;

  background: #3a5cb3;
  border-radius: 22px;
}
</style>