
class OpenWeatherMap {
    async fetchForecastWeatherData(lat, lon, units) {
        const params = {
            lat,
            lon,
            units,
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

export default new OpenWeatherMap();