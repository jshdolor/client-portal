<template>
    <v-dialog v-model="dialog" width="450">
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
                <span class="headline">Edit Basic Info</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <EditBasicInfoForm></EditBasicInfoForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import EditBasicInfoForm from "~/Framework/Components/Forms/Sites/Users/EditBasicInfo";

import BaseModal from "~/Framework/Components/Modals/BaseModal";

export default {
    extends: BaseModal,
    name: "EditBasicInfoModal",
    components: {
        EditBasicInfoForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
    props: ["loading"],
};
</script>