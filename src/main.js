import { createApp } from 'vue'
import App from './App.vue'
import WeatherEnums from "./enums/Weather";

const app = createApp(App);

app.mixin({
    data() {
        return {
            assets: {
                weather: WeatherEnums.WeatherIcons
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
