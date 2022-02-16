import cloud from "../assets/cloud.png";
import clouds from "../assets/clouds.png";
import cloudLightning from "../assets/cloud_lightning.png";
import heavyRain from "../assets/heavy_rain.png";
import lightRain from "../assets/light_rain.png";
import lightSnow from "../assets/light_snow.png";
import partlyCloudyDay from "../assets/partly_cloudy_day.png";
import rainCloud from "../assets/rain_cloud.png";
import rainCloudLow from "../assets/rain_cloud_low.png";
import rain from "../assets/rain.png";
import sleet from "../assets/sleet.png";
import snow from "../assets/snow.png";
import snowStorm from "../assets/snow_storm.png";
import stormyWeather from "../assets/stormy_weather.png";
import sun from "../assets/sun.png";
import sunOriginal from "../assets/sun_original.png";

class WeatherIcons {
    static Cloud = cloud;
    static Clouds = clouds;
    static CloudLightning = cloudLightning;
    static HeavyRain = heavyRain;
    static LightRain = lightRain;
    static LightSnow = lightSnow;
    static PartlyCloudyDay = partlyCloudyDay;
    static RainCloud = rainCloud;
    static RainCloudLow = rainCloudLow;
    static Rain = rain;
    static Sleet = sleet;
    static Snow = snow;
    static SnowStorm = snowStorm;
    static StormyWeather = stormyWeather;
    static Sun = sun;
    static SunOriginal = sunOriginal;
}

class WeatherConditions {
    static Thunderstorm = new WeatherConditions({
        defaultAsset: WeatherIcons.StormyWeather
    });

    static Drizzle = new WeatherConditions({
        defaultAsset: WeatherIcons.Cloud
    });

    static Rain = new WeatherConditions({
        defaultAsset: WeatherConditions.Rain,
        linkedCodes: [{
            id: 500,
            asset: WeatherIcons.LightRain
        }, {
            id: 502,
            asset: WeatherIcons.HeavyRain
        }, {
            id: 503,
            asset: WeatherIcons.HeavyRain
        }, {
            id: 504,
            asset: WeatherIcons.HeavyRain
        }, {
            id: 520,
            asset: WeatherIcons.RainCloudLow
        }, {
            id: 522,
            asset: WeatherIcons.HeavyRain
        }, {
            id: 531,
            asset: WeatherIcons.HeavyRain
        }]
    })

    static Snow = new WeatherConditions({
        defaultAsset: WeatherConditions.Snow,
        linkedCodes: [{
            id: 600,
            asset: WeatherIcons.LightSnow
        }, {
            id: 601,
            asset: WeatherIcons.Snow
        }, {
            id: 602,
            asset: WeatherIcons.SnowStorm
        }, {
            id: 611,
            asset: WeatherIcons.Sleet
        }]
    });

    static Atmosphere = new WeatherConditions({
        defaultAsset: WeatherIcons.CloudLightning
    })

    static Clear = new WeatherConditions({
        defaultAsset: WeatherIcons.Sun
    })

    static Clouds = new WeatherConditions({
        defaultAsset: WeatherIcons.Clouds
    })

    constructor(materials) {
        this.materials = materials;
    }

    findWeatherCondition(id) {
        if (!Array.isArray(this.materials?.linkedCodes)) {
            return this.materials.defaultAsset;
        }
        return this.materials.linkedCodes.find((item) => item.id === id)
    }
}

class TemperatureUnits {
    static Celsius = {
        grade: "°C",
        unit: 'metric'
    };
    static Fahrenheit = {
        grade: "°F",
        unit: 'imperial'
    };
    static Kelvin = {
        grade: "K",
        unit: 'default'
    }
}

export default {
    WeatherIcons,
    WeatherConditions,
    TemperatureUnits
};