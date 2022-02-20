export default {
    saveGeoLocation(location) {
        localStorage.setItem(0xF0, location);
    },
    getGeoLocation() {
        return localStorage.getItem(0xF0);
    }
}