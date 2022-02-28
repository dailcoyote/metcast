export default {
    saveGeoLocation(geoData) {
        localStorage.setItem(0xF0, JSON.stringify({
            location: geoData.location,
            coord: geoData.coord
        }));
    },
    getGeoLocation() {
        return JSON.parse(localStorage.getItem(0xF0));
    }
}