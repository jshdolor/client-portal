const config = {
    menu: [
        // {
        //     path: '/profile',
        //     icon: 'mdi-account-circle',
        //     label: 'Profile',
        // },
        {
            path: '/sites',
            icon: 'mdi-domain',
            label: 'Sites',
            nav: [
                {
                    name: 'sites.site',
                    label: 'Summary',
                },
                // {
                //     name: 'sites.tcu',
                //     label: 'TCU',
                // },
                {
                    name: 'sites.devices',
                    label: 'devices',
                },
                // {
                //     name: 'sites.logs',
                //     label: 'logs',
                // },
                {
                    name: 'sites.logs',
                    label: 'logs',
                },
                {
                    name: 'sites.users',
                    label: 'users',
                },
                {
                    name: 'sites.reports',
                    label: 'reports',
                },
                {
                    name: 'sites.company-contact-info',
                    label: 'company & contact person',
                },
                {
                    name: 'sites.delivery',
                    label: 'delivery',
                },
            ],
        },
        // {
        //     path: '/logout',
        //     icon: 'mdi-logout',
        //     label: 'Logout',
        // },
    ],
};

module.exports = config;
