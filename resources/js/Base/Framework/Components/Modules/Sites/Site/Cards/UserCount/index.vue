<template>
    <ListCard title="Users on system" :listData="displayData">
        <template v-slot:title-value>
            {{ summary.totalSiteUsers }}
        </template>
    </ListCard>
</template>
<script>
import SummaryMixin from "../SummaryMixin";

export default {
    name: "UserCountCard",
    mixins: [SummaryMixin],
    inject: ["siteData"],
    computed: {
        site() {
            return this.siteData();
        },
        displayData() {
            return [
                {
                    title: `<b class="pr-3">${this.availableSlots}</b> More Available`,
                },
            ];
        },
        availableSlots() {
            const summary = this.summary;
            const site = this.site;
            if (summary.totalSiteUsers > site.userLimit) return 0;
            return site.userLimit - summary.totalSiteUsers ?? 0;
        },
    },
};
</script>