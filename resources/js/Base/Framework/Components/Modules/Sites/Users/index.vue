<template>
    <v-container fluid>
        <v-skeleton-loader type="table" v-if="dataLoading" />
        <v-row v-if="!dataLoading">
            <v-col cols="12" xl="4" md="4" sm="12">
                <v-text-field
                    v-model="search"
                    v-if="!dataLoading && this.users.length > 0"
                >
                    <template v-slot:label>
                        <v-icon style="vertical-align: middle"
                            >mdi-magnify</v-icon
                        >
                        Search Users
                    </template>
                </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right" xl="6" md="6" sm="12" cols="12">
                <ViewMapModal :markers="userMarkers"></ViewMapModal>
                <BulkUploadModal></BulkUploadModal>
                <CreateSitesUserModal></CreateSitesUserModal>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="users"
                    :search="search"
                    :loading="dataLoading"
                    table="site-users-table"
                    sort-by="userId"
                    :item-class="(item) => 'row-selectable'"
                    @click:row="goToUser"
                    v-if="!dataLoading && this.users.length > 0"
                >
                    <template v-slot:item.userId="{ item }">
                        {{ displayUserId(item.userId) }}
                    </template>

                    <template v-slot:item.permissions="{ item }">
                        {{ getPermissionPreset(item.permissions) }}
                    </template>
                    <template v-slot:item.locationService="{ item }">
                        <div style="width: 180px">
                            {{ item.locationService }}
                        </div>
                    </template>
                    <template
                        v-slot:item.receiveNCAcceceptDeclineSMS="{ item }"
                    >
                        <v-icon>{{
                            getConditionIcon(item.receiveNCAcceceptDeclineSMS)
                        }}</v-icon>
                    </template>

                    <template v-slot:item.receiveEvacNCSMS="{ item }">
                        <v-icon>{{
                            getConditionIcon(item.receiveEvacNCSMS)
                        }}</v-icon>
                    </template>

                    <template v-slot:item.receiveDevice="{ item }">
                        <v-icon>{{
                            getConditionIcon(item.receiveDevice)
                        }}</v-icon>
                    </template>

                    <template v-slot:item.receiveTCU="{ item }">
                        <v-icon>{{ getConditionIcon(item.receiveTCU) }}</v-icon>
                    </template>

                    <template v-slot:item.icon="{ item }">
                        <v-icon right>mdi-arrow-right</v-icon>
                    </template>
                </v-data-table>
            </v-col>
            <EmptyComponent
                message="No Users on Site"
                v-if="!dataLoading && this.users.length === 0"
            />
        </v-row>
    </v-container>
</template>


<script>
import SitesUserService from "~/Application/Services/Sites/SitesUsersService";
import SitesService from "~/Application/Services/Sites";
import PermissionsService from "~/Application/Services/Permissions";

import BaseSitesPage from "~/Framework/Components/Modules/Sites/BaseSites";

import CreateSitesUserModal from "~/Framework/Components/Modals/Sites/Users/CreateUser";
import ViewMapModal from "~/Framework/Components/Modals/Sites/Users/ViewMap";
import BulkUploadModal from "~/Framework/Components/Modals/Sites/Users/BulkUpload";

import EmptyComponent from "~/Framework/Components/Widgets/Empty";

export default {
    extends: BaseSitesPage,
    name: "SitesUsersPage",

    components: {
        CreateSitesUserModal,
        BulkUploadModal,
        ViewMapModal,
        EmptyComponent,
    },

    data() {
        return {
            headers: [
                { text: "User ID", value: "userId" },
                { text: "Name", value: "name" },
                {
                    text: "Permission Preset",
                    value: "permissions",
                },
                { text: "Position", value: "position" },
                { text: "Mobile Number", value: "mobile" },
                {
                    text: "Receive NC Accept/Decline SMS",
                    value: "receiveNCAcceceptDeclineSMS",
                },
                {
                    text: "Receive Evac/NC Alert SMS",
                    value: "receiveEvacNCSMS",
                },
                { text: "Receive TCU Offline SMS", value: "receiveTCU" },
                {
                    text: "Receive Device Disconnect SMS",
                    value: "receiveDevice",
                },
                {
                    text: "Location Service",
                    value: "locationService",
                },
                {
                    text: "Last Login",
                    value: "lastLogin",
                },
                { text: "", value: "icon", align: "end" },
            ],
            search: "",
            users: [],
            dataLoading: true,
            site: {},
            permissions: [],
        };
    },

    provide() {
        return {
            siteUsers: () => this.users,
            siteData: () => this.site,
        };
    },

    methods: {
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
        async getData() {
            this.dataLoading = true;
            try {
                this.permissions = await PermissionsService.getAll();
                this.users = await SitesUserService.setSiteId(
                    this.siteId
                ).getAll();

                this.site = await SitesService.get(this.siteId);
            } catch (e) {
                this.users = [];
            }

            this.dataLoading = false;
        },
        getConditionIcon(value) {
            return value
                ? "mdi-checkbox-marked-circle"
                : "mdi-checkbox-blank-circle-outline";
        },

        getPermissionPreset(permissions = []) {
            const userPermissions = permissions.map(
                (permission) => permission.name
            );

            const managerPermissions = this.getPermissionsByPreset("manager");
            if (
                managerPermissions.every(
                    (p) => userPermissions.indexOf(p.name) > -1
                ) &&
                userPermissions.length === managerPermissions.length
            ) {
                return "Manager";
            }

            const workerPermissions = this.getPermissionsByPreset("worker");
            if (
                workerPermissions.every(
                    (p) => userPermissions.indexOf(p.name) > -1
                ) &&
                userPermissions.length === workerPermissions.length
            ) {
                return "Worker";
            }
            return "Custom";
        },

        goToUser({ userId }) {
            this.$router.push({
                name: "sites.users.user",
                params: { userId },
            });
        },

        displayUserId(id) {
            return id.toString().padStart(2, "0");
        },
    },

    computed: {
        userMarkers() {
            return this.users
                .filter((user) => user.lastLocation)
                .map((user) => {
                    return {
                        name: user.name,
                        userId: user.userId,
                        location: user.lastLocation,
                    };
                });
        },
    },

    mounted() {
        this.getData();
    },
};
</script>