const config = {
    userMenu: [
        {
            path: '/profile',
            icon: 'zmdi zmdi-account',
            label: 'View Profile',
            access: [true],
            reload: true,
        },
        {
            path: '/logout',
            icon: 'zmdi zmdi-time-restore',
            label: 'Logout',
            access: [true],
            reload: true,
        },
    ],
    appMenu: [
        {
            path: '/dashboard',
            icon: 'zmdi zmdi-home',
            label: 'Dashboard',
            access: [true],
            reload: true,
        },
        {
            path: '/employee',
            icon: 'zmdi zmdi-accounts',
            label: 'Employees',
            access: [
                window.access_id == 1,
                window.add_employee,
                window.remove_employee,
                window.edit_employee,
                window.view_employee,
            ],
            reload: true,
        },
        {
            path: '/distributor',
            icon: 'zmdi zmdi-truck',
            label: 'Distributors',
            access: [window.access_id <= 2],
            reload: true,
        },
        {
            path: '/sites',
            icon: 'zmdi zmdi-city-alt',
            label: 'Sites',
            access: [window.access_id <= 3],
            reload: false,
        },
        {
            path: '/site/map',
            icon: 'zmdi zmdi-map',
            label: 'Sites (Map)',
            access: [window.access_id <= 3],
            reload: true,
        },
        {
            path: '/node',
            icon: 'zmdi zmdi-device-hub',
            label: 'Devices',
            access: [window.access_id <= 3],
            reload: true,
        },
        {
            path: '/activiti',
            icon: 'zmdi zmdi-chart',
            label: 'Activities',
            access: [true],
            reload: true,
        },
        {
            path: '/tcu_app',
            icon: 'zmdi zmdi-case-play',
            label: 'TCU App / Google Play Services App',
            access: [window.access_id == 1, window.manage_tcu_app == 1],
            reload: true,
        },

        {
            path: '/jobs',
            icon: 'zmdi zmdi-format-list-bulleted',
            label: 'Queued Jobs',
            access: [window.access_id == 1],
            reload: true,
        },

        {
            path: '/sms_logs',
            icon: 'zmdi zmdi-code-smartphone',
            label: 'SMS Logs',
            access: [window.access_id == 1],
            reload: true,
        },

        {
            path: '/permissions',
            icon: 'zmdi zmdi-shield-security',
            label: 'Permissions',
            access: [window.access_id == 1],
            reload: true,
        },
    ],
};

module.exports = config;
