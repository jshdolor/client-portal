import { formatDate } from '~/Framework/Helpers/Date';
import { eventTypeDisplayMap } from '~/Application/Config/Sites/Logs';
export default class Log {
    constructor(data = {}) {
        this._eventType = data.event_type;
        this._createdAt = data.created_at;
        this._eventNumber = data.event_no;
        this._activatedBy = data.activated_by;
        this._activationPoint = data.activation_point;
        this._respondent = data.respondent;
        this._serialNumber = data.serial_number;
        this._duration = data.duration;
        this._ohsNumber = data.OHS;
        this._id = data.id;
        this._description = data.description;
        this._xBee64BitAddress = data.xBee64BitAddress;
        this._xBee64BitAddress = data.xBee64BitAddress;
    }

    get id() {
        return this._id;
    }

    get xBee64BitAddress() {
        return this._xBee64BitAddress;
    }

    get ohsNumber() {
        return this._ohsNumber;
    }

    get duration() {
        return this._duration + ' min';
    }

    get serialNumber() {
        return this._serialNumber;
    }

    get respondent() {
        return this._respondent;
    }

    get eventNumber() {
        return this._eventNumber;
    }

    get description() {
        return this._description;
    }

    get event() {
        return this._eventNumber.substr(0, this._eventNumber.indexOf('-'));
    }

    get eventType() {
        return eventTypeDisplayMap[this._eventType];
    }
    get createdAt() {
        return formatDate(this._createdAt, 'dd/LL/yyyy kk:mm:ss');
    }
    get logCreatedAt() {
        return formatDate(this._createdAt, 'dd/LL/yyyy hh:mm a');
    }
    get activatedBy() {
        return this._activatedBy;
    }
    get activationPoint() {
        return this._activationPoint;
    }
}
