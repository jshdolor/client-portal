class ClientStorage {
    static storage = localStorage;

    static get(key = '') {
        const value = this.storage.getItem(key) || null;
        return JSON.parse(value);
    }

    static set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
}

export default ClientStorage;
