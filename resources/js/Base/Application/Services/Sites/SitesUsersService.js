import SitesUserModel from '~/Application/Models/Site/SitesUser';
import BaseResourceService from '~/Application/Services/BaseResourceService';
import Client from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import CacheManager from '~/Infrastructure/Cache';

class SitesUsersService extends BaseResourceService {
    static endpoint = '/sites';
    static model = SitesUserModel;
    static cacheKey = 'sites';

    static setSiteId(siteId) {
        this.endpoint = `/sites/${siteId}/users`;
        this.cacheKey = `sites-${siteId}-users`;
        return this;
    }

    static getAll() {
        if (CacheManager.has(this.cacheKey) && !this.ignoreCached) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint + '?include=permissions')
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
                throw new ExceptionHandler({ error });
            });
    }

    static get(resourceId) {
        return Client.setUrl(
            `${this.endpoint}/${resourceId}?include=permissions`
        )
            .get()
            .then(({ data }) => {
                const modeledData = new this.model(data);

                return modeledData;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }

    static resendOnboardingSMS(resourceId) {
        return Client.setUrl(`${this.endpoint}/${resourceId}/resend-onboarding`)
            .post()
            .then(({ data }) => data)
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }

    static updatePermissions(resourceId, permissions) {
        return Client.setUrl(`${this.endpoint}/${resourceId}/permissions`)
            .put({ permissions })
            .then(({ data }) => {
                return data;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }

    static bulk(request) {
        const endpoint = `${this.endpoint}/bulk`;

        return Client.setUrl(endpoint)
            .post(request.toJSON())
            .then((data) => {
                //remove cache since the user is updated
                CacheManager.set(this.cacheKey, null);

                return data;
            })
            .catch((e) => {
                throw e;
            });
    }

    static create(request, errorNS) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON())
            .then(({ data }) => {
                //remove cache since the user list is updated
                CacheManager.set(this.cacheKey, null);
                const modeledData = new this.model(data);
                return modeledData;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error, errorNS });
            });
    }

    static changePassword(resourceId, request, errorNS) {
        return Client.setUrl(`${this.endpoint}/${resourceId}/change-password`)
            .put(request.toJSON())
            .then(({ data }) => data)
            .catch((error) => {
                throw new ExceptionHandler({ error, errorNS});
            });
    }
}

export default SitesUsersService;
