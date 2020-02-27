export default class DataStore {
    constructor() {
        this.map = new Map();
    }
    
    static getInstance() {
        if(!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    put(key, value) {
        this.map.set(key, value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    destory() {
        for(let value of this.map.values()) {
            value = null;
        }
    }
}