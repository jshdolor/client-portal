export default class Auth {
    constructor(data = {}) {
        this._expiresIn = data.expires_in;
        this._accessToken = data.access_token;
    }

    get expiresIn() {
        return this._expiresIn;
    }

    get accessToken() {
        return this._accessToken;
    }
}
