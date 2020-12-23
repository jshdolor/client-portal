import axios from 'axios';

import { mergeDeep, isEmpty, each } from '~/Framework/Helpers';
import ClientStorage from '~/Infrastructure/ClientStorage';
import { accessTokenKey } from '~/Framework/Store/Session/actions';

export default class Http {
    constructor() {
        this.config = {};
    }

    get(url, params = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'get', config);
        this.config.params = params;
        return this._send();
    }

    post(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'post', config);
        this.config.data = data;
        return this._send();
    }

    put(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'put', config);
        this.config.data = data;
        return this._send();
    }

    delete(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'delete', config);
        this.config.data = data;
        return this._send();
    }

    _prepareXhr(url, method, config) {
        this.config.url = url;
        this.config.method = method;
        this.overrides = config;
    }

    _construct() {
        this.overrides = {};
        this.config = {
            url: '',
            data: {},
            method: 'get',
            params: {},
        };
    }

    _send() {
        if (!isEmpty(this.overrides)) {
            this.config = mergeDeep(this.config, this.overrides);
        }

        return axios(this.config).then((response) => {
            // window.axiosResponseHeaders = response.headers;
            return response.data;
        });
    }
}

const failedCall = (error, data) => {
    let newAccessToken = `Bearer ${data?.data?.access_token}`;

    if (!data) {
        newAccessToken =
            ClientStorage.get(accessTokenKey) ||
            window.Store.state.session.accessToken;
    } else {
        ClientStorage.set(accessTokenKey, newAccessToken);
    }

    window.Store.state.session.accessToken = newAccessToken;
    const failedCallConfig = { ...error.config };

    if (failedCallConfig.headers) {
        failedCallConfig.headers.Authorization = newAccessToken;
    }

    return failedCallConfig;
};

const retryRefreshingAccessToken = (axiosConfig, response) => {
    setTimeout(() => {
        if (!window.callingRefresh) {
            axios(failedCall(axiosConfig)).then((res) => response(res));
        } else {
            retryRefreshingAccessToken(axiosConfig, response);
        }
    }, 500);
};

const intercept = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status !== 401) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }

            if (window.callingRefresh && error.config.url !== '/v4/refresh') {
                const waitRefresh = new Promise((response) => {
                    retryRefreshingAccessToken(error, response);
                });

                return waitRefresh.then((response) => response);
            }

            window.callingRefresh = true;
            window.tries++;

            if (window.tries === 3) {
                window.location.href = '/logout';
                return;
            }

            return axios({
                method: 'post',
                url: '/v4/refresh',
            })
                .then(({ data }) => {
                    window.tries = 0;

                    //return repeat call
                    return axios(failedCall(error, data)).then(
                        (response) => response
                    );
                })
                .catch((e) => {
                    return new Promise((resolve, reject) => {
                        reject(e);
                    });
                })
                .finally(() => {
                    window.callingRefresh = false;
                });
        }
    );
};

intercept();
