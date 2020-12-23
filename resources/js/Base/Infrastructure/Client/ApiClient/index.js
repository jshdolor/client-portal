import Http from '~/Infrastructure/Client/Http';

export default class ApiClient {
    static url = '';
    static API_BASE = '/v4';
    static options = {};

    static withAuth() {
        this.options = {
            headers: {
                Authorization: window.Store?.state?.session?.accessToken,
            },
        };
        return ApiClient;
    }

    static setUrl(url) {
        this.url = this.API_BASE + url;
        return ApiClient;
    }

    static post(data, options = {}) {
        let http = new Http();
        this.withAuth();
        options = { ...this.options, ...options };
        return http.post(this.url, data, options);
    }

    static delete(data, options = {}) {
        let http = new Http();
        this.withAuth();
        options = { ...this.options, ...options };
        return http.delete(this.url, data, options);
    }

    static put(data, options = {}) {
        let http = new Http();
        this.withAuth();
        options = { ...this.options, ...options };
        return http.put(this.url, data, options);
    }

    static get(params, options = {}) {
        let http = new Http();
        this.withAuth();
        options = { ...this.options, ...options };
        return http.get(this.url, params, options);
    }
}
