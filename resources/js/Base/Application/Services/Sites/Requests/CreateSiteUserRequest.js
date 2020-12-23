import FormData from '~/Infrastructure/FormData';

class CreateSiteUserRequest extends FormData {
    constructor(data = {}) {
        super();
        this._name = data.name;
        this._password = data.password;
        this._position = data.position;
        this._mobile = data.mobile;

        this._manager = data.receiveNCAcceceptDeclineSMS;
        this._sms = data.receiveEvacNCSMS;
        this._auto_notify_device = data.receiveDevice;
        this._auto_notify_tcu = data.receiveTCU;
        this._role = data.permissionPreset.toLowerCase();
    }
}

export default CreateSiteUserRequest;
