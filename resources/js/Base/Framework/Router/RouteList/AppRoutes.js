import Sites from '~/Framework/Components/Modules/Sites';
import SitesChildLayout from '~/Framework/Components/Layout/ParentPage';
import SitesChildren from '~/Framework/Router/RouteList/children/Sites/';

export default [
    {
        path: '/',
        component: Sites,
    },
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
