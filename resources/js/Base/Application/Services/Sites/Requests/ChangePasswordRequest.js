import FormData from '~/Infrastructure/FormData';

class ChangePasswordRequest extends FormData {
    constructor(data = {}) {
        super();
        this._password = data.password;
        this._password_confirmation = data.confirmPassword;
    }
}

export default ChangePasswordRequest;
