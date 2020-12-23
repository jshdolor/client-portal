<template>
    <ListCard
        title="Subscriptions"
        :listData="displayData"
        titleSize="normal"
    ></ListCard>
</template>

<script>
import SummaryMixin from "../SummaryMixin";
import SitesUserService from "~/Application/Services/Sites/SitesUsersService";
import permissionDescriptionMap from "~/Application/Constants/permissions.json";
import { allowedUsersPerSite } from "~/Application/Config";
const subscriptionNote =
    "To enable these features please speak to Vanguard Wireless about your software subscription";

export default {
    name: "SubscriptionsCard",
    mixins: [SummaryMixin],
    inject: ["siteData"],
    data() {
        return {
            hasStartNurseCallsViaApp: false,
            users: [],
            startNurseCallsPermission: {},
        };
    },
    computed: {
        displayData() {
            const data = [
                {
                    title: "Start Nurse Calls via App",
                    value: this.displayValueWithHTML(
                        this.hasStartNurseCallsViaApp
                    ),
                },
                {
                    title: "Worker Users",
                    value: this.displayValueWithHTML(this.site.hasWorkers),
                },
                {
                    title: "SMA",
                    value: `<span class="grey--text">${
                        this.site.projectStartFormatted ?? ""
                    } - ${this.site.projectEndFormatted ?? ""}</span>`,
                },
                {
                    title: "TCU SIM",
                    value: `<span class="grey--text">${
                        this.site.simStart ?? ""
                    } - ${this.site.simEnd ?? ""}</span>`,
                },
            ];

            const noSMA =
                !this.site.projectStartFormatted &&
                !this.site.projectEndFormatted;
            const noTCUSim = !this.site.simStart && !this.site.simEnd;

            const showWarningMessage =
                !this.site.hasWorkers ||
                !this.hasStartNurseCallsViaApp ||
                noSMA ||
                noTCUSim;

            if (showWarningMessage) {
                data.push({
                    subtitle: `<span class="red--text">${subscriptionNote}</span>`,
                });
            }

            return data;
        },
        site() {
            return this.siteData();
        },
    },
    methods: {
        displayValueWithHTML(value) {
            if (value) {
                return `<span class='green--text'>Enabled</span>`;
            }
            return `<span class='red--text'>Disabled</span>`;
        },
        async checkStartANurseCallViaAppPermission() {
            this.users = await SitesUserService.setSiteId(
                this.site.siteId
            ).getAll();

            this.startNurseCallsPermission =
                permissionDescriptionMap["start-nurse-calls"];

            this.hasStartNurseCallsViaApp =
                this.users.filter((user) => {
                    return user.permissions.find(
                        (permission) => permission.name === "start-nurse-calls"
                    );
                }).length > 0;
        },
    },
    mounted() {
        this.checkStartANurseCallViaAppPermission();
    },
};
</script>
72 1512
