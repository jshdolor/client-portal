<template>
    <CardActionDisplay
        title="Permissions"
        :loading="loading"
        class="permissions-card"
    >
        <template slot="action"
            ><EditPermissionsModal :loading="loading" />
        </template>

        <template slot="title">
            Permissions
            <v-chip
                class="permission-preset"
                v-if="permissionPreset"
                outlined
                label
                >{{ permissionPreset }}</v-chip
            >
        </template>

        <v-row
            v-if="!loading && permissions.length === 0"
            justify="center"
            align="center"
            class="no-permissions"
        >
            <v-col align="center">
                <h3>No Permissions</h3>
            </v-col>
        </v-row>

        <v-list-item two-line v-for="(value, key) of permissions" :key="key">
            <v-list-item-icon>
                <v-icon small>mdi-checkbox-marked-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="value-text">{{
                    value.label
                }}</v-list-item-title>
                <v-list-item-subtitle class="key-text">{{
                    value.description
                }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </CardActionDisplay>
</template>

<script>
import CardActionDisplay from "~/Framework/Components/Widgets/Card/ActionDisplayToolbar";
import EditPermissionsModal from "~/Framework/Components/Modals/Sites/Users/EditPermissions";
import PermissionsService from "~/Application/Services/Permissions";

export default {
    name: "PermissionsCard",
    components: {
        CardActionDisplay,
        EditPermissionsModal,
    },
    inject: ["siteData"],
    data() {
        return {
            allPermissions: [],
        };
    },
    methods: {
        getPermissionsByPreset(preset) {
            return this.allPermissions.filter((p) => {
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

    computed: {
        site() {
            return this.siteData();
        },
        permissionPreset() {
            if (
                (this.permissions || []).length === 0 ||
                this.allPermissions.length === 0
            ) {
                return false;
            }

            const userPermissions = (this.permissions || []).map(
                (permission) => permission.name
            );

            //set permission preset
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
        userInfo() {
            return this.$store.state.sitesUser?.info;
        },
        permissions() {
            return this.userInfo.permissions || false;
        },
        loading() {
            return (
                this.$store.state.sitesUser.info.userId !=
                this.$route.params.userId
            );
        },
    },
    async mounted() {
        this.allPermissions = await PermissionsService.getAll();
    },
};
</script>

<style scoped>
.value-text {
    font-size: 20px;
}

.key-text {
    font-size: 14px;
}

.no-permissions {
    height: 100%;
}

.permission-preset {
    font-family: HelveticaNeueLight;
}
</style>