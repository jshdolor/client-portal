<template>
    <v-container>
        <ListCard
            :listData="displayData"
            title="Company & Contact Person"
            titleSize="normal"
        >
            <template v-slot:title-value>
                <EditSiteCompanyDataModal />
            </template>
        </ListCard>
    </v-container>
</template>
<script>
import EditSiteCompanyDataModal from "~/Framework/Components/Modals/Sites/Site/EditSiteCompany";
import BaseSite from "~/Framework/Components/Modules/Sites/BaseSites";
import SiteService from "~/Application/Services/Sites";

export default {
    name: "CompanyContactInfo",
    extends: BaseSite,
    components: {
        EditSiteCompanyDataModal,
    },
    data() {
        return {
            site: {},
            isFetching: false,
        };
    },
    provide() {
        return {
            siteData: () => this.site,
            siteDataLoading: () => this.isFetchingSite,
        };
    },
    methods: {
        async getSiteData(id) {
            this.isFetching = true;
            this.site = await SiteService.get(id);
            this.isFetching = false;
        },
    },
    computed: {
        company() {
            return this.site.company || {};
        },
        displayData() {
            return [
                {
                    title: this.company.name,
                    subtitle: "Company Name",
                },
                {
                    title: this.company.contactPerson,
                    subtitle: "Contact Person",
                },
                {
                    title: this.company.jobTitle,
                    subtitle: "Job Title",
                },
                {
                    title: this.company.personEmail,
                    subtitle: "Email",
                },
                {
                    title: this.company.personMobile,
                    subtitle: "Mobile number",
                },
                {
                    title: this.company.personLandline,
                    subtitle: "Landline number",
                },
            ];
        },
    },
    mounted() {
        this.getSiteData(this.siteId);
    },
};
</script>