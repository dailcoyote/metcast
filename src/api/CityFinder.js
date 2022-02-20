import Storage from "../data/city.list.json";

/*
    ABC indexes  are used as an optimal search for cities.
    Custom sorting noticeably slows down the formation of ABCtree. 
    I would not recommend using sorting in real tasks with large data sets
*/

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

        if (!withSort) {
            return;
        }

        // Sorting
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
    fetchLocationDetail(location) {
        const [city, country] = location.split(','),
            foreignIndx = location?.charAt(0),
            citiesByABCIndex = this._abcIndex.get(foreignIndx) || [];
        return citiesByABCIndex
            .find(
                (cursor) => cursor.name.toLowerCase().includes(city?.toLowerCase())
                    && cursor.country.toLowerCase().includes(country?.toLowerCase()
                    )
            );
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