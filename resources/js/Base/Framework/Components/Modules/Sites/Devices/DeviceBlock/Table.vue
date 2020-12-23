<template>
    <v-data-table
        sort-by="name"
        :search="searchTerm"
        :headers="headers"
        :items="items"
    >
        <template v-slot:item.enabled="{ item }">
            {{ item.enabled ? "Enabled" : "Disabled" }}
        </template>
        <template v-slot:item.updatedAt="{ item }">
            <span :class="item.updatedAtCls">{{ item.updatedAt }}</span>
        </template>
        <template v-slot:item.connectivity="{ item }">
            <v-icon :class="item.connectivity ? 'green--text' : 'red--text'">{{
                getConditionalIcon(item.connectivity, conditionalIcons)
            }}</v-icon>
        </template>
        <template v-slot:item.mainsPowered="{ item }">
            <v-icon>{{
                getConditionalIcon(item.mainsPowered, conditionalIcons)
            }}</v-icon>
        </template>

        <template v-slot:item.icon="{ item }">
            <v-menu offset-x :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-action>
                            <AsyncSwitch
                                :service="
                                    () =>
                                        service
                                            .setSiteId(siteId)
                                            .toggleStatus(item.deviceId)
                                "
                                v-model="item.enabled"
                            ></AsyncSwitch>
                        </v-list-item-action>
                        <v-list-item-title>{{
                            item.enabled ? "Enabled" : "Disabled"
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-data-table>
</template>
<script>
import { getConditionalIcon } from "~/Framework/Helpers/Component";
import DeviceService from "~/Application/Services/Sites/Devices";
import AsyncSwitch from "~/Framework/Components/Widgets/AsyncSwitch";

export default {
    name: "DeviceTable",
    components: {
        AsyncSwitch,
    },
    data() {
        return {
            headers: [
                {
                    text: "Name",
                    value: "name",
                },
                { text: "Level", value: "level" },
                { text: "Position", value: "position" },
                { text: "Type", value: "deviceType" },
                { text: "Serial Number", value: "serialNumber" },
                { text: "Battery", value: "battery" },
                { text: "Connectivity", value: "connectivity" },
                { text: "Status", value: "enabled" },
                { text: "Last Update", value: "updatedAt" },
                { text: "Mains Powered", value: "mainsPowered" },
                { text: "SIM", value: "sim" },
                { text: "Service Start", value: "serviceStart" },
                { text: "Service End", value: "serviceEnd" },
                { text: "", value: "icon", align: "end" },
            ],
            conditionalIcons: [
                "mdi-checkbox-marked-circle",
                "mdi-close-circle",
            ],
            service: DeviceService,
        };
    },
    methods: {
        getConditionalIcon,
    },
    props: {
        items: {
            required: true,
            type: Array,
        },
        searchTerm: {
            default: "",
        },
    },
    computed: {
        siteId() {
            return this.$route.params.siteId;
        },
    },
};
</script>