<template>
    <v-container>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-form :disabled="isSubmitting" lazy-validation autocomplete="off">
                <input hidden />
                <v-row>
                    <v-col cols="12" md="4" sm="12">
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Name"
                            rules="required"
                        >
                            <v-text-field
                                v-model="form.name"
                                label="Name"
                                :error-messages="formErrors.name || errors"
                                :autocomplete="random()"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Position"
                            rules="required"
                        >
                            <v-text-field
                                v-model="form.position"
                                label="Position"
                                :error-messages="formErrors.position || errors"
                                :autocomplete="random()"
                                required
                            ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Mobile Number"
                            rules="required"
                        >
                            <v-text-field
                                label="Mobile Number"
                                v-model="form.mobile"
                                :error-messages="
                                    internalErrors.mobile ||
                                    formErrors.mobile ||
                                    errors
                                "
                                :autocomplete="random()"
                                @keyup="(e) => checkDuplicates(e.target.value)"
                                required
                            ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Password"
                            rules="required"
                        >
                            <v-text-field
                                label="Password"
                                :type="!showAsPassword ? 'text' : 'password'"
                                :error-messages="formErrors.password || errors"
                                v-model="form.password"
                                @click:append="showAsPassword = !showAsPassword"
                                autocomplete="new-password"
                                required
                                :append-icon="
                                    !showAsPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
                    <v-col sm="12" md="4" cols="12" class="pl-2 pr-2">
                        <v-select
                            class="mt-4"
                            v-model="form.permissionPreset"
                            :items="permissionPresetValues"
                            :label="LABEL_PERMISSION_PRESET"
                        >
                        </v-select>
                    </v-col>
                    <v-col sm="12" md="4" cols="12">
                        <div class="vanguard-title">SMS Settings</div>
                        <v-checkbox
                            v-model="form.receiveNCAcceceptDeclineSMS"
                            :label="LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS"
                            :disabled="disableSMSSettings"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="form.receiveEvacNCSMS"
                            :label="LABEL_RECEIVE_EVAC_NC_SMS"
                            :disabled="disableSMSSettings"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="form.receiveTCU"
                            :disabled="
                                disableSMSSettings ||
                                !site.isReceiveTCUOfflineAlertsAllowed
                            "
                            class="custom-checkbox-tcu"
                        >
                            <template v-slot:label>
                                <div>
                                    {{ LABEL_RECEIVE_TCU }}
                                    <div
                                        v-if="
                                            !site.isReceiveTCUOfflineAlertsAllowed
                                        "
                                        class="red--text warning-no-tcu-message"
                                    >
                                        {{ WARNING_SITE_HAS_NO_TCU }}
                                    </div>
                                </div>
                            </template>
                        </v-checkbox>
                        <v-checkbox
                            v-model="form.receiveDevice"
                            :label="LABEL_RECEIVE_DEVICE"
                            :disabled="disableSMSSettings"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col sm="12" md="6" cols="12">
                        <span
                            class="error--text"
                            v-if="workerPresetNotAvailable"
                        >
                            {{ NOTICE_WORKER_PERMISSION_PRESET }}
                        </span>
                    </v-col>
                    <v-col sm="12" md="6" cols="12" class="text-right">
                        <v-btn
                            @click="submit"
                            class="vanguard-action-btn"
                            :loading="isSubmitting"
                            :disabled="formDisabled"
                            >FINISH</v-btn
                        >
                    </v-col>
                </v-row>
            </v-form>
        </ValidationObserver>
    </v-container>
</template>

<script>
import {
    LABEL_RECEIVE_TCU,
    LABEL_RECEIVE_EVAC_NC_SMS,
    LABEL_RECEIVE_DEVICE,
    LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS,
    LABEL_PERMISSION_PRESET,
    NOTICE_WORKER_PERMISSION_PRESET,
    WARNING_SITE_HAS_NO_TCU,
} from "~/Application/Constants";

import { SITES_USER_CREATION } from "~/Application/Constants/ErrorNS";

