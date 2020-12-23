<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="10"
            :loading="loading"
            class="elevation-1"
            @click:row="openDetailedView"
        ></v-data-table>
        <v-dialog v-model="dialog" width="700">
            <v-card>
                <v-card-title>
                    <v-spacer />
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col v-for="(column, i) in displayData" :key="i">
                            <v-list-item
                                two-line
                                v-for="(display, j) in column"
                                :key="j"
                            >
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="font-weight-medium property-title"
                                        :class="
                                            display.textColor
                                                ? display.textColor
                                                : ''
                                        "
                                        >{{
                                            display.value ? display.value : "-"
                                        }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle>{{
                                        display.label
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: "LogsTable",
    data() {
        return {
            selectedLog: {},
            dialog: false,
            columns: 2,
        };
    },
    methods: {
        openDetailedView(log) {
            this.selectedLog = log;
            this.dialog = true;
        },
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
        displayRef() {
            return [
                {
                    label: "Event No.",
                    value: this.selectedLog?.eventNumber,
                },
                {
                    label: "Date",
                    value: this.selectedLog?.createdAt,
                },
                {
                    label: "Activation Point",
                    value: this.selectedLog?.activationPoint,
                },
                {
                    label: "Respondent",
                    value: this.selectedLog?.respondent,
                },
                {
                    label: "Serial Number",
                    value: this.selectedLog?.serialNumber,
                },
                {
                    label: "Event Description",
                    value: this.selectedLog?.description,
                },
                {
                    label: "Type",
                    value: this.selectedLog?.eventType,
                },
                {
                    label: "Duration",
                    value: this.selectedLog?.duration,
                },
                {
                    label: "Activated By",
                    value: this.selectedLog?.activatedBy,
                },
                {
                    label: "OHS No.",
                    value: this.selectedLog?.ohsNumber,
                },
                {
                    label: "xBee64Bit Address",
                    value: this.selectedLog?.xBee64BitAddress,
                },
            ];
        },
    },
    props: {
        data: {
            required: true,
        },
        headers: {
            required: true,
        },
        loading: {
            required: true,
            default: false,
        },
    },
};
</script>
<style scoped>
.property-title {
    white-space: normal;
}
</style>