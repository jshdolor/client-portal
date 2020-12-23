export const permissionSiteDependencies = {
    'start-lockdowns': ['isInLockdown'],
    'end-lockdowns': ['isInLockdown'],
    'escalate-lockdowns': ['isGeofencing'],
    'geofenced-nurse-call-only': ['isGeofencing'],
    'geofenced-evacuations-only': ['isGeofencing'],
    'start-nurse-calls': ['isAllowedToStartNurseCalls'], //temporary
    'receive-relevant-nurse-call-accept-in-app-notifications': [
        'isAllowedToStartNurseCalls',
    ],
    'view-tcu-status': ['isReceiveTCUOfflineAlertsAllowed'],
};

export const permissionPresets = [
    {
        name: 'Manager',
        description:
            'Can start and receive all notifications for Site emergencies and perform other tasks through the smartphone apps',
    },
    {
        name: 'Worker',
        description:
            'Very limited access but can receive notifications for evacuations through the smartphone apps',
    },
];
