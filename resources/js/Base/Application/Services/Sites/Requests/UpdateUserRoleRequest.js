import FormData from '~/Infrastructure/FormData';

class UpdateUserRoleRequest extends FormData {
    constructor(data = {}) {
        super();
        //this will only depend on the role..
        this._role = data.role.toLowerCase();

        this._sms = true;
        this._auto_notify_device = true;
        this._auto_notify_tcu = true;
        this._manager = true;
    }
}

export default UpdateUserRoleRequest;
