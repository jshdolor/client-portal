<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                <div>
                    <v-icon small>mdi-message-processing</v-icon> RESEND
                    ONBOARDING SMS
                </div>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{
                    MODAL_TITLE_RESEND_ONBOARDING_SMS
                }}</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div class="text-vanguard-h6">
                        The below SMS will be sent to this User:
                    </div>

                    <div class="my-4">
                        Welcome to Vanguard Wireless - your Safety Manager 2.0
                        Your site is {{ site.name }}. You can now login using
                        your account:
                    </div>
                    <div>Site ID: {{ site.siteId }}</div>
                    <div>User ID: {{ displayUserId }}</div>
                    <div class="my-4">
                        Please download the app on Appstore for iOS
                        <a
                            href="https://apps.apple.com/us/app/safety-manager-2-0/id1169956270"
                            >https://apps.apple.com/us/app/safety-manager-2-0/id1169956270</a
                        >

                        or Google Playstore for Android
                        <a
                            href="https://play.google.com/store/apps/details?id=com.ua.vsecurity.vnc"
                            >https://play.google.com/store/apps/details?id=com.ua.vsecurity.vnc</a
                        >
                    </div>
                    <div>
                        Please follow this link for the onboarding resources and
                        user guides:
                        <a href="www.vanguardwireless.com.au/user-guides"
                            >www.vanguardwireless.com.au/user-guides</a
                        >
                        <div>Password: Woke5</div>
                    </div>
                    <div class="text-vanguard-h6 mt-4">
                        Note that this can only be done up to 5 times per User.
                    </div>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :loading="loading"
                    @click="resendOnboardingSMS"
                    class="vanguard-action-btn"
                    >RESEND</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    MESSAGE_SUCCESS_ONBOARDING_SMS_SENT,
    MODAL_TITLE_RESEND_ONBOARDING_SMS,
} from "~/Application/Constants";
import BaseModal from "~/Framework/Components/Modals/BaseModal";
import SitesUserService from "~/Application/Services/Sites/SitesUsersService";

export default {
    extends: BaseModal,
    name: "CreateSitesResendOnboardingSMSModal",
    methods: {
        async resendOnboardingSMS() {
            this.loading = true;

            try {
                await SitesUserService.setSiteId(
                    this.site.siteId
                ).resendOnboardingSMS(this.userId);
                this.dialog = false;
                this.$root.$emit(
                    "showMessage",
                    MESSAGE_SUCCESS_ONBOARDING_SMS_SENT
                );
            } catch (e) {}

            this.loading = false;
        },
    },
    data() {
        return {
            dialog: false,
            loading: false,
            MODAL_TITLE_RESEND_ONBOARDING_SMS,
        };
    },
    inject: ["siteData"],
    computed: {
        site() {
            return this.siteData();
        },
        userId() {
            return this.$route.params.userId;
        },
        displayUserId() {
            return (this.userId || "").toString().padStart(2, "0");
        },
    },
};
</script>