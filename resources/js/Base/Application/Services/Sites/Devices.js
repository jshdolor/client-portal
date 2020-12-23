import SiteDeviceModel from '~/Application/Models/Site/Device';
import BaseResourceService from '~/Application/Services/BaseResourceService';
import Client from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';

class SiteDeviceService extends BaseResourceService {
    static model = SiteDeviceModel;

    static setSiteId(siteId) {
        this.endpoint = `/sites/${siteId}/devices`;
        this.cacheKey = `sites-${siteId}-devices`;
        return this;
    }

    static toggleStatus(deviceId) {
        const endpoint = `${this.endpoint}/${deviceId}/status/toggle`;
        return Client.setUrl(endpoint)
            .put()
            .then(({ data }) => {
                return data;
            })
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }
}

export default SiteDeviceService;
