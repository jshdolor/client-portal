import LocationModel from '~/Application/Models/Location';
import PermissionModel from '~/Application/Models/Permission';
import { formatDate } from '~/Framework/Helpers/Date';

export default class SitesUser {
    constructor(data = {}) {
        this._id = data.id;
        this._userId = data.contact_id;
        this._name = data.name;
        this._position = data.position;
        this._mobile = data.mobile;
        this._sex = data.sex;
        this._siteId = data.site_id;

        this._receiveTCU = data.auto_notify_tcu;
        this._receiveDevice = data.auto_notify_device;
        this._receiveNCAcceceptDeclineSMS = data.manager;
        this._receiveEvacNCSMS = data.sms;

        this._locations = data.locations || [];
        this._permissions = data.permissions || [];

        this._lastLocation = data.last_location || {};
        this._lastLogin = data.last_login;
        this._lastDeviceLogin = data.last_device_login;
    }

    get id() {
        return this._id;
    }

    get userId() {
        return this._userId;
    }

    get name() {
        return this._name;
    }

    get position() {
        return this._position;
    }

    get mobile() {
        return this._mobile;
    }

    get sex() {
        return this._sex;
    }

    get siteId() {
        return this._siteId;
    }

    get locations() {
        return this._locations.map((data) => new LocationModel(data));
    }

    get permissions() {
        return this._permissions.map((data) => new PermissionModel(data));
    }

    get lastLocation() {
        return new LocationModel(this._lastLocation);
    }

    get locationServicePreference() {
        return this.lastLocation.preference;
    }

    get locationService() {
        const date =
            formatDate(this._lastLocation.created_at, 'dd-LL-yyyy kk:mm') ?? '';
        if (date) {
            return `${date} - ${this.lastLocation.preference}`;
        }
        return this.lastLocation.preference;
    }

    get receiveTCU() {
        return !!this._receiveTCU;
    }

    get receiveEvacNCSMS() {
        return !!this._receiveEvacNCSMS;
    }

    get receiveDevice() {
        return !!this._receiveDevice;
    }

    get receiveNCAcceceptDeclineSMS() {
        return !!this._receiveNCAcceceptDeclineSMS;
    }

    get lastLogin() {
        const date = formatDate(this._lastLogin, 'dd/LL/yyyy kk:mm');
        const device = this._lastDeviceLogin;
        const lastLogin = `${date} - ${device}`;

        if (!date) {
            return 'No Data';
        }

        return lastLogin;
    }
}
