import PermissionModel from '~/Application/Models/Permission';
import BaseResourceService from '~/Application/Services/BaseResourceService';

class PermissionsService extends BaseResourceService {
    static endpoint = '/permissions';
    static model = PermissionModel;
    static cacheKey = 'permissions';
}

export default PermissionsService;
