<template>
    <v-card>
        <v-toolbar flat color="primary" dark>
            <v-toolbar-title class="text-h5"
                >{{ site.name }} ({{ site.siteId }})</v-toolbar-title
            >
            <v-spacer></v-spacer>

            <EditSiteModal
                v-if="false && activeTab === 0"
                :loading="siteDataFetching"
            />
            <EditSiteCompanyDataModal
                v-if="activeTab === 1"
                :loading="siteDataFetching"
            />
            <!-- <SideMenu /> -->

            <template v-slot:extension>
                <v-tabs
                    align-with-title
                    v-model="activeTab"
                    class="text-caption"
                >
                    <v-tabs-slider color="white"></v-tabs-slider>

                    <v-tab>
                        <v-icon left> mdi-domain </v-icon>
                        Site
                    </v-tab>
                    <v-tab>
                        <v-icon left> mdi-contacts </v-icon>
                        Company & Contact Person
                    </v-tab>
                    <v-tab>
                        <v-icon left> mdi-truck-delivery </v-icon>
                        Delivery
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <SiteDataDisplay :site="site" />
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <CompanyDataDisplay :company="site.company" />
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <DeliveryDataDisplay :site="site" />
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import SiteDataDisplay from "./SiteData";
import CompanyDataDisplay from "./CompanyData";
import DeliveryDataDisplay from "./DeliveryData";

import SideMenu from "./SideMenu";

import EditSiteModal from "~/Framework/Components/Modals/Sites/Site/EditSite";
import EditSiteCompanyDataModal from "~/Framework/Components/Modals/Sites/Site/EditSiteCompany";

export default {
    name: "SiteInfoCard",
    inject: ["siteData", "siteDataLoading"],
    components: {
        SiteDataDisplay,
        CompanyDataDisplay,
        DeliveryDataDisplay,
        EditSiteCompanyDataModal,
        EditSiteModal,
        SideMenu,
    },
    data() {
        return {
            // activeTab: null,
        };
    },
    computed: {
        site() {
            return this.siteData();
        },
        siteDataFetching() {
            return this.siteDataLoading();
        },
        activeTab: {
            get() {
                return this.$route.query.tab ?? "0";
            },
            set(tab) {
                if (tab === this.$route.query.tab) return;
                this.$router
                    .push({
                        name: "sites.site",
                    })
                    .catch(() => {});

                this.$router
                    .push({
                        name: "sites.site",
                        query: { tab },
                    })
                    .catch(() => {});
            },
        },
    },
};
</script>