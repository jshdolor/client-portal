import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import AuthModel from '~/Application/Models/Auth';
import ClientStorage from '~/Infrastructure/ClientStorage';
import { accessTokenKey } from '~/Framework/Store/Session/actions';
export default class AuthService {
    static refresh() {
        return ApiClient.setUrl('/refresh')
            .post()
            .then(({ data }) => new AuthModel(data))
            .catch((e) => {
                //reload refresh token is expired
                window.location.reload();
                //this would take the user back to the login page-- laravel will handle this
            });
    }

    static logout() {
        return ApiClient.setUrl('/logout')
            .post()
            .then(({ data }) => {
                ClientStorage.set(accessTokenKey, null);
                return data;
            })
            .catch((e) => {
                throw new ExceptionHandler('AuthService:logout', e);
            });
    }
}
