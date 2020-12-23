import { ucwords } from '~/Framework/Helpers';
import { formatDate, dateDiffWithTimezone } from '~/Framework/Helpers/Date';
import { dateFormat } from '~/Application/Config';
import { allowedUsersPerSite } from '~/Application/Config';

export default class Site {
    constructor(data = {}) {
        this._siteId = data.site_id;
        this._name = data.name;
        this._address = data.address;

        this._softwareVersion = data.app_version;
        this._googlePlayServicesVersion = data.gpservices_version;
        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
        this._xbeeServiceTimestamp = data.xbeeservice_timestamp;
        this._pushNotificationStatus = data.push_notification_status;
        this._check1Confirm = data.check1_confirm;
        this._check1Init = data.check1_init;
        this._status = data.status;
        this._xbeeServiceStatus = data.xbee_service_status;
        this._geofencing = data.geofencing;

        this._lat = data.lat;
        this._lng = data.lng;
        this._perimeter = data.perimeter;

        this._userLimit = data.contact_limit;

        this._timezone = data.site_timezone;
        this._simNumber = data.connection_number;
        this._serialNumber = data.serial_number;
        this._hardwareFilter = data.hardware_filter;
        this._missedDeviceUpdateTreshold = data.missed_device_update_threshold;

        //seconds
        this._missedCheckinThreshold =
            data.site_checkin_missed_threshold_seconds;

        this._address = [
            data.address_number,
            data.address_street,
            data.address_suburb,
            data.address_postcode,
            data.address_state,
        ].join(' ');

        this._addressData = {
            number: data.address_number,
            street: data.address_street,
            suburb: data.address_suburb,
            postalcode: data.address_postcode,
            state: data.address_state,
        };

        this._creator = data.creator;
        this._distributor = data.assigned_distributor;
        this._lockdown = data.lockdown;

        //
        this._secondsBeforeInactive = 16 * 60;

        this._projectStart = data.project_start;
        this._projectEnd = data.project_finish;
        this._smaStart = data.project_start;
        this._smaEnd = data.project_finish;

        this._isAdminPinEnabled = data.admin_pin_enabled;
        this._adminPin = data.admin_pin;
        this._isEvacuationConfirmationRequired =
            data.evacuation_acknowledgment_required;

        this._companyName = data.company_name;
        this._companyJobTitle = data.company_job_title;
        this._companyPersonName = data.contact_person_name;
        this._companyPersonEmail = data.contact_person_email;
        this._companyPersonMobile = data.contact_person_mobile;
        this._companyPersonLandline = data.contact_person_landline;

        this._tcuType = data.tcu_type;

        this._simStart = data.sim_start;
        this._simEnd = data.sim_end;
    }

    get company() {
        return {
            name: this._companyName,
            jobTitle: this._companyJobTitle,
            contactPerson: this._companyPersonName,
            personEmail: this._companyPersonEmail,
            personMobile: this._companyPersonMobile,
            personLandline: this._companyPersonLandline,
        };
    }

    set projectStart(value) {
        return (this._projectStart = value);
    }

    set projectEnd(value) {
        return (this._projectEnd = value);
    }

    set isInLockdown(value) {
        this._lockdown = value;
    }

    set name(value) {
        this._name = value;
    }

    set address(value) {
        this._address = value;
    }

    set isGeofencing(value) {
        this._geofencing = value;
    }

    set isAdminPinEnabled(value) {
        this._isAdminPinEnabled = value;
    }

    set isEvacuationConfirmationRequired(value) {
        this._isEvacuationConfirmationRequired = value;
    }
    //
    get addressData() {
        return this._addressData;
    }

    get isEvacuationConfirmationRequired() {
        return !!this._isEvacuationConfirmationRequired;
    }

    get isAdminPinEnabled() {
        return !!this._isAdminPinEnabled;
    }

    get projectStart() {
        return formatDate(this._projectStart, 'dd/LL/yyyy');
    }

    get projectEnd() {
        return formatDate(this._projectEnd, 'dd/LL/yyyy');
    }

    get projectStartFormatted() {
        return formatDate(this._projectStart, 'dd/LL/yyyy');
    }

    get projectEndFormatted() {
        return formatDate(this._projectEnd, 'dd/LL/yyyy');
    }

    get isInLockdown() {
        return !!this._lockdown;
    }

    get distributor() {
        return this._distributor;
    }

