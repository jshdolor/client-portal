import Routes from '~/Framework/Router/Routes';
import BaseAppRoutes from '~/Framework/Router/RouteList/AppRoutes';

export default class AppRoutes {
    constructor() {
        const routes = BaseAppRoutes;

        Routes.add(routes);
    }
}
