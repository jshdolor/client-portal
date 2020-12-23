import SitesSitePage from '~/Framework/Components/Modules/Sites/Site';
import UsersList from '~/Framework/Components/Modules/Sites/Users';
import SiteLogs from '~/Framework/Components/Modules/Sites/Logs';
import SiteDevices from '~/Framework/Components/Modules/Sites/Devices';
import User from '~/Framework/Components/Modules/Sites/Users/User';

import SiteCompanyContactInfo from '~/Framework/Components/Modules/Sites/CompanyContactInfo';
import SiteDeliveries from '~/Framework/Components/Modules/Sites/Deliveries';
import SiteReports from '~/Framework/Components/Modules/Sites/Reports';

export default [
    {
        path: ':siteId/details',
        name: 'sites.site',
        component: SitesSitePage,
        props(route) {
            return route.params || {};
        },
    },

    // {
    //     path: ':siteId/tcu',
    //     name: 'sites.tcu',
    //     component: SitesSitePage,
    // },
    {
        path: ':siteId/logs',
        name: 'sites.logs',
        component: SiteLogs,
        props(route) {
            return route.params || {};
        },
    },
    {
        path: ':siteId/devices',
        name: 'sites.devices',
        component: SiteDevices,
        props(route) {
            return route.params || {};
        },
    },
    {
        path: ':siteId/company-contact-person',
        name: 'sites.company-contact-info',
        component: SiteCompanyContactInfo,
        props(route) {
            return route.params || {};
        },
    },
    {
        path: ':siteId/delivery',
        name: 'sites.delivery',
        component: SiteDeliveries,
        props(route) {
            return route.params || {};
        },
    },
    {
        path: ':siteId/users',
        name: 'sites.users',
        component: UsersList,
        props(route) {
            return route.params || {};
        },
    },
    {
        path: ':siteId/reports',
        name: 'sites.reports',
        component: SiteReports,
        props(route) {
            return route.params || {};
        },
    },

    {
        path: ':siteId/users/:userId',
        name: 'sites.users.user',
        component: User,
        props(route) {
            return route.params || {};
        },
    },
];
