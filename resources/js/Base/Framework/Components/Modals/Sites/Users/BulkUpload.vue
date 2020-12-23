<template>
    <v-dialog v-model="dialog" :max-width="modalSize">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                Bulk Upload
            </v-btn>
        </template>
        <v-stepper v-model="step" class="no-transition">
            <v-stepper-items>
                <v-stepper-content step="1">
                    <BulkUpload v-on:bulkUpload:setBulkSiteUsers="setSiteUsers">
                        <span class="card-toolbar-title">Bulk Upload</span>
                        <v-spacer />
                        <v-btn icon @click="resetComponent">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </BulkUpload>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <SiteUsersTable
                        :users="siteUsers"
                        :errors="errors"
                        v-on:siteUsersTable:setBulkSiteUsers="setSiteUsers"
                        v-on:SiteUserTable:setErrors="
                            (usr) => (siteUsers = usr)
                        "
                        v-on:stepBack="setStep(1, () => (siteUsers = []))"
                    >
                        <span class="card-toolbar-title"
                            >Create multiple Site Users</span
                        >
                        <v-spacer />
                        <v-btn icon :disabled="loading" @click="resetComponent">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </SiteUsersTable>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <RoleSelection v-on:roleSelection:roleSelect="setRole">
                        <span class="card-toolbar-title"
                            >Select role for the Site Users</span
                        >
                        <v-spacer />
                        <v-btn :disabled="loading" icon @click="resetComponent">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <template slot="actions">
                            <v-container>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="6"
                                        class="align-self-center"
                                    >
                                        <span
                                            class="warning-message error--text"
                                            v-if="warningMessage"
                                            v-html="warningMessage"
                                        />
                                    </v-col>
                                    <v-col
                                        md="6"
                                        class="text-right align-self-end"
                                    >
                                        <v-btn
                                            @click="setStep(2)"
                                            :disabled="loading"
                                            class="vanguard-action-btn"
                                            >Back</v-btn
                                        >
                                        <BulkCreateButton
                                            :permissionPreset="permissionPreset"
                                            :users="siteUsers"
                                            v-on:errors="setErrors"
                                            v-on:bulk:submitting="setLoading"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>
                    </RoleSelection>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <!-- v-on:bulk:submitting="setLoading" -->
    </v-dialog>
</template>

<script>
import BaseModal from "~/Framework/Components/Modals/BaseModal";

import BulkUpload from "~/Framework/Components/Modules/Sites/Users/BulkCreate/Upload";
import SiteUsersTable from "~/Framework/Components/Modules/Sites/Users/BulkCreate/SiteUsersTable";
import RoleSelection from "~/Framework/Components/Modules/Sites/Users/BulkCreate/RoleSelection";

import BulkCreateButton from "~/Framework/Components/Modules/Sites/Users/BulkUpload";
import { findParentByName } from "~/Framework/Helpers";
import { allowedUsersPerSite } from "~/Application/Config";

import {
    LABEL_PERMISSION_PRESET,
    NOTICE_WORKER_PERMISSION_PRESET,
    WARNING_WORKER_PERMISSION_PRESET,
} from "~/Application/Constants";

export default {
    extends: BaseModal,
    name: "BulkUploadModal",
    components: {
        BulkUpload,
        SiteUsersTable,
        RoleSelection,
        BulkCreateButton,
    },
    data() {
        return {
            dialog: false,
            loading: false,
            siteUsers: [],
            permissionPreset: "",
            step: 1,
            errors: {},
        };
    },
    computed: {
        modalSize() {
            const stepModalSizeMap = [697, 1200, 1200];
            return stepModalSizeMap[this.step - 1];
        },
        parentModule() {
            return findParentByName(this, "SitesUsersPage");
        },
        userLimit() {
            return this.parentModule?.site?.userLimit || 0;
        },
        workerPresetNotAvailable() {
            return (
                this.permissionPreset === "Worker" &&
                this.userLimit <= allowedUsersPerSite
            );
        },
        warningMessage() {
            if (this.workerPresetNotAvailable) {
                return (
                    NOTICE_WORKER_PERMISSION_PRESET +
                    "<br>" +
                    WARNING_WORKER_PERMISSION_PRESET
                );
            }

            if (this.permissionPreset === "Worker") {
                return WARNING_WORKER_PERMISSION_PRESET;
            }

            return null;
        },
    },
    methods: {
        setLoading(value) {
            this.loading = value;
        },
        setSiteUsers(value) {
            this.siteUsers = value;
            this.step = this.step + 1;
        },
        resetComponent() {
            this.siteUsers = [];
            this.step = 1;
            this.dialog = false;
        },
        setErrors(errors) {
            this.errors = errors;
            if (this.dialog) {
                this.step = 2;
            }
        },
        setRole(role) {
            this.permissionPreset = role;
        },
        setStep(step, cb = () => {}) {
            this.step = step;
            cb();
        },
    },
    watch: {
        dialog(value) {
            if (!value) {
                this.resetComponent();
            }
        },
    },
};
</script>

<style scoped>
.v-stepper__content {
    padding: 0;
}

.no-transition .stepper__content {
    transition: none;
}

.card-toolbar-title {
    font-family: HelveticaNeueBold;
    font-size: 20px;
}

.warning-message {
    font-size: 14px;
}
</style>
