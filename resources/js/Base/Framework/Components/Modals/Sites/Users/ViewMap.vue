<template>
    <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="vanguard-action-btn"
                :disabled="isFetching"
                :loading="isFetching"
                v-bind="attrs"
                v-on="on"
            >
                VIEW MAP
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Map</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="map-container">
                <v-row
                    justify="center"
                    align="center"
                    class="map-container"
                    v-if="!site.hasPerimeter"
                >
                    <v-col align="center">
                        <h3>Site has no perimeter yet</h3>
                    </v-col>
                </v-row>

                <SiteMap
                    v-if="dialog && !isFetching && site.hasPerimeter"
                    v-on:ready="adjustMapPosition"
                    :perimeter="site.perimeter"
                    :center="site.coordinates"
                >
                    <LMarker
                        :key="i"
                        :lat-lng="marker.location.coordinates"
                        v-for="(marker, i) in usersInSitePerimeter"
                    >
                        <LPopup class="view-map-marker">
                            <div @click="goToUser(marker.userId)">
                                <p>User ID: {{ marker.userId }}</p>
                                <p>Name: {{ marker.name }}</p>
                            </div>
                        </LPopup>
                    </LMarker>
                </SiteMap>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import BaseModal from "~/Framework/Components/Modals/BaseModal";
import SitesService from "~/Application/Services/Sites";
import { LMarker, LPopup } from "vue2-leaflet";
import SiteMap from "~/Framework/Components/Widgets/SiteMap";

import { pointInPerimeter } from "~/Framework/Helpers/Map";

export default {
    extends: BaseModal,
    components: {
        SiteMap,
        LMarker,
        LPopup,
    },
    name: "ViewMapModal",
    data() {
        return {
            dialog: false,
            site: {},
        };
    },
    computed: {
        isFetching() {
            return Object.keys(this.site).length === 0;
        },
        usersInSitePerimeter() {
            if (!this.site.hasPerimeter) return [];
            return this.markers.filter(({ location }) => {
                return pointInPerimeter(this.site.polygonPerimeter, {
                    lat: location.coordinates[0],
                    lng: location.coordinates[1],
                });
            });
        },
    },
    methods: {
        adjustMapPosition(map) {
            map.invalidateSize();
        },
        goToUser(userId) {
            this.$router.push({
                name: "sites.users.user",
                params: { userId },
            });
        },
    },
    props: ["markers"],
    watch: {
        "$route.params.siteId": {
            immediate: true,
            async handler(siteId) {
                if (siteId) {
                    this.site = await SitesService.get(siteId);
                }
            },
        },
    },
};
</script>

<style scoped>
.map-container {
    height: 350px;
    padding: 0 !important;
}
.view-map-marker {
    cursor: pointer;
}
</style>