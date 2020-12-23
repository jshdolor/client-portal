import FormData from '~/Infrastructure/FormData';

class UpdateBasicInfoRequest extends FormData {
    constructor(data = {}) {
        super();
        this._name = data.name;
        this._position = data.position;
        this._mobile = data.mobile;
    }
}

export default UpdateBasicInfoRequest;
