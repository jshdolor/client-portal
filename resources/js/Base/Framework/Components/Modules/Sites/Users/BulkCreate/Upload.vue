<template>
    <v-card>
        <v-card-title>
            <slot></slot>
        </v-card-title>
        <v-card-text class="bulk-modal-container">
            <v-row class="" @click="uploadFile">
                <v-col class="text-center">
                    <v-btn
                        class="upload-btn py-10 mt-5"
                        color="blue"
                        outlined
                        depressed
                    >
                        <v-icon size="70" class="">mdi-upload</v-icon>
                        <div class="upload-label">Upload CSV File</div>
                        <div
                            class="upload-note mt-3"
                            v-html="NOTE_UPLOAD_CSV"
                        ></div>
                    </v-btn>

                    <input
                        type="file"
                        ref="fileInput"
                        @change="processFile"
                        accept=".csv"
                        hidden
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn
                        outlined
                        color="default"
                        class="download-btn pa-5 mb-5"
                        @click="downloadCSVTemplate"
                        ><v-icon>mdi-download</v-icon>Download CSV template
                        file</v-btn
                    >
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import { headers } from "~/Application/Config/Sites/User/BulkCreate";
import CSVReader from "~/Infrastructure/File/CSVReader";
import { SiteUserBulkCreationTemplatePath } from "~/Application/Config";
import { NOTE_UPLOAD_CSV } from "~/Application/Constants";

export default {
    name: "BulkUpload",
    data() {
        return {
            headers,
            loading: false,
            bulkCreateData: [],
            NOTE_UPLOAD_CSV,
        };
    },
    methods: {
        downloadCSVTemplate() {
            const anchor = document.createElement("a");
            anchor.setAttribute("href", SiteUserBulkCreationTemplatePath);
            anchor.setAttribute("download", "template.csv");
            anchor.click();
        },
        uploadFile() {
            this.$refs.fileInput.value = "";
            this.$refs.fileInput.click();
        },
        setUsersFromCsv(data) {
            const usersWithTempKey = data.map((user, k) => {
                user.tempKey = k;
                return user;
            });
            this.$emit("bulkUpload:setBulkSiteUsers", usersWithTempKey);
        },
        processFile(e) {
            const file = e.target?.files[0];
            try {
                const reader = new CSVReader(
                    file,
                    this.headers,
                    this.setUsersFromCsv
                );
            } catch (e) {
                console.log("BulkUpload", e);
            }
        },
    },
};
</script>

<style scoped>
.upload-label {
    font-size: 28px;
    margin-top: 10px;
}

.download-btn {
    border-color: #1e88e5;
    color: #1e88e5 !important;
    text-transform: none !important;
    font-size: 14px !important;
}

.upload-note {
    max-width: 500px;
    white-space: pre-wrap;
}
</style>