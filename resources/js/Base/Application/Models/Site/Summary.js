import { titleCase } from '~/Framework/Helpers/String';

export const statusIconColorMap = {
    Ok: { color: 'green', icon: 'mdi-check-circle' },
    Good: { color: 'orange', icon: 'mdi-alert' },
    Warning: { color: 'red', icon: 'mdi-alert-circle' },
};

export default class SiteSummary {
    constructor(data = {}) {
        this._systemStatus = data.system_status;
        this._internetConnectionStabilityToday =
            data.internet_connection_stability;
        this._internetConnectionStabilityCurrentMonth =
            data.internet_connection_stability_current_month;
        this._nurseCallActivationsCurrentMonth =
            data.nurse_call_activations_current_month || 0;
        this._nurseCallActivationsYtd = data.nurse_call_activations_ytd || 0;
        this._evacuationsCurrentMonth = data.evacuations_current_month || 0;
        this._evacuationsYtd = data.evacuations_ytd || 0;
        this._totalSiteUsers = data.total_site_users || 0;
        this._totalNurseCallTriggersStandard =
            data.total_nurse_call_triggers_standard;
        this._totalNurseCallTriggersCellular =
            data.total_nurse_call_triggers_cellular;
        this._totalEvacuationTriggersStandard =
            data.total_evacuation_triggers_standard;
        this._totalEvacuationTriggersCellular =
            data.total_evacuation_triggers_cellular;
        this._totalNurseCallSirensStandard =
            data.total_nurse_call_sirens_standard;
        this._totalEvacuationSirensStandard =
            data.total_evacuation_sirens_standard;
        this._totalEvacuationSirensCellular =
            data.total_evacuation_sirens_cellular;
        this._totalCompactDevices = data.total_compact_devices;
        this._hasTcu = !!data.has_tcu;
    }

    get systemStatus() {
        const status = titleCase(this._systemStatus);
        const displayStatus = status === 'Ok' ? 'OK' : status;
        return {
            status: displayStatus,
            ...statusIconColorMap[status],
        };
    }
    get internetConnectionStabilityToday() {
        const status = titleCase(this._internetConnectionStabilityToday);
        const displayStatus = status === 'Ok' ? 'OK' : status;
        return {
            status: displayStatus,
            ...statusIconColorMap[status],
        };
    }
    get internetConnectionStabilityCurrentMonth() {
        const status = titleCase(this._internetConnectionStabilityCurrentMonth);
        const displayStatus = status === 'Ok' ? 'OK' : status;
        return {
            status: displayStatus,
            ...statusIconColorMap[status],
        };
    }
    get nurseCallActivationsCurrentMonth() {
        return this._nurseCallActivationsCurrentMonth;
    }
    get nurseCallActivationsYtd() {
        return this._nurseCallActivationsYtd;
    }
    get evacuationsCurrentMonth() {
        return this._evacuationsCurrentMonth;
    }
    get evacuationsYtd() {
        return this._evacuationsYtd;
    }
    get totalSiteUsers() {
        return this._totalSiteUsers;
    }
    get totalNurseCallTriggersStandard() {
        return this._totalNurseCallTriggersStandard;
    }
    get totalNurseCallTriggersCellular() {
        return this._totalNurseCallTriggersCellular;
    }
    get totalEvacuationTriggersStandard() {
        return this._totalEvacuationTriggersStandard;
    }
    get totalEvacuationTriggersCellular() {
        return this._totalEvacuationTriggersCellular;
    }
    get totalNurseCallSirensStandard() {
        return this._totalNurseCallSirensStandard;
    }
    get totalEvacuationSirensStandard() {
        return this._totalEvacuationSirensStandard;
    }
    get totalEvacuationSirensCellular() {
        return this._totalEvacuationSirensCellular;
    }
    get totalCompactDevices() {
        return this._totalCompactDevices;
    }
    get hasTcu() {
        return this._hasTcu;
    }

    get tcu() {
        return this.hasTcu ? 1 : 0;
    }
    get nurseCallTriggers() {
        const count =
            this.totalNurseCallTriggersStandard +
            this.totalNurseCallTriggersCellular;
        return count;
    }
    get nurseCallSirens() {
        return this.totalNurseCallSirensStandard;
    }
    get evacuationTriggers() {
        const count =
            this.totalEvacuationTriggersStandard +
            this.totalEvacuationTriggersCellular;
        return count;
    }
    get evacuationSirens() {
        const count =
            this.totalEvacuationSirensStandard +
            this.totalEvacuationSirensCellular;
        return count;
    }
    get compactDevices() {
        const count = this.totalCompactDevices;
        return count;
    }
}
