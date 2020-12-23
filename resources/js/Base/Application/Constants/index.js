module.exports = {
    LABEL_RECEIVE_TCU: 'Receive TCU Offline Alerts',
    LABEL_RECEIVE_EVAC_NC_SMS: 'Receive Evacuation/Nurse Call Alerts',
    LABEL_RECEIVE_DEVICE: 'Receive Device Disconnected Alerts',
    LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS:
        'Receive Nurse Call Accept/Decline Alerts',
    LABEL_PERMISSION_PRESET: 'Permission Preset',

    LABEL_END_EVACUATIONS: 'End Evacuations',
    LABEL_END_EVACUATIONS_DESCRIPTION:
        'Allows Users to end a currently running evacuation through the smartphone apps',
    LABEL_RECEIVE_PUSH_NOTIFICATIONS: 'Receive Evacuation Push Notifications',
    LABEL_RECEIVE_PUSH_NOTIFICATIONS_DESCRIPTION:
        'Allows Users to receive push notifications related to evacuations on the smartphone apps',
    LABEL_START_EVACUATIONS: 'Start Evacuations',
    LABEL_START_EVACUATIONS_DESCRIPTION:
        'Allows Users to start an evacuation through the smartphone apps',

    MODAL_TITLE_RESEND_ONBOARDING_SMS: 'Resend Onboarding SMS',
    MODAL_BODY_RESEND_ONBOARDING_SMS: `
        The below SMS will be sent to this User:

        Welcome to Vanguard Wireless - your Safety Manager 2.0
Your site is <Site Name>. You can now login using your account:

Site ID: <Site ID>
User ID: <User ID>

Please download the app on Appstore for iOS
https://apps.apple.com/us/app/safety-manager-2-0/id1169956270

or Google Playstore for Android
https://play.google.com/store/apps/details?id=com.ua.vsecurity.vnc

Please follow this link for the onboarding resources and user guides:
www.vanguardwireless.com.au/user-guides
Password: Woke5

    `,
    WARNING_WORKER_PERMISSION_PRESET: `Note: Setting the permissions preset to Worker disables all SMS alerts`,
    NOTICE_WORKER_PERMISSION_PRESET: `Worker Permission Preset is only allowed for Sites with more than 50 allowed Users.
Contact Vanguard Wireless for more information.`,
    WARNING_ALLOWED_PRESET_USERID_1_50: `Manager and Custom permission presets are only allowed for
Users with ID 1 - 50`,
    NOTE_UPLOAD_CSV:
        'NOTE: you need to upload a bulk list of the same type of user profile - either manager or worker on the csv file upload page',
    MESSAGE_DELETE_SITE_USER: `Are you sure you want to delete %name%? This action is irreversible
and all this Site User's data will be removed.`,
    MESSAGE_SUCCESS_DELETE_SITE_USER: '%name% deleted',
    MESSAGE_SUCCESS_ONBOARDING_SMS_SENT: 'Onboarding SMS Sent',
    WARNING_SITE_HAS_NO_TCU: 'Only available to Sites with TCU',
};
