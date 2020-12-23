<template>
    <ListCard
        title="System Status"
        :listData="displayData"
        :titleSize="summary && summary.hasTcu ? 'large' : 'normal'"
    >
        <template v-slot:title-value v-if="summary && summary.hasTcu">
            <v-icon :size="61" :color="systemStatus.color">{{
                systemStatus.icon
            }}</v-icon>
            <div :class="systemStatus.color + '--text status-text '">
                {{ systemStatus.status }}
            </div>
        </template>
    </ListCard>
</template>
<script>
import SummaryMixin from "../SummaryMixin";
export default {
    name: "SystemStatusCard",
    mixins: [SummaryMixin],
    inject: ["siteData"],
    methods: {
        getTextColorFromSiteColumn(column, value = true) {
            return this.site[column] === value ? "green--text" : "red--text";
        },
    },
    computed: {
        site() {
            return this.siteData();
        },
        systemStatus() {
            return this.summary.systemStatus || {};
        },
        displayData() {
            const lastTCUCheckIn = this.site.siteCheckinTimeStatus
                ? `${this.site.status} (${this.site.updatedAt})`
                : this.site.updatedAt;

            return [
                {
                    title: `<span class='${this.getTextColorFromSiteColumn(
                        "siteCheckinTimeStatus"
                    )}'>${lastTCUCheckIn}</span>`,
                    subtitle: "Last TCU check-in",
                },
                {
                    title: `<span class='${this.getTextColorFromSiteColumn(
                        "lastPushNotificationCheck",
                        1
                    )}'>${this.site.check1Confirm}<span>`,
                    subtitle: "Last push notification check-in",
                },
                {
                    title: "TCU Software Version",
                    value: this.site.softwareVersion,
                },
            ];
        },
    },
};
</script>
<style>
.status-text {
    font-size: 25px !important;
    font-family: HelveticaNeueLight !important;
    line-height: normal;
}
</style>