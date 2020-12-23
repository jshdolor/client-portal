export default class User {
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._email = data.email;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }
}
