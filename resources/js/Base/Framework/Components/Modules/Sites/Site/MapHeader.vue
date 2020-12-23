<template>
    <div class="site-map-container" v-if="site.hasCoordinates">
        <Map :perimeter="site.perimeter" :center="site.coordinates">
            <LMarker :lat-lng="site.coordinates"> </LMarker>
        </Map>
    </div>
</template>

<script>
import Map from "~/Framework/Components/Widgets/SiteMap";
import { LMarker } from "vue2-leaflet";

export default {
    name: "SiteHeaderMap",
    inject: ["siteData", "siteDataLoading"],
    components: {
        Map,
        LMarker,
    },
    computed: {
        site() {
            return this.siteData();
        },
    },
};
</script>
<style scoped>
.site-map-container {
    height: 300px;
}
</style>