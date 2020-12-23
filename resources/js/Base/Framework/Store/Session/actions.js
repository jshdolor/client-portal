export const accessTokenKey = 'accessToken';

export default {
    setAccessToken({ commit }, data) {
        commit('setAccessToken', data);
    },
};
