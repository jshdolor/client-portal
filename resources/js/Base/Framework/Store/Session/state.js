import { accessTokenKey } from './actions';
import ClientStorage from '~/Infrastructure/ClientStorage';

export default {
    accessToken: ClientStorage.get(accessTokenKey),
};
