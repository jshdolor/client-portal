<template>
    <v-card>
        <v-card-title>
            <slot></slot>
        </v-card-title>
        <v-card-text class="bulk-modal-container">
            <v-row no-gutters>
                <v-col cols="12" class="bulk-upload-table-container">
                    <BulkCreateTable
                        v-on:dataFormatted="setBulkCreateData"
                        :users="users"
                        :loading="loading"
                        ref="table"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-row>
                <v-col class="text-right">
                    <v-btn
                        @click="$emit('stepBack')"
                        class="vanguard-action-btn"
                        >Back</v-btn
                    >
                    <v-btn
                        :disabled="hasDuplicateMobileNumber"
                        class="vanguard-action-btn"
                        @click="setSiteUsersData"
                        >Next</v-btn
                    >
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>
<script>
import BulkCreateTable from "~/Framework/Components/Modules/Sites/Users/Tables/BulkCreateTable";
import { headers } from "~/Application/Config/Sites/User/BulkCreate";
import CSVReader from "~/Infrastructure/File/CSVReader";
import { SiteUserBulkCreationTemplatePath } from "~/Application/Config";
import { findDuplicates } from "~/Framework/Helpers";

export default {
    name: "BulkUpload",
    components: {
        BulkCreateTable,
    },
    data() {
        return {
            headers,
            loading: false,
            bulkCreateData: [],
        };
    },
    inject: ["siteUsers"],
    methods: {
        setSiteUsersData() {
            this.$emit("siteUsersTable:setBulkSiteUsers", this.bulkCreateData);
        },
        setBulkCreateData(data) {
            this.bulkCreateData = data;
        },
        downloadCSVTemplate() {
            const anchor = document.createElement("a");
            anchor.setAttribute("href", SiteUserBulkCreationTemplatePath);
            anchor.setAttribute("download", "template.csv");
            anchor.click();
        },
        setErrors(errors = {}) {
            const rows = Object.keys(errors);
            const users = this.users.map((user, key) => {
                user.errors = {};
                if (rows.indexOf(key + 1)) {
                    let rowErrors = errors[key + 1] ?? [];
                    let compiledErrors = {};
                    for (let arr of rowErrors) {
                        compiledErrors = { ...compiledErrors, ...arr };
                    }
                    user.errors = compiledErrors;
                }
                return user;
            });
            this.$emit("SiteUserTable:setErrors", users);
            this.loading = false;
        },
        uploadFile() {
            this.$refs.fileInput.value = "";
            this.$refs.fileInput.click();
        },
        setUsersFromCsv(data) {
            this.users = data;
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
        setLoading(value) {
            this.loading = value;
        },
    },
    props: {
        users: {
            required: true,
            type: Array,
        },
        errors: {
            default: {},
        },
    },
    watch: {
        errors(err) {
            this.setErrors(err);
        },
        users(newVal, oldVal) {
            this.$refs.table.resetFilters();
        },
    },
    computed: {
        hasDuplicateMobileNumber() {
            const siteUsers = this.siteUsers() || [];
            const userMobileNumbers = [
                ...siteUsers,
                ...this.bulkCreateData,
            ].map((user) => user.mobile);
            return findDuplicates(userMobileNumbers).length > 0;
        },
    },
};
</script>

<style scoped>
.bulk-upload-table-container {
    overflow-y: auto;
    overflow-x: auto;
}
.bulk-upload-table {
    height: 100% !important;
}

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
</style>