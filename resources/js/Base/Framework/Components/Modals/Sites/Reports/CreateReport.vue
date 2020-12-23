<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                <div><v-icon small>mdi-plus</v-icon> Create Report</div>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Create report</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <CreateReportForm></CreateReportForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import BaseModal from "~/Framework/Components/Modals/BaseModal";
import CreateReportForm from "~/Framework/Components/Forms/Sites/Reports/Create";
export default {
    extends: BaseModal,
    name: "CreateReportModal",
    components: {
        CreateReportForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>