    get creator() {
        return this._creator;
    }

    get lastPushNotificationCheck() {
        if (this.check1Init) {
            const secondsIntervalInit = dateDiffWithTimezone(
                this._check1Init,
                null,
                this.timezone
            );
            //more than or exactly 16 minutes lambda hasn't initiated push check notif yet, check lambda if running
            //or init new than confirm

            if (secondsIntervalInit >= this._secondsBeforeInactive) {
                return -1;
            }

            if (!this.check1Confirm) {
                return 0;
            }

            if (this.check1Init > this.check1Confirm) {
                return 0;
            }

            const secondsIntervalConfirm = dateDiffWithTimezone(
                this._check1Confirm,
                null,
                this.timezone
            );

            //more than or exactly 16 minutes since check1 initiated and check1 hasn't confirmed yet
            //check1_init and check1_confirm is within 16mins
            return secondsIntervalConfirm >= this._secondsBeforeInactive
                ? 0
                : 1;
        }
        //check1 never happened
        return -2;
    }

    get siteCheckinTimeStatus() {
        return (
            dateDiffWithTimezone(this._updatedAt, null, this.timezone) <
            this._secondsBeforeInactive
        );
    }

    get xbeeCheckinTimeStatus() {
        return (
            dateDiffWithTimezone(
                this._xbeeServiceTimestamp,
                null,
                this.timezone
            ) < this._secondsBeforeInactive
        );
    }

    get missedCheckinThreshold() {
        return this._missedCheckinThreshold;
    }

    get missedDeviceUpdateTreshold() {
        return this._missedDeviceUpdateTreshold;
    }

    get hardwareFilter() {
        return this._hardwareFilter;
    }

    get serialNumber() {
        return this._serialNumber;
    }

    get simNumber() {
        return this._simNumber;
    }

    get timezone() {
        return this._timezone || 'Australia/Sydney';
    }

    get isGeofencing() {
        return !!this._geofencing;
    }

    get userLimit() {
        return this._userLimit;
    }

    get siteId() {
        return this._siteId;
    }
    get name() {
        return this._name;
    }
    get companyName() {
        return this._companyName;
    }
    get address() {
        return this._address;
    }
    get softwareVersion() {
        return this._softwareVersion;
    }
    get googlePlayServicesVersion() {
        return this._googlePlayServicesVersion;
    }

    get createdAt() {
        return formatDate(this._createdAt, dateFormat);
    }
    get updatedAt() {
        if (this.emptyTimestamps) {
            return null;
        }
        return formatDate(this._updatedAt, dateFormat);
    }
    get xbeeServiceTimestamp() {
        return formatDate(this._xbeeServiceTimestamp, dateFormat);
    }
    get check1Confirm() {
        if (this.emptyTimestamps) {
            return null;
        }
        return formatDate(this._check1Confirm, 'dd/LL/yyyy kk:mm:ss');
    }

    get check1Init() {
        return formatDate(this._check1Init, 'dd/LL/yyyy kk:mm:ss');
    }

    get xbeeServiceStatus() {
        return this._xbeeServiceStatus;
    }
    get pushNotificationStatus() {
        return this._pushNotificationStatus;
    }

    get status() {
        return ucwords(this._status);
    }

    get lat() {
        return this._lat;
    }

    get lng() {
        return this._lng;
    }

    get perimeter() {
        try {
            return JSON.parse(this._perimeter);
        } catch (e) {
            return {};
        }
    }

    //

    get polygonPerimeter() {
        return (
            this.perimeter?.geometry?.coordinates[0] || []
        ).map((coordinate) => coordinate.reverse());
    }

    get coordinates() {
        return [this._lat, this._lng];
    }

    get hasCoordinates() {
        return !!(this._lat && this._lng);
    }

    get hasPerimeter() {
        return !!this._perimeter;
    }

    get tcuType() {
        return this._tcuType;
    }

    get emptyTimestamps() {
        return this._tcuType === 'none';
    }

    get isReceiveTCUOfflineAlertsAllowed() {
        return this._tcuType !== 'none';
    }

    get simStart() {
        return formatDate(this._simStart, 'dd/LL/yyyy');
    }

    get simEnd() {
        return formatDate(this._simEnd, 'dd/LL/yyyy');
    }

    get hasWorkers() {
        return this.userLimit > allowedUsersPerSite;
    }

    get adminPin() {
        return this._adminPin;
    }
}
