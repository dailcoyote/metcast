<template>
  <main>
    <WeatherForecast></WeatherForecast>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import "./root.css";
import WeatherForecast from "./components/WeatherForecast.vue";

export default defineComponent({
  name: "App",
  components: { WeatherForecast },
});
</script>