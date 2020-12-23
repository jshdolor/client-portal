<template>
    <ListCard :listData="displayData">
        <template v-slot:title>
            <v-icon color="red">mdi-run</v-icon> Evacuation activations
        </template>
        <template v-slot:title-value>
            {{ summary.evacuationsCurrentMonth }}
        </template>
        <template v-slot:subtitle>
            <div class="custom-card-list-subtitle">This month</div>
        </template>
    </ListCard>
</template>
<script>
import SummaryMixin from "../SummaryMixin";

export default {
    name: "EvacuationActivationsCard",
    mixins: [SummaryMixin],
    computed: {
        displayData() {
            return [
                {
                    title: "Year to date",
                    value: `<div class="text-vanguard-bold">${this.summary.evacuationsYtd}</div>`,
                },
            ];
        },
    },
};
</script>