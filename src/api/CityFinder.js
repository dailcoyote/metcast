import Storage from "../data/city.list.json";

class CityFinder {
    constructor() {
        this._abcIndex = new Map();
    }
    createABCIndex() {
        for (let index = 0; index < Storage.length; index++) {
            const cursor = Storage[index];
            const key = cursor.name.charAt(0);

            if (!this._abcIndex.has(key)) {
                this._abcIndex.set(key, [cursor]);
                continue;
            }

            const branch = this._abcIndex.get(key);
            branch.push(cursor);
            this._abcIndex.set(key, branch);
        }
    }
    fetchLocationDetail(location) {
        const [city, country] = location.split(','),
            branch = this._abcIndex.get(location?.charAt(0)) || [];
        return branch
            .find(
                (cursor) => cursor.name.toLowerCase().includes(city?.toLowerCase())
                    && cursor.country.toLowerCase().includes(country?.toLowerCase())
            );
    }
    getSuggestions(searchTerm = "") {
        const branch = this._abcIndex.get(searchTerm.charAt(0)) || [];
        let matches = 0;
        let suggestions = [];

        for (let index = 0; index < branch.length; index++) {
            const { id, coord, name, country } = branch[index];
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