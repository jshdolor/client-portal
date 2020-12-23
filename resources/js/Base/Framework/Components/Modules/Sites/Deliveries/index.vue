<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="dataSrc"
            :items-per-page="5"
            :loading="isLoading"
        ></v-data-table>
    </v-container>
</template>

<script>
import DeliveryService from "~/Application/Services/Sites/DeliveryService";
import DatepickerOnMenu from "~/Framework/Components/Widgets/DatepickerOnMenu";

export default {
    name: "SiteDeliveries",
    components: {
        DatepickerOnMenu,
    },
    data() {
        return {
            headers: [
                { text: "Shipment Date", value: "shipmentDate" },
                { text: "Tracking Number", value: "trackingNumber" },
                { text: "Shipment Note", value: "shipmentNote" },
            ],
            dataSrc: [],
            isLoading: false,
        };
    },

    computed: {
        siteId() {
            return this.$route.params.siteId;
        },
    },

    async mounted() {
        this.isLoading = true;
        this.dataSrc = await DeliveryService.setSiteId(this.siteId).getAll();
        this.isLoading = false;
    },
};
</script>