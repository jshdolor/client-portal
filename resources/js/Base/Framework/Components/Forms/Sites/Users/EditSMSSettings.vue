<template>
    <v-container>
        <v-form ref="form" :disabled="isSubmitting" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <v-checkbox
                        v-for="(settings, i) in smsSettings"
                        :key="i"
                        v-model="settings.value"
                        :disabled="settings.disabled"
                        class="custom-checkbox-tcu"
                    >
                        <template v-slot:label>
                            <div>
                                {{ settings.label }}
                                <div
                                    v-if="settings.disabled"
                                    class="red--text warning-message"
                                >
                                    {{ WARNING_SITE_HAS_NO_TCU }}
                                </div>
                            </div>
                        </template>
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-row class="mt-4">
                <v-spacer></v-spacer>
                <v-btn
                    class="vanguard-action-btn"
                    @click="submit"
                    :loading="isSubmitting"
                    >Apply changes</v-btn
                >
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import {
    LABEL_RECEIVE_TCU,
    LABEL_RECEIVE_EVAC_NC_SMS,
    LABEL_RECEIVE_DEVICE,
    LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS,
    WARNING_SITE_HAS_NO_TCU,
} from "~/Application/Constants";

import { SITES_USER_SMS_SETTINGS_UPDATE } from "~/Application/Constants/ErrorNS";
import UpdateSMSSettingsRequest from "~/Application/Services/Sites/Requests/UpdateSMSSettingsRequest";
import SitesUsersService from "~/Application/Services/Sites/SitesUsersService";
import BaseSitesPage from "~/Framework/Components/Modules/Sites/BaseSites";
import { findParentByName } from "~/Framework/Helpers";

export default {
    extends: BaseSitesPage,
    name: "EditSMSSettingsForm",
    inject: ["siteData"],
    data() {
        return {
            isSubmitting: false,

            userId: "",
            smsSettings: [
                {
                    field: "receiveNCAcceceptDeclineSMS",
                    value: false,
                    label: LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS,
                },
                {
                    field: "receiveEvacNCSMS",
                    value: false,
                    label: LABEL_RECEIVE_EVAC_NC_SMS,
                },
                {
                    field: "receiveTCU",
                    value: false,
                    label: LABEL_RECEIVE_TCU,
                    disabled: false,
                },
                {
                    field: "receiveDevice",
                    value: false,
                    label: LABEL_RECEIVE_DEVICE,
                },
            ],
            WARNING_SITE_HAS_NO_TCU,
        };
    },

    methods: {
        async submit() {
            this.isSubmitting = true;

            this.$store.dispatch("validation/setValidationErrors", {
                [SITES_USER_SMS_SETTINGS_UPDATE]: {},
            });

            try {
                const request = new UpdateSMSSettingsRequest(
                    this.prepareRequestData
                );
                const updatedData = await SitesUsersService.update(
                    this.userId,
                    request,
                    SITES_USER_SMS_SETTINGS_UPDATE
                );

                this.$root.$emit("showMessage", "User Updated");

                this.parentModal.hide();
                await this.parentModule.getData();
            } catch (e) {
                console.log(e);
            }

            this.isSubmitting = false;
        },

        getDefaults() {
            const {
                receiveDevice,
                receiveEvacNCSMS,
                receiveNCAcceceptDeclineSMS,
                receiveTCU,
                userId,
            } = this.$store.state.sitesUser?.info;

            this.smsSettings.find(
                (setting) => setting.field === "receiveDevice"
            ).value = receiveDevice;
            this.smsSettings.find(
                (setting) => setting.field === "receiveEvacNCSMS"
            ).value = receiveEvacNCSMS;
            this.smsSettings.find(
                (setting) => setting.field === "receiveNCAcceceptDeclineSMS"
            ).value = receiveNCAcceceptDeclineSMS;

            const receiveTCUValue = this.smsSettings.find(
                (setting) => setting.field === "receiveTCU"
            );

            receiveTCUValue.value =
                receiveTCU && this.site.isReceiveTCUOfflineAlertsAllowed;
            receiveTCUValue.disabled = !this.site
                .isReceiveTCUOfflineAlertsAllowed;

            this.userId = userId;
        },
    },

    computed: {
        prepareRequestData() {
            const objArr = this.smsSettings.map((setting) => {
                return {
                    [setting.field]: setting.value,
                };
            });

            let request = {};
            objArr.forEach((setting) => {
                request = { ...request, ...setting };
            });

            return request;
        },
        formErrors() {
            if (
                this.$store.state.validation.errors[
                    SITES_USER_SMS_SETTINGS_UPDATE
                ]
            ) {
                return this.$store.state.validation.errors[
                    SITES_USER_SMS_SETTINGS_UPDATE
                ];
            }
            return {};
        },

        parentModal() {
            return findParentByName(this, "EditSMSSettingsModal");
        },

        parentModule() {
            return findParentByName(this, "SitesUsersUserPage");
        },
        site() {
            return this.siteData();
        },
    },

    watch: {
        "parentModal.dialog": {
            immediate: true,
            handler() {
                this.getDefaults();
            },
        },
    },
};
</script>

<style scoped>
.warning-message {
    font-size: 12px;
}
</style>