<template>
    <v-container>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-form :disabled="isSubmitting" lazy-validation autocomplete="off">
                <v-row>
                    <v-col>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Company Name"
                            rules="required"
                        >
                            <v-text-field
                                v-model="company.name"
                                label="Company Name"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Contact Person"
                            rules="required"
                        >
                            <v-text-field
                                v-model="company.contactPerson"
                                label="Contact Person Name"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Job Title"
                            rules="required"
                        >
                            <v-text-field
                                v-model="company.jobTitle"
                                label="Job Title"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Contact Email"
                            rules="required|email"
                        >
                            <v-text-field
                                v-model="company.email"
                                label="Email"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Company Mobile"
                            rules="required"
                        >
                            <v-text-field
                                v-model="company.mobile"
                                label="Mobile"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider
                            v-slot="{ errors }"
                            name="Company Landline"
                            rules="required"
                        >
                            <v-text-field
                                v-model="company.landline"
                                label="Landline"
                                :error-messages="errors"
                                required
                            ></v-text-field>
                        </ValidationProvider>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="text-right">
                        <v-btn @click="closeModal" class="vanguard-action-btn"
                            >Cancel</v-btn
                        >
                        <v-btn
                            @click="submit"
                            :loading="isSubmitting"
                            class="vanguard-action-btn"
                            >Submit</v-btn
                        >
                    </v-col>
                </v-row>
            </v-form>
        </ValidationObserver>
    </v-container>
</template>
<script>
import SiteService from "~/Application/Services/Sites";
import UpdateCompanyDataRequest from "~/Application/Services/Sites/Requests/UpdateSiteCompanyRequest";
import { findParentByName } from "~/Framework/Helpers";
import { SITES_SITE_COMPANY_DATA_UPDATE } from "~/Application/Constants/ErrorNS";

export default {
    name: "EditSiteCompanyForm",
    inject: ["siteData"],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        site() {
            return this.siteData() ?? {};
        },
        company() {
            return {
                name: this.site.company?.name,
                contactPerson: this.site.company?.contactPerson,
                jobTitle: this.site.company?.jobTitle,
                email: this.site.company?.personEmail,
                mobile: this.site.company?.personMobile,
                landline: this.site.company?.personLandline,
            };
        },
        parentModule() {
            return findParentByName(this, "CompanyContactInfo");
        },
        parentModal() {
            return findParentByName(this, "EditSiteCompanyModal");
        },
        formErrors() {
            return (
                this.$store.state.validation.errors[
                    SITES_SITE_COMPANY_DATA_UPDATE
                ] ?? {}
            );
        },
    },
    methods: {
        async submit() {
            const proceed = await this.$refs.observer.validate();
            if (!proceed) {
                return;
            }

            this.isSubmitting = true;
            const request = new UpdateCompanyDataRequest(this.company);
            const data = await SiteService.update(
                this.site.siteId,
                request,
                SITES_SITE_COMPANY_DATA_UPDATE
            );

            const siteId = this.$route.params.siteId;
            this.parentModule.getSiteData(siteId);
            this.isSubmitting = false;
            this.closeModal();
        },
        closeModal() {
            this.parentModal.dialog = false;
        },
    },
    watch: {
        isSubmitting(value) {
            if (value) {
                this.$emit("EditSiteCompanyForm::submitting", true);
                return;
            }
            this.$emit("EditSiteCompanyForm::submitting", false);
        },
    },
};
</script>