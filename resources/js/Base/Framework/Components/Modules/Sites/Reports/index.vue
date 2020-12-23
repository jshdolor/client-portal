<template>
    <v-container fluid>
        <v-row align="stretch" justify="space-between">
            <v-col class="text-right">
                <CreateReportModal></CreateReportModal>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="dataSrc"
                    :items-per-page="10"
                    :loading="isLoading"
                >
                    <template v-slot:item.fileLink="{ item }">
                        <v-btn
                            v-if="item.fileLink"
                            text
                            class="pa-0 font-weight-bold"
                            color="primary"
                            @click="
                                downloadAttachment(
                                    item.fileLink,
                                    item.fileExpiresIn
                                )
                            "
                            >Download</v-btn
                        >

                        <span v-else>-</span>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import CreateReportModal from "~/Framework/Components/Modals/Sites/Reports/CreateReport";
import ReportService from "~/Application/Services/Sites/Reports";

export default {
    name: "SiteReports",
    components: {
        CreateReportModal,
    },

    data() {
        return {
            headers: [
                { text: "Date", value: "createdAt" },
                { text: "Created By", value: "creatorEmail" },
                { text: "File", value: "fileLink" },
            ],
            dataSrc: [],
            isLoading: false,
            timeFetched: null,
        };
    },

    methods: {
        async getReports() {
            this.isLoading = true;
            this.dataSrc = await ReportService.setSiteId(this.siteId).getAll();
            this.timeFetched = new Date().getTime();
            this.isLoading = false;
        },
        downloadAttachment(downloadLink, expiresIn) {
            const expiringTime = new Date(this.timeFetched);

            expiringTime.setSeconds(expiringTime.getSeconds() + expiresIn);

            if (expiringTime > new Date().getTime()) {
                //not yet expired
                const link = document.createElement("a");
                link.setAttribute("href", downloadLink);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
                return;
            }

            this.$root.$emit("showMessage", "Link expired", true);
        },
    },

    computed: {
        siteId() {
            return this.$route.params.siteId;
        },
    },

    mounted() {
        this.getReports();
    },
};
</script>