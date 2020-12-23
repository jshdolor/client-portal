<template>
    <ListCard
        title="Configurations"
        :listData="displayData"
        titleSize="normal"
    />
</template>
<script>
export default {
    name: "ConfigurationsCard",
    inject: ["siteData"],
    methods: {
        notTruthyWrapper(value, displayText) {
            if (value) {
                return displayText ?? `<span>Enabled</span>`;
            }
            return '<span class="grey--text">Disabled</span>';
        },
    },
    computed: {
        site() {
            return this.siteData();
        },
        displayData() {
            return [
                {
                    title: "Geofencing",
                    value: this.notTruthyWrapper(this.site.isGeofencing),
                },
                {
                    title: "Lockdowns",
                    value: this.notTruthyWrapper(this.site.isInLockDown),
                },
                {
                    title: "Evacuation confirmation",
                    value: this.site.isEvacuationConfirmationRequired
                        ? "Required"
                        : `<span class="grey--text">Not required</span>`,
                },
                {
                    title: "TCU Admin PIN",
                    value: this.notTruthyWrapper(
                        this.site.isAdminPinEnabled,
                        this.site.adminPin
                    ),
                },
            ];
        },
    },
};
</script>