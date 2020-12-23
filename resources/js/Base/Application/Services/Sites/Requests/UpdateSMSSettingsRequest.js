import FormData from '~/Infrastructure/FormData';

class UpdateSMSSettingsRequest extends FormData {
    constructor(data = {}) {
        super();

        this._manager = data.receiveNCAcceceptDeclineSMS;
        this._sms = data.receiveEvacNCSMS;
        this._auto_notify_device = data.receiveDevice;
        this._auto_notify_tcu = data.receiveTCU;
    }
}

export default UpdateSMSSettingsRequest;
