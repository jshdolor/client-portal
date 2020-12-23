<template>
    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <Filters
                    v-on:site:logs:filter="(f) => (filter = f)"
                    :init="isLoaded"
                    :filters="eventTypes"
                    label="Event Types"
                />
            </v-col>
            <v-col class="text-right" cols="6">
                <v-btn
                    @click="exportCSV"
                    class="vanguard-action-btn"
                    :loading="!isLoaded"
                >
                    <div><v-icon small>mdi-download</v-icon> Download</div>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <Table
                    :loading="!isLoaded"
                    :data="filteredLogs"
                    :headers="headers"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Filters from "./Filters";
import Table from "./Table";
import LogsService from "~/Application/Services/Sites/Logs";
import BaseSite from "~/Framework/Components/Modules/Sites/BaseSites";
import CSVExporter from "~/Infrastructure/File/CSVExporter";
import { format } from "date-fns";

export default {
    extends: BaseSite,
    name: "SiteLogs",

    components: {
        Filters,
        Table,
    },

    methods: {
        exportCSV() {
            const exporter = new CSVExporter({
                displayHeaders: this.headers.map((h) => h.text),
                headers: this.logHeaders.map((h) => h.value),
                data: this.filteredLogs,
            });
            const dateNow = format(new Date(), "dd_LL_yyyy");
            const fileName = `site_report_${this.siteId}_${dateNow}.csv`;
            exporter.export(fileName);
        },
    },

    data() {
        return {
            logs: [],
            filter: [],
            isLoaded: false,
            headers: [
                {
                    text: "Date",
                    value: "createdAt",
                },
                { text: "Event", value: "event" },
                { text: "Event Type", value: "eventType" },
                { text: "Activated By", value: "activatedBy" },
                { text: "Activation Point", value: "activationPoint" },
            ],
            logHeaders: [
                {
                    text: "Date",
                    value: "logCreatedAt",
                },
                { text: "Event", value: "event" },
                { text: "Event Type", value: "eventType" },
                { text: "Activated By", value: "activatedBy" },
                { text: "Activation Point", value: "activationPoint" },
            ],
        };
    },

    computed: {
        filteredLogs() {
            return this.logs.filter(
                (log) => this.filter.indexOf(log.eventType) > -1
            );
        },
        eventTypes() {
            return [...new Set(this.logs.map((log) => log.eventType))].sort();
        },
    },

    async mounted() {
        this.logs = await LogsService.setIgnoreCached()
            .setSiteId(this.siteId)
            .getAll();
        this.isLoaded = true;
    },
};
</script>