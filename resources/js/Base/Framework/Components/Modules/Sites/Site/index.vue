<template>
    <div>
        <v-container fluid v-if="isFetchingSite">
            <v-skeleton-loader type="card" />
        </v-container>
        <div style="position: relative" v-else>
            <MapHeader />
            <v-container class="site-data-container" fluid>
                <TitleHeader />
                <!-- <v-row v-masonry>
                    <v-col
                        cols="12"
                        sm="4"
                        v-for="(siteCard, index) in cards"
                        :key="index"
                    >
                        <component v-bind:is="siteCard"></component>
                    </v-col>
                </v-row> -->
                <v-row class="row-section pa-4">
                    <v-col cols="12" sm="6" md="4">
                        <SystemStatusCard />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <InternetStabilityCard />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <NurseCallActivationsCard />
                        <EvacuationActivationsCard class="mt-5" />
                    </v-col>
                </v-row>

                <v-row class="row-section pa-4">
                    <v-col cols="12" sm="6" md="4">
                        <UserCountCard />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <DevicesCard />
                    </v-col>
                </v-row>

                <v-row class="row-section pa-4">
                    <v-col cols="12" sm="6" md="4">
                        <ConfigurationsCard />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <SubscriptionsCard />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import Base from "~/Framework/Components/Modules/Sites/Site/BaseSite";

import MapHeader from "./MapHeader";
import TitleHeader from "./TitleHeader";

import SystemStatusCard from "./Cards/SystemStatus";
import InternetStabilityCard from "./Cards/InternetStability";
import UserCountCard from "./Cards/UserCount";
import NurseCallActivationsCard from "./Cards/NurseCallActivations";
import EvacuationActivationsCard from "./Cards/EvacuationActivations";
import ConfigurationsCard from "./Cards/Configurations";
import DevicesCard from "./Cards/Devices";
import SubscriptionsCard from "./Cards/Subscriptions";

import SiteService from "~/Application/Services/Sites";

export default {
    name: "SitePage",
    mixins: [Base],
    provide() {
        return {
            summaryData: () => this.summary,
            // siteDataLoading: () => this.isFetchingSite,
        };
    },
    data() {
        return {
            cards: [
                [
                    SystemStatusCard,
                    InternetStabilityCard,
                    NurseCallActivationsCard,
                    EvacuationActivationsCard,
                ],
                [UserCountCard, DevicesCard],
                [ConfigurationsCard, SubscriptionsCard],
            ],
            columns: 3,
            summary: false,
        };
    },
    components: {
        MapHeader,
        TitleHeader,
        SystemStatusCard,
        InternetStabilityCard,
        NurseCallActivationsCard,
        EvacuationActivationsCard,
        UserCountCard,
        DevicesCard,
        ConfigurationsCard,
        SubscriptionsCard,
    },
    computed: {
        displayColumns() {
            return 12 / this.columns;
        },
    },
    methods: {
        async getSummary(siteId) {
            this.summary = await SiteService.summary(siteId);
        },
    },
    watch: {
        "$route.params.siteId": {
            immediate: true,
            handler(id) {
                this.getSummary(id);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.site-data-container {
    z-index: 2;
    background: #f5f5f5;
}

.row-section {
    border-bottom: 1px solid #707070;
}
.row-section:last-of-type {
    border-bottom: none;
}
</style>