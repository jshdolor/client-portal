<template>
    <v-container fluid>
        <v-row align="stretch" justify="space-between">
            <v-col cols="4">
                <v-btn
                    class="back-btn"
                    :to="{ name: 'sites.users', params: { siteId } }"
                    text
                >
                    <v-icon>mdi-arrow-left</v-icon>
                    <span class="label-to">Users</span>
                </v-btn>
            </v-col>
            <v-col cols="8" class="text-right">
                <ResendOnboardingModal></ResendOnboardingModal>
                <ChangePasswordModal />
                <DeleteUserModal :name="info.name || ''" :userId="userId" />
            </v-col>
        </v-row>
        <v-row align="stretch">
            <v-col cols="12" sm="4">
                <BasicInfoCard></BasicInfoCard>
            </v-col>
            <v-col cols="12" sm="4">
                <SMSSettingsCard></SMSSettingsCard>
            </v-col>
            <v-col cols="12" sm="4">
                <LocationServicesCard></LocationServicesCard>
            </v-col>
        </v-row>
        <v-row align="stretch">
            <v-col cols="12" sm="12">
                <PermissionsCard></PermissionsCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SitesUserService from "~/Application/Services/Sites/SitesUsersService";
import SitesService from "~/Application/Services/Sites";
import BaseSitesPage from "~/Framework/Components/Modules/Sites/BaseSites";

import BasicInfoCard from "./Cards/BasicInfoCard";
import SMSSettingsCard from "./Cards/SMSSettingsCard";
import LocationServicesCard from "./Cards/LocationServicesCard";
import PermissionsCard from "./Cards/PermissionsCard";

import ResendOnboardingModal from "~/Framework/Components/Modals/Sites/Users/ResendOnboardingSMS";
import DeleteUserModal from "~/Framework/Components/Modals/Sites/Users/DeleteUser";
import ChangePasswordModal from "~/Framework/Components/Modals/Sites/Users/ChangePassword";

export default {
    extends: BaseSitesPage,
    name: "SitesUsersUserPage",
    components: {
        BasicInfoCard,
        SMSSettingsCard,
        LocationServicesCard,
        PermissionsCard,
        ResendOnboardingModal,
        DeleteUserModal,
        ChangePasswordModal,
    },
    provide() {
        return {
            siteData: () => this.site,
        };
    },
    data() {
        return {
            infoLoading: false,
            info: {},
            site: {},
        };
    },

    methods: {
        async getData() {
            this.$store.dispatch("sitesUser/setInfo", {});

            this.infoLoading = true;
            try {
                this.info = await SitesUserService.setSiteId(this.siteId).get(
                    this.userId
                );

                this.site = await SitesService.get(this.siteId);

                this.$store.dispatch("sitesUser/setInfo", this.info);
            } catch (e) {
                this.info = {};
                this.$store.dispatch("sitesUser/setInfo", {});
            }
            this.infoLoading = false;
        },
    },

    props: ["userId"],

    mounted() {
        this.$store.dispatch("sitesUser/setInfo", {});
        this.getData();
    },
};
</script>