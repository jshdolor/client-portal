<template>
    <v-container>
        <v-form :disabled="isSubmitting" lazy-validation autocomplete="off">
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="site.name"
                        label="Name"
                        required
                    ></v-text-field>
                    <v-input label="Address">
                        <v-text-field
                            v-model="site.addressData.number"
                            label="Number"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="site.addressData.street"
                            label="Street"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="site.addressData.suburb"
                            label="Suburban"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="site.addressData.postalcode"
                            label="Postcode"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="site.addressData.state"
                            label="State"
                            required
                        ></v-text-field>
                    </v-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch
                        v-model="site.isGeofencing"
                        :label="`Geofencing: ${
                            site.isGeofencing ? 'Enabled' : 'Disabled'
                        }`"
                    ></v-switch>
                    <v-switch
                        v-model="site.isInLockdown"
                        :label="`Lockdown: ${
                            site.isInLockdown ? 'Enabled' : 'Disabled'
                        }`"
                    ></v-switch>
                    <v-switch
                        v-model="site.isAdminPinEnabled"
                        :label="`Admin Pin: ${
                            site.isAdminPinEnabled ? 'Enabled' : 'Disabled'
                        }`"
                    ></v-switch>
                    <v-switch
                        v-model="site.isEvacuationConfirmationRequired"
                        :label="`Evacuation Confirmation: ${
                            site.isEvacuationConfirmationRequired
                                ? 'Required'
                                : 'Not Required'
                        }`"
                    ></v-switch>
                </v-col>
                <v-col> Perimeter </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script>
export default {
    name: "EditSiteForm",
    inject: ["siteData"],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        site() {
            return this.siteData();
        },
    },
    watch: {
        isSubmitting(value) {
            if (value) {
                this.$emit("EditSiteForm::submitting", true);
                return;
            }
            this.$emit("EditSiteForm::submitting", false);
        },
    },
};
</script>