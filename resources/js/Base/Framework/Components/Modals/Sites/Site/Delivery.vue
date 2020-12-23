<template>
    <v-dialog v-model="dialog" width="750">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                block
                class="pa-0"
                color="amber"
                text
                v-bind="attrs"
                v-on="on"
                :ripple="false"
            >
                <b>See All</b>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Deliveries</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text> <SiteDeliveryTable /> </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import SiteDeliveryTable from "~/Framework/Components/Modules/Sites/Site/Cards/Delivery/Table";
export default {
    name: "SiteDeliveryModal",
    components: {
        SiteDeliveryTable,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>