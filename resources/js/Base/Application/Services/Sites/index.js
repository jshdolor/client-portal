import SiteModel from '~/Application/Models/Site';
import BaseResourceService from '~/Application/Services/BaseResourceService';
import Client from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import SiteSummaryReportModel from '~/Application/Models/Site/Summary';
class SitesService extends BaseResourceService {
    static endpoint = '/sites';
    static model = SiteModel;
    static cacheKey = 'sites';
    static customResourceId = 'site_id';

    static summary(resourceId) {
        return Client.setUrl(`${this.endpoint}/${resourceId}/summary`)
            .get()
            .then(({ data }) => new SiteSummaryReportModel(data))
            .catch((error) => {
                throw new ExceptionHandler({ error });
            });
    }
}

export default SitesService;
