<template>
    <v-dialog v-model="dialog" width="900">
        <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="loading" icon ripple v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Edit Site</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <EditSiteForm />
            </v-card-text>
            <v-card-actions>
                <v-col class="text-right">
                    <v-btn class="vanguard-action-btn">Cancel</v-btn>
                    <v-btn class="vanguard-action-btn">Submit</v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import EditSiteForm from "~/Framework/Components/Forms/Sites/Site/EditSite";

export default {
    name: "EditSiteModal",
    components: {
        EditSiteForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
    props: ["loading"],
};
</script>