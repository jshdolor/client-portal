<template>
    <CardActionDisplay
        title="Location Services"
        :loading="loading"
        class="location-services-card"
    >
        <template slot="action"><a></a> </template>
        <template slot="title">
            Location Services
            <v-chip
                class="location-service-preference"
                v-if="
                    location.originalCreatedAt &&
                    location.preference !== 'No Data'
                "
                outlined
                label
                >{{ location.preference }}</v-chip
            >
        </template>
        <SiteMap
            v-if="location.enabled && site.perimeter && userInPerimeter"
            :perimeter="site.perimeter"
            :center="coordinates"
        >
            <LMarker :lat-lng="coordinates">
                <LPopup class="">
                    {{ location.createdAtFormatted }}
                </LPopup>
            </LMarker>
        </SiteMap>
        <v-row v-else justify="center" align="center" class="location-disabled">
            <v-col
                align="center"
                v-if="!loading && Object.keys(site).length > 0"
            >
                <h3 v-if="!site.hasPerimeter">Site has no perimeter yet</h3>
                <h3 v-else-if="!location.originalCreatedAt">
                    No data available
                </h3>
                <h3 v-else-if="!location.enabled">
                    Currently disabled by User
                    <br />
                    <small>{{ disabledTimeAgo }}</small>
                </h3>
                <h3 v-else-if="!userInPerimeter">
                    User is currently outside the Site perimeter
                </h3>
            </v-col>
        </v-row>
    </CardActionDisplay>
</template>

<script>
import CardActionDisplay from "~/Framework/Components/Widgets/Card/ActionDisplayToolbar";
import { LMarker, LPopup } from "vue2-leaflet";
import { formatDistanceToNowStrict } from "date-fns";
import { pointInPerimeter } from "~/Framework/Helpers/Map";
import { toJsDate } from "~/Framework/Helpers/Date";

import SiteMap from "~/Framework/Components/Widgets/SiteMap";

export default {
    name: "LocationServicesCard",
    components: {
        CardActionDisplay,
        LMarker,
        SiteMap,
        LPopup,
    },
    inject: ["siteData"],
    computed: {
        site() {
            return this.siteData();
        },
        loading() {
            return (
                this.$store.state.sitesUser.info.userId !=
                this.$route.params.userId
            );
        },
        disabledTimeAgo() {
            if (this.location?.createdAtFormatted) {
                return (
                    formatDistanceToNowStrict(
                        toJsDate(this.location?.unformattedCreatedAt)
                    ) 
                    + " ago"
                );
            }
            return "";
        },
        location() {
            return this.$store.state.sitesUser.info?.lastLocation || {};
        },
        coordinates() {
            if (!this.location.latitude) {
                return [0, 0];
            }
            return [this.location?.latitude, this.location?.longitude];
        },

        userInPerimeter() {
            return pointInPerimeter(this.site.polygonPerimeter, {
                lat: this.location?.latitude,
                lng: this.location?.longitude,
            });
        },
    },
};
</script>

<style scoped>
.value-text {
    font-size: 20px;
}

.key-text {
    font-size: 14px;
}

.map {
    height: 100%;
    width: 100%;
}

.location-disabled {
    height: 100%;
}

.location-service-preference {
    font-family: HelveticaNeueLight !important;
}
</style>