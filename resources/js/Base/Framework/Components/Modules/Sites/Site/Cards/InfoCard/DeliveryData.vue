<template>
    <div>
        <!-- <v-row>
            <v-col>
                <DatepickerOnMenu
                    disabled
                    label="SMA Start"
                    :date="site.projectStart"
                />
            </v-col>
            <v-col>
                <DatepickerOnMenu
                    disabled
                    label="SMA End"
                    :date="site.projectEnd"
                />
            </v-col>
        </v-row> -->
        <v-row>
            <v-col v-for="(column, i) in displayData" :key="i">
                <v-list-item two-line v-for="(display, j) in column" :key="j">
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">{{
                            display.value ? display.value : "-"
                        }}</v-list-item-title>
                        <v-list-item-subtitle
                            >{{ display.label }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="dataSrc"
            :items-per-page="5"
            :loading="isLoading"
        ></v-data-table>
    </div>
</template>

<script>
import DeliveryService from "~/Application/Services/Sites/DeliveryService";
import DatepickerOnMenu from "~/Framework/Components/Widgets/DatepickerOnMenu";

export default {
    name: "DeliveryDataDisplay",
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
            columns: 2,
        };
    },

    computed: {
        siteId() {
            return this.$route.params.siteId;
        },
        displayData() {
            const contentPerColumn = Math.ceil(
                this.displayRef.length / this.columns
            );

            const arr = new Array(this.columns).fill([]);

            return arr.map((v, i) => {
                return this.displayRef.filter((d, key) => {
                    return (
                        key < (i + 1) * contentPerColumn &&
                        key >= i * contentPerColumn
                    );
                });
            });
        },
        displayRef() {
            return [
                {
                    label: "Sim Start",
                    value: this.site.simStart,
                },
                {
                    label: "Sim End",
                    value: this.site.simEnd,
                },
                {
                    label: "SMA Start",
                    value: this.site.projectStartFormatted,
                },
                {
                    label: "SMA End",
                    value: this.site.projectEndFormatted,
                },
            ];
        },
    },

    props: {
        site: {
            required: true,
        },
    },

    async mounted() {
        this.isLoading = true;
        this.dataSrc = await DeliveryService.setSiteId(this.siteId).getAll();
        this.isLoading = false;
    },
};
</script>