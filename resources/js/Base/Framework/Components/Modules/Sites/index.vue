
<template>
    <div>
        <AppBarNavIcon />
        <v-skeleton-loader v-if="isFetching" class="mt-5" type="table" />
        <v-container v-if="this.sites.length !== 0" fluid>
            <v-row>
                <v-col cols="12" xl="4" md="4" sm="12">
                    <v-text-field v-model="search">
                        <template v-slot:label>
                            <v-icon style="vertical-align: middle"
                                >mdi-magnify</v-icon
                            >
                            Search Site
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-data-table
                        :headers="headers"
                        :items="sites"
                        :search="search"
                        :loading="isFetching"
                        :item-class="(item) => 'row-selectable'"
                        row-selectable
                        @click:row="openSite"
                    >
                        <template v-slot:item.updatedAt="{ item }">
                            <span
                                :class="
                                    colorSelector(item.siteCheckinTimeStatus)
                                "
                            >
                                {{ item.updatedAt }}
                            </span>
                        </template>

                        <template v-slot:item.pushNotifications="{ item }">
                            <span
                                :class="
                                    colorSelector(
                                        item.lastPushNotificationCheck === 1
                                    )
                                "
                            >
                                {{ item.check1Confirm }}
                            </span>
                        </template>

                        <template class="text-end" v-slot:item.icon="{ item }">
                            <v-icon right>mdi-arrow-right</v-icon>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <EmptyComponent
            message="No Sites Assigned"
            v-if="!isFetching && this.sites.length === 0"
        />
    </div>
</template>

<script>
import SiteService from "~/Application/Services/Sites";
import AppBarNavIcon from "~/Framework/Components/Widgets/AppBarNavIcon";
import EmptyComponent from "~/Framework/Components/Widgets/Empty";

export default {
    name: "SitesList",
    components: {
        AppBarNavIcon,
        EmptyComponent,
    },

    data() {
        return {
            sites: [],
            isFetching: false,
            headers: [
                { text: "Site Name", value: "name" },
                { text: "Company Name", value: "companyName" },
                { text: "Site ID", value: "siteId" },
                { text: "Software Version", value: "softwareVersion" },
                { text: "Site Address", value: "address" },
                { text: "Created", value: "createdAt" },
                { text: "TCU Check-in", value: "updatedAt" },
                {
                    text: "Push Notification Check-in",
                    value: "pushNotifications",
                },
                { text: "Status", value: "status" },
                { text: "", value: "icon", align: "end" },
            ],
            search: "",
        };
    },

    methods: {
        openSite({ siteId }) {
            this.$router.push({ name: "sites.site", params: { siteId } });
        },
        colorSelector(condition) {
            return condition ? "green--text" : "red--text";
        },
        showDrawer() {
            this.$store.dispatch("intent/showDrawer");
        },
    },

    computed: {
        isDrawerShowing() {
            return this.$store.state.intent.showDrawer;
        },
    },

    async mounted() {
        this.isFetching = true;
        this.sites = await SiteService.getAll();
        this.isFetching = false;
    },
};
</script>