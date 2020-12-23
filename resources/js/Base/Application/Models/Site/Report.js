import { formatDate } from '~/Framework/Helpers/Date';

export default class SiteReport {
    constructor(data = {}) {
        this._createdAt = data.created_at;
        this._creatorName = data.creator ? data.creator.name : '';
        this._creatorEmail = data.creator ? data.creator.email : '';
        this._file = data.file;
    }

    get createdAt() {
        return formatDate(this._createdAt, 'dd/LL/yyyy kk:mm');
    }

    get creatorEmail() {
        return this._creatorEmail;
    }

    get fileExpiresIn() {
        if (!this._file) return false;
        return this._file.expires_in;
    }

    get fileLink() {
        if (!this._file) return false;
        return this._file.link;
    }
}
