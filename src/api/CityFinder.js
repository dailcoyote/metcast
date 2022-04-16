import Storage from "../data/city.list.json";

/*
    ABC indexes  are used as an optimal search for cities.
    Custom sorting noticeably slows down the formation of ABCtree. 
    I would not recommend using sorting in real tasks with large data sets
*/

class GeoCalculator {
    static calculateGPSOffsetRadius(iLat, iLng, iRadius = 0.5) {
        var iDistanceDegreeConverter = 10000.0 / 90.0 * 1000;
        var iLatOffset = iRadius / iDistanceDegreeConverter;
        var iLngOffset = iRadius / (Math.cos(iLat) * iDistanceDegreeConverter);
        var iMaxLat = Math.abs(iLat) + iLatOffset;
        var iMinLat = Math.abs(iLat) - iLatOffset;
        var iMaxLng = Math.abs(iLng) + iLngOffset;
        var iMinLng = Math.abs(iLng) - iLngOffset;

        if (iLat < 0) {
            iMaxLat *= -1;
            iMinLat *= -1;
        }
        if (iLng < 0) {
            iMaxLng *= -1;
            iMinLng *= -1;
        }
        if (iMaxLat > 90) {
            let iOverflow = iMaxLat - 90;
            iMaxLat = 90 - iOverflow;
        }
        if (iMinLat < -90) {
            let iOverflow = -90 + iMinLat;
            iMinLat = -90 + iOverflow;
        }
        if (iMaxLng > 180) {
            let iOverflow = iMaxLng - 180;
            iMaxLng = 180 - iOverflow;
        }
        if (iMinLng < -180) {
            let iOverflow = -180 + iMinLng;
            iMinLng = -180 + iOverflow;
        }

        return {
            iMaxLat,
            iMinLat,
            iMaxLng,
            iMinLng
        }
    }
    static calculateEuclideanDistance(x1, y1, x2, y2) {
        let xOffset = x2 - x1;
        let yOffset = y2 - y1;
        return Math.sqrt(Math.pow(xOffset, 2) + Math.pow(yOffset, 2))
    }
}

class CityFinder {
    constructor() {
        this._abcIndex = new Map();
    }
    createABCIndex(withSort = true) {
        for (let index = 0; index < Storage.length; index++) {
            let cursor, branch, foreignIndx;
            cursor = Storage[index];
            foreignIndx = cursor.name.charAt(0);

            if (!this._abcIndex.has(foreignIndx)) {
                this._abcIndex.set(foreignIndx, [cursor]);
                continue;
            }

            branch = this._abcIndex.get(foreignIndx);
            branch.push(cursor);
            this._abcIndex.set(foreignIndx, branch);
        }

        if (withSort) {
            for (let cityIndex of this._abcIndex.keys()) {
                const citiesByABCIndex = this._abcIndex.get(cityIndex);
                citiesByABCIndex.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                this._abcIndex.set(cityIndex, citiesByABCIndex);
            }
        }
    }
    findPlacesNearby(iLat, iLon) {
        const iMaxRadius = 0.5;
        let nearestPoint = undefined;

        for (let index = 0; index < Storage.length; index++) {
            let cursor = Storage[index];
            let currentLat = cursor?.coord?.lat,
                currentLon = cursor?.coord?.lon;
            let iCurrentDistance = GeoCalculator.calculateEuclideanDistance(iLat, iLon, currentLat, currentLon);

            if (iCurrentDistance <= iMaxRadius) {
                if (!nearestPoint || iCurrentDistance < nearestPoint?.distance) {
                    nearestPoint = {
                        ...cursor,
                    distance: iCurrentDistance,
                    location: cursor.name + "," + cursor.country
                    }
                }
            }
        }

        return nearestPoint;

    }
    fetchLocationDetail(location) {
        const [city, country] = location.split(','),
            foreignIndx = location?.charAt(0),
            citiesByABCIndex = this._abcIndex.get(foreignIndx) || [];

        for (let index = 0; index < citiesByABCIndex.length; index++) {
            let cursor = citiesByABCIndex[index];

            if (cursor.name.toLowerCase().includes(city?.toLowerCase()) &&
                cursor.country.toLowerCase().includes(country?.toLowerCase())) {
                return cursor;
            }
        }
        return undefined;
    }
    getSuggestions(searchTerm = "") {
        const citiesByABCIndex = this._abcIndex.get(searchTerm.charAt(0)) || [];
        let matches = 0;
        let suggestions = [];

        for (let index = 0; index < citiesByABCIndex.length; index++) {
            const { id, coord, name, country } = citiesByABCIndex[index];
            if (
                name.substr(0, searchTerm.length) === searchTerm
                && matches < 10
            ) {
                let htmlFormat = name
                    .replace(searchTerm, `<mark>${searchTerm}</mark>`)
                    .concat(', ')
                    .concat(country);
                let location = name + "," + country;
                matches++
                suggestions.push({
                    id, htmlFormat, coord, location
                });
            }

            if (matches > 10) {
                break;
            }
        }

        return suggestions;
    }
}

export default new CityFinder();