import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';

import UserModel from '~/Application/Models/User';

export default class UserService {
    static endpoint = '/user';

    static getProfile() {
        return ApiClient.setUrl(this.endpoint + '/profile')
            .get()
            .then(({ data }) => new UserModel(data))
            .catch((e) => {
                return new ExceptionHandler('UserService:get', e);
            });
    }
}
