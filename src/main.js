import { createApp } from 'vue'
import App from './App.vue'
import WeatherComposition from "./types/WeatherComposition";

const app = createApp(App);

app.mixin({
    data() {
        return {
            assets: {
                weather: WeatherComposition.WeatherIcons
            },
        }
    }
});

app.mount('#app');

window.process = {
    env: {
        NODE_ENV: 'development'
    }
}
