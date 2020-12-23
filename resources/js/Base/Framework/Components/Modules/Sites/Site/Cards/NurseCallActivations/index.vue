<template>
    <ListCard :listData="displayData">
        <template v-slot:title>
            <v-icon color="green">mdi-plus-thick</v-icon> Nurse Call activations
        </template>
        <template v-slot:title-value>
            {{ summary.nurseCallActivationsCurrentMonth }}
        </template>
        <template v-slot:subtitle>
            <div class="custom-card-list-subtitle">This month</div>
        </template>
    </ListCard>
</template>
<script>
export default {
    name: "NurseCallActivationsCard",
    inject: ["summaryData"],
    computed: {
        summary() {
            return this.summaryData();
        },
        displayData() {
            return [
                {
                    title: "Year to date",
                    value: `<div class="text-vanguard-bold">${this.summary.nurseCallActivationsYtd}</div>`,
                },
            ];
        },
    },
};
</script>