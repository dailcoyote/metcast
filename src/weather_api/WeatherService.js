
class WeatherService {
    async fetchForecastWeatherData(lat, lon) {
        const params = {
            lat,
            lon,
            appid: import.meta.env.VITE_APP_OPEN_WEATHER_APPID
        };
        const options = {
            method: 'GET'
        };
        let url = import.meta.env.VITE_APP_OPEN_WEATHER_API;

        url += '?' + ( new URLSearchParams( params ) ).toString();

        const response = await fetch(url, options);
        return response.json();
    }
}

export default new WeatherService();