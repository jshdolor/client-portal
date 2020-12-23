<template>
    <v-row>
        <v-col v-for="(column, i) in displayData" :key="i">
            <v-list-item two-line v-for="(display, j) in column" :key="j">
                <v-list-item-content>
                    <v-list-item-title
                        class="font-weight-medium"
                        :class="display.textColor ? display.textColor : ''"
                        >{{
                            display.value ? display.value : "-"
                        }}</v-list-item-title
                    >
                    <v-list-item-subtitle
                        >{{ display.label }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="red--text"
                        >{{ display.notes }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-col>
    </v-row>
</template>

<script>
import SitesUserService from "~/Application/Services/Sites/SitesUsersService";
import permissionDescriptionMap from "~/Application/Constants/permissions.json";

export default {
    name: "SiteDataDisplay",
    props: {
        site: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            displayRef: [
                {
                    label: "Site ID",
                    value: this.site.siteId,
                },
                {
                    label: "Name",
                    value: this.site.name,
                },
                {
                    label: "Timezone",
                    value: this.site.timezone,
                },
                {
                    label: "Address",
                    value: this.site.address,
                },
                {
                    label: "Status",
                    value: this.site.status,
                    textColor:
                        this.site.status === "Active"
                            ? "green--text"
                            : "red--text",
                },
                {
                    label: "SIM Number",
                    value: this.site.simNumber,
                },
                {
                    label: "Software Version",
                    value: this.site.softwareVersion,
                },
                {
                    label: this.site.isInLockdown ? "Enabled" : "Disabled",
                    value: "Lockdown",
                },
                {
                    label: "TCU Check-in Time",
                    value: this.site.siteCheckinTimeStatus
                        ? `${this.site.status} (${this.site.updatedAt})`
                        : this.site.updatedAt,
                    textColor: this.site.siteCheckinTimeStatus
                        ? "green--text"
                        : "red--text ",
                },
                {
                    label: "Created by",
                    value: this.site.creator
                        ? `${this.site.creator.name} <${this.site.creator.email}>`
                        : "",
                },
                {
                    label: "Created on",
                    value: this.site.createdAt,
                },
                {
                    label: "Last push notification check-in time",
                    value: this.site.check1Confirm,
                    textColor:
                        this.site.lastPushNotificationCheck === 1
                            ? "green--text"
                            : "red--text",
                },

                {
                    label: this.site.isGeofencing ? "Enabled" : "Disabled",
                    value: "Geofencing",
                },
                {
                    label: "Max Users on Site",
                    value: this.site.userLimit,
                },
                {
                    label: this.site.isEvacuationConfirmationRequired
                        ? "Enabled"
                        : "Disabled",
                    value: "Evacuation Confirmation Required",
                },
            ],
            columns: 3,
            users: [],
        };
    },
    computed: {
        displayData() {
            const contentPerColumn = Math.ceil(
                this.displayRef.length / this.columns
            );

            const arr = new Array(this.columns).fill([]);

            return arr.map((v, i) => {
                return this.displayRef.filter((d, key) => {
                    return (
                        key < (i + 1) * contentPerColumn &&
                        key >= i * contentPerColumn
                    );
                });
            });
        },
    },
    methods: {
        async checkStartANurseCallViaAppPermission() {
            const users = await SitesUserService.setSiteId(
                this.site.siteId
            ).getAll();

            const hasStartANurseCallViaAppPermission =
                users
                    .map((user) => user.permissions)
                    .filter((permissions) => {
                        return (
                            permissions.filter(
                                (permission) =>
                                    permission.name === "start-nurse-calls"
                            ).length > 0
                        );
                    }).length > 0;

            const startNurseCallsPermission =
                permissionDescriptionMap["start-nurse-calls"];

            this.displayRef.push({
                label: hasStartANurseCallViaAppPermission
                    ? "Enabled"
                    : "Disabled",
                value: "Start a Nurse Call via App",
                notes: hasStartANurseCallViaAppPermission
                    ? ""
                    : startNurseCallsPermission.notes,
            });
        },
    },
    mounted() {
        this.checkStartANurseCallViaAppPermission();
    },
};
</script>

<style scoped>
.v-application .v-list-item__subtitle {
    white-space: normal !important;
}
</style>