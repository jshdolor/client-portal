import { dateFormat } from '~/Application/Config';
import { deviceTypeGroupMap } from '~/Application/Config/Sites/Device';
import { formatDate, dateDiffWithTimezone } from '~/Framework/Helpers/Date';

export default class SiteDevice {
    constructor(data = {}) {
        this._name = data.device_name;
        this._level = data.level;
        this._position = data.position;
        this._type = data.device_type;
        this._battery = data.battery;
        this._connectivity = data.connectivity;
        this._enabled = data.enabled;
        this._deviceId = data.device_id;
        this._mainsPowered = data.mains_powered;
        this._serialNumber = data.serial_number;
        this._sim = data.sim;
        this._updatedAt = data.updated_at.date;
        this._serviceStart = data.service_start;
        this._serviceEnd = data.service_end;
    }

    get deviceId() {
        return this._deviceId;
    }

    set enabled(value) {
        return (this._enabled = value);
    }

    get groups() {
        let groups = [];
        for (let group in deviceTypeGroupMap) {
            if (deviceTypeGroupMap[group].indexOf(this._type) > -1) {
                groups.push(group);
            }
        }
        return groups;
    }

    get name() {
        return this._name;
    }

    get serialNumber() {
        return this._serialNumber;
    }
    get level() {
        return this._level;
    }
    get position() {
        return this._position;
    }
    get type() {
        return this._type;
    }
    get deviceType() {
        if (this._deviceId >= 1 && this._deviceId <= 100) return 'Virtual';

        const standard = [1, 2, 3, 4, 10, 11];
        if (standard.indexOf(this._type) > -1) {
            return 'Standard';
        }
        const cellular = [5, 6, 7, 8];
        if (cellular.indexOf(this._type) > -1) {
            return 'Cellular';
        }

        return '';
    }
    get battery() {
        if (!this.enabled) return '';
        return this._battery;
    }
    get connectivity() {
        if (this.deviceType === 'Cellular') {
            const diffFromNow = dateDiffWithTimezone(this._updatedAt, null);
            return diffFromNow <= 36 * 60;
        }

        if (!this.enabled) return false;
        return this._connectivity;
    }
    get enabled() {
        return !!this._enabled;
    }
    get mainsPowered() {
        if (!this.enabled) return false;
        return this._mainsPowered;
    }
    get sim() {
        return this._sim;
    }
    get updatedAt() {
        if (!this.enabled) return '';
        return formatDate(this._updatedAt, dateFormat);
    }
    get serviceStart() {
        return formatDate(this._serviceStart, 'dd/LL/yyyy');
    }
    get serviceEnd() {
        return formatDate(this._serviceEnd, 'dd/LL/yyyy');
    }
    get updatedAtCls() {
        const diffFromNow = dateDiffWithTimezone(this._updatedAt, null);
        // standard && diffFromNow(updated_at) > 24 hrs
        if (this.deviceType === 'Standard' && diffFromNow > 24 * 60 * 60) {
            return 'red--text';
        }
        // celullar && diffFromNow(updated_at) > 36 minutes
        if (this.deviceType === 'Cellular' && diffFromNow > 36 * 60) {
            return 'red--text';
        }

        return '';
    }
}
