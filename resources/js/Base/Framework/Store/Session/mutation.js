import { accessTokenKey } from './actions';
import ClientStorage from '~/Infrastructure/ClientStorage';

export default {
    setAccessToken(state, data) {
        const token = `Bearer ${data}`;
        ClientStorage.set(accessTokenKey, token);
        state.accessToken = token;
    },
};
