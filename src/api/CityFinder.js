import Storage from "../data/city.list.json";
import Planet from "./Planet";

/*
    ABC indexes  are used as an optimal search for cities.
    Custom sorting noticeably slows down the formation of ABCtree. 
    I would not recommend using sorting in real tasks with large data sets
*/

class ABCIndexTree {
    constructor() {
        this._treeMap = new Map();
        console.log("ABCIndexTree|Building index...", new Date());
        this.createABCIndex();
        console.log("ABCIndexTree|Created");
    }
    createABCIndex(withSort = true) {
        for (let index = 0; index < Storage.length; index++) {
            let cursor, abcIndexBranch, foreignIndx;
            cursor = Storage[index];
            foreignIndx = cursor.name.charAt(0);

            if (!this._treeMap.has(foreignIndx)) {
                this._treeMap.set(foreignIndx, [cursor]);
                continue;
            }

            abcIndexBranch = this._treeMap.get(foreignIndx);
            abcIndexBranch.push(cursor);
            this._treeMap.set(foreignIndx, abcIndexBranch);
        }

        if (withSort) {
            for (let cityIndex of this._treeMap.keys()) {
                const citiesByABCIndex = this._treeMap.get(cityIndex);
                citiesByABCIndex.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
                this._treeMap.set(cityIndex, citiesByABCIndex);
            }
        }
    }
    getABCCursor(params) {
        const [city, country] = params.split(','),
            abcIndexBranch = this._treeMap.get(params?.charAt(0)) || [];

        for (let index = 0; index < abcIndexBranch.length; index++) {
            let cursor = abcIndexBranch[index];

            if (
                cursor.name.toLowerCase().includes(city?.toLowerCase()) &&
                cursor.country.toLowerCase().includes(country?.toLowerCase())
            ) {
                return cursor;
            }
        }
        return undefined;
    }
    getSuggestions(searchTerm = "", limit = 10) {
        const citiesByABCIndex = this._treeMap.get(searchTerm.charAt(0)) || [];
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

            if (matches >= limit) {
                break;
            }
        }

        return suggestions;
    }
}

class GeoZoneIndex {
    constructor() {
        this._zones = {
            NORTH_HEMISPHERE: [],
            SOUTH_HEMISPHERE: []
        }
        console.log("GEOZONE|Building index...", new Date());
        this.createGeoZoneIndex();
        console.log("GEOZONE|Created");
    }
    createGeoZoneIndex() {
        for (let index = 0; index < Storage.length; index++) {
            let cursor = Storage[index],
                currentLat = cursor?.coord?.lat;
            if (currentLat >= 0) {
                this._zones.NORTH_HEMISPHERE.push(cursor);
            }
            if (currentLat < 0) {
                this._zones.SOUTH_HEMISPHERE.push(cursor);
            }
        }
    }
    findPlaceNearby(iLat, iLon, iMaxRadius = 0.5) {
        let nearestPoint = undefined,
            range = undefined;
        if (iLat >= 0) {
            range = this._zones.NORTH_HEMISPHERE;
        }
        if (iLat < 0) {
            range = this._zones.SOUTH_HEMISPHERE;
        }

        for (let index = 0; index < range.length; index++) {
            let cursor = range[index],
                currentLat = cursor?.coord?.lat,
                currentLon = cursor?.coord?.lon;
            let iCurrentDistance = Planet.calculateEuclideanDistance(
                iLat,
                iLon,
                currentLat,
                currentLon
            );

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
}

class CityFinder {
    constructor() {
        this._abcIndexTree = new ABCIndexTree();
        this._geoZoneIndex = new GeoZoneIndex();
    }
    search() {
        return this._abcIndexTree.getSuggestions.apply(this._abcIndexTree, arguments);
    }
    findDetailedLocation(params) {
        return this._abcIndexTree.getABCCursor(params)
    }
    findPlaceNearby() {
        return this._geoZoneIndex.findPlaceNearby.apply(this._geoZoneIndex, arguments);
    }
}

export default new CityFinder();