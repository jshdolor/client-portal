<template>
    <ValidationObserver ref="observer" v-slot="{ validate, reset }">
        <v-form :disabled="isSubmitting" lazy-validation>
            <v-col cols="12">
                <ValidationProvider
                    v-slot="{ errors }"
                    name="New password"
                    rules="required"
                >
                    <v-text-field
                        label="New password"
                        :type="!showAsPassword ? 'text' : 'password'"
                        :error-messages="formErrors.password || errors"
                        v-model="password"
                        @click:append="showAsPassword = !showAsPassword"
                        autocomplete="new-password"
                        required
                        :append-icon="
                            !showAsPassword ? 'mdi-eye' : 'mdi-eye-off'
                        "
                    ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                    v-slot="{ errors }"
                    name="Confirm new password"
                    rules="required|confirmed:New password"
                >
                    <v-text-field
                        label="Confirm new password"
                        :type="!showAsPassword2 ? 'text' : 'password'"
                        :error-messages="formErrors.password || errors"
                        v-model="confirmPassword"
                        @click:append="showAsPassword2 = !showAsPassword2"
                        autocomplete="new-password"
                        required
                        :append-icon="
                            !showAsPassword2 ? 'mdi-eye' : 'mdi-eye-off'
                        "
                    ></v-text-field>
                </ValidationProvider>
            </v-col>

            <v-row class="mt-4">
                <v-spacer></v-spacer>
                <v-btn
                    class="vanguard-action-btn"
                    @click="submit"
                    :loading="isSubmitting"
                    >Apply changes</v-btn
                >
            </v-row>
        </v-form>
    </ValidationObserver>
</template>

<script>
import { SITES_USER_CHANGE_PASSWORD } from "~/Application/Constants/ErrorNS";
import ChangePasswordRequest from "~/Application/Services/Sites/Requests/ChangePasswordRequest";
import SitesUsersService from "~/Application/Services/Sites/SitesUsersService";
import { findParentByName } from "~/Framework/Helpers";

export default {
    name: "ChangePasswordForm",

    data() {
        return {
            isSubmitting: false,
            password: "",
            confirmPassword: "",
            showAsPassword: true,
            showAsPassword2: true,
        };
    },

    methods: {
        async submit() {
            this.isSubmitting = true;

            this.$store.dispatch("validation/setValidationErrors", {
                [SITES_USER_CHANGE_PASSWORD]: {},
            });

            try {
                const proceed = await this.$refs.observer.validate();
                if (proceed) {
                    const request = new ChangePasswordRequest({
                        password: this.password,
                        confirmPassword: this.confirmPassword
                    });

                    const createdData = await SitesUsersService.changePassword(
                        this.userId,
                        request,
                        SITES_USER_CHANGE_PASSWORD
                    );

                    this.$root.$emit("showMessage", "Password Changed");
                    this.reset();

                    this.parentModal.hide();
                }
            } catch (e) {
                console.log(e);
            }

            this.isSubmitting = false;
        },

        reset() {
            this.$refs.observer.reset();
            this.password = "";
            this.confirmPassword = "";
        },
    },

    computed: {
        formErrors() {
            if (
                this.$store.state.validation.errors[SITES_USER_CHANGE_PASSWORD]
            ) {
                return this.$store.state.validation.errors[
                    SITES_USER_CHANGE_PASSWORD
                ];
            }
            return {};
        },

        parentModal() {
            return findParentByName(this, "ChangePasswordModal");
        },
        parentModule() {
            return findParentByName(this, "SitesUsersUserPage");
        },
        userId() {
            return this.$route.params.userId;
        },
    },
};
</script>