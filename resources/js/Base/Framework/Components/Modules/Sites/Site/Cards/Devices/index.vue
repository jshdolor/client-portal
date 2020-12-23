<template>
    <ListCard
        class="devices-summary-card"
        v-if="summary"
        title="Total Devices"
        :listData="displayData"
    >
        <template v-slot:title-value>{{ total }}</template>
    </ListCard>
</template>
<script>
import SummaryMixin from "../SummaryMixin";
import { valueWithIcon } from "~/Framework/Helpers/Component";

export default {
    name: "DevicesCard",
    mixins: [SummaryMixin],
    data() {
        return {
            iconTitleMap: {
                tcu: {
                    title: "TCU",
                    image: "/images/icons/ic_tablet.png",
                },
                ncTriggers: {
                    title: "Nurse Call triggers",
                    icon: "mdi mdi-plus-thick green--text",
                },
                ncSirens: {
                    title: "Nurse Call sirens",
                    icon: "mdi mdi-bullhorn green--text",
                },
                evacTriggers: {
                    title: "Evacuation triggers",
                    icon: "mdi mdi-run red--text",
                },
                evacSirens: {
                    title: "Evacuaction sirens",
                    icon: "mdi mdi-bullhorn red--text",
                },
                compactDevices: {
                    title: "Compact Devices",
                    image: "/images/icons/ic_type_10.png",
                },
            },
        };
    },
    methods: {
        titleWithIcon(key) {
            const data = this.iconTitleMap[key];

            let icon = data.image
                ? `<img src="${data.image}" />`
                : `<i class="${data.icon}"></i>`;

            return `
                <span>
                    ${icon} ${data.title}
                </span>
            `;
        },
    },
    computed: {
        total() {
            const summary = this.summary;
            return [
                summary.tcu,
                summary.nurseCallTriggers,
                summary.nurseCallSirens,
                summary.evacuationTriggers,
                summary.evacuationSirens,
                summary.compactDevices,
            ].reduce((a, b) => a + b, 0);
        },
        displayData() {
            const summary = this.summary;
            return [
                {
                    title: this.titleWithIcon("tcu"),
                    value: `<div class="text-vanguard-bold">${summary.tcu}</span>`,
                },
                {
                    title: this.titleWithIcon("ncTriggers"),
                    value: `<div class="text-vanguard-bold">${summary.nurseCallTriggers}</span>`,
                },
                {
                    title: this.titleWithIcon("ncSirens"),
                    value: `<div class="text-vanguard-bold">${summary.nurseCallSirens}</span>`,
                },
                {
                    title: this.titleWithIcon("evacTriggers"),
                    value: `<div class="text-vanguard-bold">${summary.evacuationTriggers}</span>`,
                },
                {
                    title: this.titleWithIcon("evacSirens"),
                    value: `<div class="text-vanguard-bold">${summary.evacuationSirens}</span>`,
                },
                {
                    title: this.titleWithIcon("compactDevices"),
                    value: `<div class="text-vanguard-bold">${summary.compactDevices}</span>`,
                },
            ];
        },
    },
};
</script>

<style>
.devices-summary-card img {
    height: 20px;
}
</style>