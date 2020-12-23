import DeliveryModel from '~/Application/Models/Site/Delivery';
import BaseResourceService from '~/Application/Services/BaseResourceService';

class DeliveryService extends BaseResourceService {
    static endpoint = '/sites';
    static model = DeliveryModel;

    static setSiteId(siteId) {
        this.endpoint = `/sites/${siteId}/deliveries`;
        this.cacheKey = `sites-${siteId}-deliveries`;
        return this;
    }
}

export default DeliveryService;
