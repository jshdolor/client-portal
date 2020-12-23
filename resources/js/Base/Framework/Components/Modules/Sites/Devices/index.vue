<template>
    <v-container fluid>
        <v-skeleton-loader class="mx-auto" type="table" v-if="loading" />
        <div v-if="!loading">
            <Device
                v-for="(devices, deviceGroup) in groupedDevices"
                :name="deviceGroup"
                :key="deviceGroup"
                :devices="devices"
            />
        </div>
        <EmptyComponent
            message="No devices on Site"
            v-if="!loading && this.devices.length === 0"
        />
    </v-container>
</template>
<script>
import BaseSite from "~/Framework/Components/Modules/Sites/BaseSites";
import EmptyComponent from "~/Framework/Components/Widgets/Empty";
import Device from "./DeviceBlock";
import DeviceService from "~/Application/Services/Sites/Devices";
import { groupBy } from "~/Framework/Helpers";

export default {
    extends: BaseSite,
    name: "SiteDevices",
    components: {
        Device,
        EmptyComponent,
    },

    data() {
        return {
            devices: [],
            loading: false,
        };
    },

    computed: {
        availableDeviceTypes() {
            return [
                ...new Set(
                    this.devices
                        .map((device) => device.groups)
                        .reduce((a, b) => a.concat(b), [])
                ),
            ];
        },
        groupedDevices() {
            let grouped = {};
            this.availableDeviceTypes
                .sort()
                .reverse()
                .forEach((type) => {
                    grouped[type] = this.devices.filter(
                        (device) => device.groups.indexOf(type) > -1
                    );
                });

            return grouped;
        },
    },

    async mounted() {
        this.loading = true;
        this.devices = await DeviceService.setSiteId(this.siteId).getAll();
        this.loading = false;
    },
};
</script>