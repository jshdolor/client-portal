import Routes from '~/Framework/Router/Routes';
import BaseAppRoutes from '~/Framework/Router/RouteList/AppRoutes';

import Sites from '~/Framework/Components/Modules/Sites';
import SitesChildLayout from '@dashboard/Framework/Components/Layout/ParentPage';
import SitesChildren from '~/Framework/Router/RouteList/children/Sites/';

export default class AppRoutes {
    constructor() {
        const routes = [
            {
                path: '/sites',
                name: 'sites',
                component: Sites,
            },
            {
                path: '/sites',
                component: SitesChildLayout,
                children: SitesChildren,
            },
        ];

        Routes.add(routes);
    }
}
