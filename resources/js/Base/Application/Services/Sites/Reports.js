import SiteReportModel from '~/Application/Models/Site/Report';
import BaseResourceService from '~/Application/Services/BaseResourceService';

class SiteReportService extends BaseResourceService {
    static model = SiteReportModel;

    static setSiteId(siteId) {
        this.endpoint = `/sites/${siteId}/reports`;
        this.cacheKey = `sites-${siteId}-reports`;
        return this;
    }
}

export default SiteReportService;
