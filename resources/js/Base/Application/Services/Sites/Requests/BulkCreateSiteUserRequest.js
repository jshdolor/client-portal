import FormData from '~/Infrastructure/FormData';
const truthyValues = ['Y', 'y'];
class BulkCreateSiteUserRequest extends FormData {
    constructor(data = [], role = 'worker') {
        super();
        this._users = [...data].map((user, index) => {
            user.manager =
                truthyValues.indexOf(user.receiveNCAcceptDeclineSMS) !== -1;
            user.sms = truthyValues.indexOf(user.receiveEvacNCSMS) !== -1;
            user.auto_notify_device =
                truthyValues.indexOf(user.receiveDevice) !== -1;
            user.auto_notify_tcu = truthyValues.indexOf(user.receiveTCU) !== -1;
            user.role = role.toLowerCase();
            user.row = index + 1;

            return user;
        });
    }
}

export default BulkCreateSiteUserRequest;
