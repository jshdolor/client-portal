<template>
    <CardActionDisplay title="SMS Settings" :loading="loading">
        <v-list v-if="!loading">
            <v-list-item v-for="(value, i) in smsSettings" :key="i">
                <v-list-item-icon>
                    <v-icon small>{{ getConditionIcon(value) }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title
                        v-text="i"
                        class="value-text"
                    ></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template slot="action">
            <EditSMSSettingsModal :loading="loading"></EditSMSSettingsModal>
        </template>
    </CardActionDisplay>
</template>

<script>
import CardActionDisplay from "~/Framework/Components/Widgets/Card/ActionDisplayToolbar";
import EditSMSSettingsModal from "~/Framework/Components/Modals/Sites/Users/EditSMSSettings";

import {
    LABEL_RECEIVE_TCU,
    LABEL_RECEIVE_EVAC_NC_SMS,
    LABEL_RECEIVE_DEVICE,
    LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS,
} from "~/Application/Constants";

export default {
    name: "SMSSettingsCard",
    components: {
        CardActionDisplay,
        EditSMSSettingsModal,
    },
    data() {
        return {
            loading: true,
        };
    },

    watch: {
        info: {
            immediate: true,
            handler() {
                this.loading = Object.keys(this.info).length == 0;
            },
        },
    },

    methods: {
        getConditionIcon(value) {
            return value
                ? "mdi-checkbox-marked-circle"
                : "mdi-checkbox-blank-circle-outline";
        },
    },

    computed: {
        smsSettings() {
            return {
                [LABEL_RECEIVE_NC_ACCEPT_DECLINE_SMS]: this.info
                    .receiveNCAcceceptDeclineSMS,
                [LABEL_RECEIVE_EVAC_NC_SMS]: this.info.receiveEvacNCSMS,
                [LABEL_RECEIVE_TCU]: this.info.receiveTCU,
                [LABEL_RECEIVE_DEVICE]: this.info.receiveDevice,
            };
        },

        info() {
            return this.$store.state.sitesUser?.info;
        },
    },
};
</script>

<style scoped>
.value-text {
    font-size: 20px;
}
</style>