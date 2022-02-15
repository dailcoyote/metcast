import { createApp } from 'vue'
import App from './App.vue'

import cloud from "./assets/cloud.png";
import clouds from "./assets/clouds.png";
import cloudLightning from "./assets/cloud_lightning.png";
import heavyRain from "./assets/heavy_rain.png";
import lightRain from "./assets/light_rain.png";
import lightSnow from "./assets/light_snow.png";
import partlyCloudyDay from "./assets/partly_cloudy_day.png";
import rainCloud from "./assets/rain_cloud.png";
import rainCloudLow from "./assets/rain_cloud_low.png";
import rain from "./assets/rain.png";
import sleet from "./assets/sleet.png";
import snow from "./assets/snow.png";
import stormyWeather from "./assets/stormy_weather.png";
import sun from "./assets/sun.png";
import sunOriginal from "./assets/sun_original.png";

const app = createApp(App);

app.mixin({
    data() {
        return {
            assets: {
                weather: {
                    cloud,
                    clouds,
                    cloudLightning,
                    heavyRain,
                    lightRain,
                    lightSnow,
                    partlyCloudyDay,
                    rainCloud,
                    rainCloudLow,
                    rain,
                    sleet,
                    snow,
                    stormyWeather,
                    sun,
                    sunOriginal
                }
            },
        }
    }
})

app.mount('#app');

window.process = {
    env: {
        NODE_ENV: 'development'
    }
}
