import preferenceMap from '~/Application/Constants/locationServicePreference.json';
import { formatDate } from '~/Framework/Helpers/Date';
import { dateFormat } from '~/Application/Config';

class Location {
    constructor(data = {}) {
        this._enabled = data.location_service_enabled;
        this._preference = data.location_service_preference || '';
        this._latitude = data.latitude;
        this._longitude = data.longitude;
        this._originalCreatedAt = data.created_at;
        this._createdAt = new Date(data.created_at);
    }

    get latitude() {
        return this._latitude;
    }

    get longitude() {
        return this._longitude;
    }

    get enabled() {
        return !!this._enabled;
    }

    get createdAt() {
        return this._createdAt;
    }

    get originalCreatedAt() {
        return formatDate(this._originalCreatedAt, dateFormat)
            ? new Date(this._originalCreatedAt)
            : null;
    }

    get createdAtFormatted() {
        return formatDate(this._originalCreatedAt, dateFormat);
    }

    get coordinates() {
        return [this._latitude, this._longitude];
    }

    get createdAtDiffNow() {
        return this._createdAt;
    }

    get preference() {
        return preferenceMap[this._preference] ?? 'No Data';
    }

    get unformattedCreatedAt() {
        return this._originalCreatedAt;
    }
}

export default Location;
