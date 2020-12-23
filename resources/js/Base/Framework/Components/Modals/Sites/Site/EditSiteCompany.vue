<template>
    <v-dialog v-model="dialog" width="450">
        <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="loading" icon ripple v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Edit Company & Contact Person</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text> <EditSiteCompanyDataForm /> </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import EditSiteCompanyDataForm from "~/Framework/Components/Forms/Sites/Site/EditCompanyData";

export default {
    name: "EditSiteCompanyModal",
    components: {
        EditSiteCompanyDataForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
    props: ["loading"],
};
</script>