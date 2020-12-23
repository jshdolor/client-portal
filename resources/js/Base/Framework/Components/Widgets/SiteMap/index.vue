<template>
    <LMap @ready="mapReady" class="map" v-bind="mapOptions">
        <LTileLayer v-bind="tileLayerOptions" />

        <LGeoJson
            v-if="perimeter"
            :options="{ color: 'green' }"
            :geojson="perimeter"
        ></LGeoJson>

        <slot></slot>
    </LMap>
</template>
<script>
import { openMapUrl } from "~/Application/Config";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

export default {
    name: "SiteMap",
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
    },
    data() {
        return {
            mapOptions: {
                zoom: 16,
                center: this.center,
                "max-zoom": 22,
            },
            tileLayerOptions: {
                url: openMapUrl,
                options: {
                    maxNativeZoom: 19, // OSM max available zoom is at 19.
                    maxZoom: 22,
                },
            },
        };
    },
    props: {
        perimeter: {
            type: Object,
        },
        center: {
            required: true,
            type: Array,
        },
    },
    methods: {
        mapReady(map) {
            this.$emit("ready", map);
        },
    },
};
</script>