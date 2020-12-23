<template>
    <v-dialog v-model="dialog" width="450" v-if="!hideModalBtn">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                :disabled="loading"
                small
                text
                ripple
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Edit SMS Settings</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <EditSMSSettingsForm></EditSMSSettingsForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import EditSMSSettingsForm from "~/Framework/Components/Forms/Sites/Users/EditSMSSettings";
import BaseModal from "~/Framework/Components/Modals/BaseModal";
import { allowedUsersPerSite } from "~/Application/Config";

export default {
    extends: BaseModal,
    name: "EditSMSSettingsModal",
    components: {
        EditSMSSettingsForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
    props: ["loading"],
    computed: {
        userId() {
            return this.$store.state.sitesUser?.info?.userId;
        },
        hideModalBtn() {
            if (!this.userId) {
                return true;
            }
            return this.userId > allowedUsersPerSite;
        },
    },
};
</script>