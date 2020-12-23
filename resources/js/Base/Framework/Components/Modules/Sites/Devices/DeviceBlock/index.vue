<template>
    <div class="mb-2">
        <v-row align-content="center">
            <v-col cols="6" align-self="end">
                <span class="text-vanguard-h6 text-vanguard-bold">
                    <v-icon :class="deviceTypeGroupIcons[name].cls">{{
                        deviceTypeGroupIcons[name].icon
                    }}</v-icon>
                    {{ name }} ({{ devices.length }})
                </span>
            </v-col>
            <v-col cols="6" align-self="end">
                <v-text-field
                    v-model="searchTerm"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <Table :searchTerm="searchTerm" :items="devices" />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Table from "./Table";
import { deviceTypeGroupIcons } from "~/Application/Config/Sites/Device";
export default {
    name: "DeviceTableBlock",
    components: {
        Table,
    },
    data() {
        return {
            searchTerm: "",
            deviceTypeGroupIcons,
        };
    },
    props: {
        name: {
            required: true,
        },
        devices: {
            required: true,
            type: Array,
        },
    },
};
</script>