import Client from '~/Infrastructure/Client/ApiClient';
import CacheManager from '~/Infrastructure/Cache';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';

export default class BaseResourceService {
    static cacheKey = 'resource';
    static endpoint = '/resource';
    static ignoreCached = false;
    static model = [];
    static customResourceId = false;

    static setIgnoreCached(setting = true) {
        this.ignoreCached = setting;
        return this;
    }

    static getAll() {
        if (CacheManager.has(this.cacheKey) && !this.ignoreCached) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                if (data.length === 0) {
                    // don't cache
                    return [];
                }

                const modeledData = (data || []).map((d) => {
                    const singleResource = new this.model(d);

                    const singleCacheKey = this.customResourceId
                        ? `${this.cacheKey}-${d[this.customResourceId]}`
                        : `${this.cacheKey}-${d.id}`;

                    CacheManager.set(singleCacheKey, singleResource);

                    return singleResource;
                });
                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;
            })
            .catch((error) => {
                console.log(error);
                throw new ExceptionHandler({ error });
            });
    }

    static get(resource_id) {
        const singleCacheKey = `${this.cacheKey}-${resource_id}`;

        if (CacheManager.has(singleCacheKey) && !this.ignoreCached) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(singleCacheKey));
            });
        }

        return Client.setUrl(`${this.endpoint}/${resource_id}`)
            .get()
            .then(({ data }) => {
                if (Object.keys(data).length === 0) {
                    // don't cache
                    return {};
                }

                const modeledData = new this.model(data);

                CacheManager.set(singleCacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => {
                console.log(e);
                throw e;
            });
    }

    static create(request, errorNS) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON())
            .then(({ data }) => {
                const modeledData = new this.model(data);
                return modeledData;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error, errorNS });
            });
    }

    static update(resource_id, request, errorNS) {
        const updateEndpoint = `${this.endpoint}/${resource_id}`;

        return Client.setUrl(updateEndpoint)
            .put(request.toJSON())
            .then(({ data }) => {
                const modeledData = new this.model(data);
                //has updated data
                if (modeledData.id) {
                    const singleCacheKey = this.customResourceId
                        ? `${this.cacheKey}-${data[this.customResourceId]}`
                        : `${this.cacheKey}-${data.id}`;

                    CacheManager.set(singleCacheKey, modeledData);
                } else {
                    const singleCacheKey = `${this.cacheKey}-${resource_id}`;
                    CacheManager.set(singleCacheKey, null);
                    CacheManager.set(this.cacheKey, null);
                }

                return modeledData;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error, errorNS });
            });
    }

    static delete(resource_id) {
        const endpoint = `${this.endpoint}/${resource_id}`;

        return Client.setUrl(endpoint)
            .delete()
            .then(({ data }) => {
                CacheManager.set(this.cacheKey, null);
                return data;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }
}