import CreateSiteUserRequest from "~/Application/Services/Sites/Requests/CreateSiteUserRequest";
import SiteUsersService from "~/Application/Services/Sites/SitesUsersService";
import { findParentByName } from "~/Framework/Helpers";
import { allowedUsersPerSite } from "~/Application/Config";

export default {
    name: "CreateUserForm",
    data() {
        return {
            isSubmitting: false,
            internalErrors: {},
            form: {
                name: "",
                position: "",
                mobile: "",
                password: "",
                receiveTCU: true,
                receiveEvacNCSMS: true,
                receiveDevice: true,
                receiveNCAcceceptDeclineSMS: true,
                permissionPreset: "Manager",
            },
            initialForm: {
                name: "",
                position: "",
                mobile: "",
                password: "",
                receiveTCU: false,
                receiveEvacNCSMS: false,
                receiveDevice: false,
                receiveNCAcceceptDeclineSMS: false,
                permissionPreset: "Manager",
            },
            permissionPresetValues: ["Manager", "Worker"],
            showAsPassword: true,
            LABEL_RECEIVE_TCU,
            LABEL_RECEIVE_EVAC_NC_SMS,
            LABEL_RECEIVE_DEVICE,
            LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS,
            LABEL_PERMISSION_PRESET,
            NOTICE_WORKER_PERMISSION_PRESET,
            WARNING_SITE_HAS_NO_TCU,
        };
    },

    methods: {
        async submit() {
            this.isSubmitting = true;

            this.$store.dispatch("validation/setValidationErrors", {
                [SITES_USER_CREATION]: {},
            });

            try {
                const proceed = await this.$refs.observer.validate();
                if (proceed && Object.keys(this.internalErrors).length === 0) {
                    const request = new CreateSiteUserRequest(this.form);
                    const createdData = await SiteUsersService.create(
                        request,
                        SITES_USER_CREATION
                    );

                    this.$root.$emit("showMessage", "User Created");
                    this.reset();

                    this.parentModal.hide();
                    await this.parentModule.getData();

                    this.$router.push({
                        name: "sites.users.user",
                        params: { userId: createdData.userId },
                    });
                }
            } catch (e) {
                console.log(e);
            }

            this.isSubmitting = false;
        },

        reset() {
            this.$refs.observer.reset();
            this.form = this.initialForm;
        },

        random() {
            return `id-${Math.random()}`;
        },

        checkDuplicates(value) {
            const siteUsers = this.siteUsers() || [];

            const mobileNumbers = siteUsers.map((user) => user.mobile);
            const hasSameValue = mobileNumbers.indexOf(value) !== -1;

            if (hasSameValue) {
                this.internalErrors = { mobile: "Mobile Number not unique" };
                return;
            }
            this.internalErrors = {};
        },
    },

    inject: ["siteUsers", "siteData"],

    watch: {
        "form.permissionPreset": {
            handler(value) {
                const allowSMSSettings = value === "Manager";

                this.form.receiveTCU = false;
                this.form.receiveEvacNCSMS = allowSMSSettings;
                this.form.receiveDevice = false;
                this.form.receiveNCAcceceptDeclineSMS = allowSMSSettings;
            },
            immediate: true,
        },
    },

    computed: {
        formErrors() {
            if (this.$store.state.validation.errors[SITES_USER_CREATION]) {
                return this.$store.state.validation.errors[SITES_USER_CREATION];
            }
            return {};
        },
        disableSMSSettings() {
            return this.form.permissionPreset === "Worker";
        },
        parentModule() {
            return findParentByName(this, "SitesUsersPage");
        },
        parentModal() {
            return findParentByName(this, "CreateSitesUserModal");
        },

        userLimit() {
            return this.parentModule?.site?.userLimit || 0;
        },
        workerPresetNotAvailable() {
            return (
                this.form.permissionPreset === "Worker" &&
                this.userLimit <= allowedUsersPerSite
            );
        },
        formDisabled() {
            return this.isSubmitting || this.workerPresetNotAvailable;
        },
        site() {
            return this.siteData() || {};
        },
    },
};
</script>

<style>
.custom-checkbox-tcu .v-input__slot {
    align-items: normal !important;
}
.warning-no-tcu-message {
    font-size: 12px;
}
</style>