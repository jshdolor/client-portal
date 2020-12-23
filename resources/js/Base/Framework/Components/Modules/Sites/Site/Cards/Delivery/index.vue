<template>
    <ListCard
        class="delivery-summary-card"
        title="Delivery"
        :listData="displayData"
    >
        <template v-slot:list-footer>
            <v-row no-gutters v-if="displayData.length > 0">
                <v-col class="see-all pa-0 text-center">
                    <SiteDeliveryModal />
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col class="pa-2 text-center"> No Data </v-col>
            </v-row>
        </template>
    </ListCard>
</template>
<script>
import SiteDeliveryModal from "~/Framework/Components/Modals/Sites/Site/Delivery";
import DeliveryService from "~/Application/Services/Sites/DeliveryService";

export default {
    name: "DeliveryCard",
    components: {
        SiteDeliveryModal,
    },
    data() {
        return {
            deliveries: [],
        };
    },
    computed: {
        displayData() {
            if (this.deliveries.length === 0) {
                return [];
            }

            const firstRow = this.deliveries[0];
            return [
                {
                    title: firstRow.shipmentDate,
                    subtitle: "Shipment date",
                },
                {
                    title: firstRow.trackingNumber,
                    subtitle: "Tracking number",
                },
                {
                    title: firstRow.shipmentNote,
                    subtitle: "Shipment note",
                },
            ];
        },
        siteId() {
            return this.$route.params.siteId;
        },
    },

    async mounted() {
        this.deliveries = await DeliveryService.setSiteId(this.siteId).getAll();
    },
};
</script>

<style >
.delivery-summary-card .see-all {
    border-top: 1px solid #707070;
}
</style>