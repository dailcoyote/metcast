import Storage from "../data/city.list.json";

class Cities {
    constructor() {
        this._abcIndex = new Map();
    }
    createABCIndex() {
        console.log('Building...', new Date())
        for (let index = 0; index < Storage.length; index++) {
            const cursor = Storage[index];
            const capital = cursor.name.charAt(0);

            if (!this._abcIndex.has(capital)) {
                this._abcIndex.set(capital, [cursor]);
                continue;
            }

            const branch = this._abcIndex.get(capital);
            branch.push(cursor);
            this._abcIndex.set(capital, branch);
        }
        console.log('Finish...', new Date())
    }
    get abcIndex() {
        return this._abcIndex;
    }
    getSuggestions(searchTerm = "") {
        const branch = this._abcIndex.get(searchTerm.charAt(0)) || [];
        let matches = 0;
        let suggestions = [];

        for (let index = 0; index < branch.length; index++) {
            const cursor = branch[index];
            if (
                cursor.name.toLowerCase().includes(searchTerm.toLowerCase())
                && matches < 10
            ) {
                matches++
                suggestions.push(cursor);
            }

            if (matches > 10) {
                break;
            }
        }

        return suggestions;
    }
}

export default new Cities();