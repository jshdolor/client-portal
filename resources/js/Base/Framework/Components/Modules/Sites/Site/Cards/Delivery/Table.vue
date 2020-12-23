<template>
    <v-data-table
        :headers="headers"
        :items="dataSrc"
        :items-per-page="5"
        :loading="isLoading"
    ></v-data-table>
</template>

<script>
import DeliveryService from "~/Application/Services/Sites/DeliveryService";

export default {
    name: "DeliveryDataDisplay",
    inject: ["siteData"],
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