import permissionDescriptionMap from '~/Application/Constants/permissions.json';
import { permissionSiteDependencies } from '~/Application/Config/Sites/User/Permissions';

class Permission {
    constructor(data = {}) {
        this._label = data.label;
        this._name = data.name;
    }

    get name() {
        return this._name;
    }

    get label() {
        return this._label;
    }

    get description() {
        if (permissionDescriptionMap[this._name]) {
            return permissionDescriptionMap[this._name].description;
        }
        return '';
    }

    get presetRoles() {
        if (permissionDescriptionMap[this._name]) {
            return permissionDescriptionMap[this._name].preset_role;
        }

        return [];
    }

    get notes() {
        if (permissionDescriptionMap[this._name]) {
            return permissionDescriptionMap[this._name].notes;
        }
        return '';
    }

    get siteDependencies() {
        return permissionSiteDependencies[this._name] ?? [];
    }
}

export default Permission;
