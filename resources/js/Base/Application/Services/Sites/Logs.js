import SiteLogModel from '~/Application/Models/Site/Logs';
import BaseResourceService from '~/Application/Services/BaseResourceService';

class LogsService extends BaseResourceService {
    static model = SiteLogModel;

    static setSiteId(siteId) {
        this.endpoint = `/sites/${siteId}/logs`;
        this.cacheKey = `sites-${siteId}-logs`;
        return this;
    }
}

export default LogsService;
