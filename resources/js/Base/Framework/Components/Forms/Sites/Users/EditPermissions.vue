<template>
    <v-container>
        <v-form :disabled="isSubmitting">
            <v-row>
                <v-col sm="12" md="6">
                    <v-select
                        class="mt-4"
                        v-model="permissionPreset"
                        :items="permissionPresetValues"
                        :label="LABEL_PERMISSION_PRESET"
                        @change="setPresetPermissions"
                    >
                    </v-select>
                </v-col>
            </v-row>

            <v-list class="user-permission-list-container">
                <v-list-item-group v-model="userPermissions" multiple>
                    <template v-for="(permission, i) in permissions">
                        <v-list-item
                            :key="permission.name"
                            :value="permission.name"
                            :disabled="
                                disablePermissions ||
                                isPermissionDisabled(
                                    permission.siteDependencies
                                )
                            "
                        >
                            <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox
                                        :input-value="active"
                                        :name="permission.name"
                                        color="primary"
                                        :disabled="
                                            disablePermissions ||
                                            isPermissionDisabled(
                                                permission.siteDependencies
                                            )
                                        "
                                    ></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title
                                        class="label-permission"
                                        v-html="permission.label"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                        class="subtitle"
                                        v-html="permission.description"
                                    ></v-list-item-subtitle>
                                    <v-list-item-subtitle
                                        v-if="
                                            isPermissionDisabled(
                                                permission.siteDependencies
                                            )
                                        "
                                        class="subtitle red--text"
                                        v-html="permission.notes"
                                    ></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
            <v-row class="mt-4">
                <v-col class="red--text" cols="7" v-if="errorMessage !== ''">
                    {{ errorMessage }}
                </v-col>
                <v-col class="text-right">
                    <v-btn
                        class="vanguard-action-btn"
                        @click="submit"
                        :disabled="disableSubmit"
                        :loading="isSubmitting"
                        >Apply changes</v-btn
                    >
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import PermissionsService from "~/Application/Services/Permissions";
import { findParentByName } from "~/Framework/Helpers";
import SitesUsersService from "~/Application/Services/Sites/SitesUsersService";
import { allowedUsersPerSite } from "~/Application/Config";
import {
    LABEL_PERMISSION_PRESET,
    WARNING_WORKER_PERMISSION_PRESET,
    WARNING_ALLOWED_PRESET_USERID_1_50,
} from "~/Application/Constants";
import { SITES_USER_BASIC_INFO_UPDATE } from "~/Application/Constants/ErrorNS";

import UpdateUserRoleRequest from "~/Application/Services/Sites/Requests/UpdateUserRoleRequest";
import SiteDataMixin from "~/Framework/Components/Mixins/Site/Data";

export default {
    mixins: [SiteDataMixin],
    name: "EditPermissionsForm",
    data() {
        return {
            userPermissions: [],
            isSubmitting: false,
            permissionPresetValues: ["Manager", "Worker", "Custom"],
            LABEL_PERMISSION_PRESET,
            permissionPreset: "",
        };
    },
    inject: ["siteData"],
    props: {
        permissions: {
            required: true,
        },
    },
    methods: {
        isPermissionDisabled(dependencies) {
            if (dependencies) {
                return !dependencies
                    .map((dependency) => this.site[dependency])
                    .every((v) => v);
            }
            return false;
        },
        setPresetPermissions() {
            if (this.permissionPreset === "Custom") {
                return;
            }

            const disabledPermissions = {
                "view-tcu-status": "isReceiveTCUOfflineAlertsAllowed",
            };

            this.userPermissions = this.permissions
                .filter(
                    (permission) =>
                        permission.presetRoles.indexOf(
                            this.permissionPreset.toLowerCase()
                        ) > -1
                )
                .map((permission) => permission.name)
                .filter((permission) => {
                    if (disabledPermissions.hasOwnProperty(permission)) {
                        return this.site[disabledPermissions[permission]];
                    }
                    return true;
                });
        },
        async submitCustom() {
            try {
                await SitesUsersService.updatePermissions(
                    this.userId,
                    this.userPermissions
                );

                this.$root.$emit("showMessage", "Permissions Updated");
                this.parentModal.hide();
                await this.parentModule.getData();
            } catch (e) {
                console.log(e);
            }
        },
        async submitRole() {
            try {
                const request = new UpdateUserRoleRequest({
                    role: this.permissionPreset,
                });

                const createdData = await SitesUsersService.update(
                    this.userId,
                    request,
                    SITES_USER_BASIC_INFO_UPDATE
                );

                this.$root.$emit("showMessage", "Permissions Updated");

                this.parentModal.hide();
                await this.parentModule.getData();
            } catch (e) {
                console.log(e);
            }
        },
        async submit() {
            this.isSubmitting = true;
            if (this.permissionPreset === "Custom") {
                await this.submitCustom();
            } else {
                await this.submitRole();
            }
            this.isSubmitting = false;
        },
        getPermissionsByPreset(preset) {
            return this.permissions.filter((p) => {
                if (
                    p.name === "view-tcu-status" &&
                    !this.site.isReceiveTCUOfflineAlertsAllowed
                ) {
                    return false;
                }

                return (p.presetRoles || []).indexOf(preset) > -1;
            });
        },
    },
    watch: {
        currentPermissions: {
            immediate: true,
            handler(permissions) {
                //set permission preset
                this.userPermissions = (permissions || []).map(
                    (permission) => permission.name
                );

                const managerPermissions = this.getPermissionsByPreset(
                    "manager"
                );
                if (
                    managerPermissions.every(
                        (p) => this.userPermissions.indexOf(p.name) > -1
                    ) &&
                    this.userPermissions.length === managerPermissions.length
                ) {
                    this.permissionPreset = "Manager";
                    return;
                }

                const workerPermissions = this.getPermissionsByPreset("worker");
                if (
                    workerPermissions.every(
                        (p) => this.userPermissions.indexOf(p.name) > -1
                    ) &&
                    this.userPermissions.length === workerPermissions.length
                ) {
                    this.permissionPreset = "Worker";
                    return;
                }

                this.permissionPreset = "Custom";
            },
        },
    },
    computed: {
        parentModal() {
            return findParentByName(this, "EditPermissionsModal");
        },
        parentModule() {
            return findParentByName(this, "SitesUsersUserPage");
        },
        currentPermissions() {
            return this.$store.state.sitesUser.info?.permissions || [];
        },
        user() {
            return this.$store.state.sitesUser.info;
        },
        userId() {
            return this.$route.params.userId;
        },
        disablePermissions() {
            return this.permissionPreset !== "Custom";
        },
        disableSubmit() {
            return (
                this.permissionPreset !== "Worker" &&
                this.userId > allowedUsersPerSite
            );
        },
        errorMessage() {
            if (this.permissionPreset === "Worker") {
                return WARNING_WORKER_PERMISSION_PRESET;
            } else {
                if (this.userId > allowedUsersPerSite) {
                    return WARNING_ALLOWED_PRESET_USERID_1_50;
                }
            }

            return "";
        },
    },
    mounted() {
        this.parentModal.$on("close", () => {
            this.userPermissions = this.currentPermissions.map(
                (permission) => permission.name
            );
        });
    },
};
</script>

<style scoped>
.v-list-item--link:before {
    background: transparent;
}
.user-permission-list-container {
    max-height: 500px;
    overflow: scroll;
}
.v-list-item__action {
    margin-right: 10px !important;
    margin-top: 10px !important;
    align-self: flex-start;
}
.label-permission {
    font-size: 20px;
}
.subtitle {
    font-size: 14px;
    white-space: pre-line;
}
</style>