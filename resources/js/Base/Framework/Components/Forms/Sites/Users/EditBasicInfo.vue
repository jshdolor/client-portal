<template>
    <v-container>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-form :disabled="isSubmitting" lazy-validation>
                <v-col cols="12">
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required"
                    >
                        <v-text-field
                            v-model="form.name"
                            label="Name"
                            :error-messages="formErrors.name || errors"
                            required
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Position"
                        rules="required"
                    >
                        <v-text-field
                            v-model="form.position"
                            label="Position"
                            :error-messages="formErrors.position || errors"
                            required
                        ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Mobile Number"
                        rules="required"
                    >
                        <v-text-field
                            label="Mobile Number"
                            v-model="form.mobile"
                            :error-messages="formErrors.mobile || errors"
                            required
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
    </v-container>
</template>

<script>
import { SITES_USER_BASIC_INFO_UPDATE } from "~/Application/Constants/ErrorNS";
import UpdateBasicInfoRequest from "~/Application/Services/Sites/Requests/UpdateBasicInfoRequest";
import SitesUsersService from "~/Application/Services/Sites/SitesUsersService";
import { findParentByName } from "~/Framework/Helpers";

export default {
    name: "EditBasicInfoForm",

    data() {
        return {
            isSubmitting: false,
            userId: "",
            initialForm: {
                name: "",
                position: "",
                mobile: "",
            },
            form: {
                name: "",
                position: "",
                mobile: "",
            },
        };
    },

    methods: {
        async submit() {
            this.isSubmitting = true;

            this.$store.dispatch("validation/setValidationErrors", {
                [SITES_USER_BASIC_INFO_UPDATE]: {},
            });

            try {
                const proceed = await this.$refs.observer.validate();
                if (proceed) {
                    const request = new UpdateBasicInfoRequest(this.form);
                    const createdData = await SitesUsersService.update(
                        this.userId,
                        request,
                        SITES_USER_BASIC_INFO_UPDATE
                    );

                    this.$root.$emit("showMessage", "User Updated");
                    this.reset();

                    this.parentModal.hide();
                    await this.parentModule.getData();
                }
            } catch (e) {
                console.log(e);
            }

            this.isSubmitting = false;
        },

        reset() {
            this.$refs.observer.reset();
            this.form = this.initialForm;
        },

        getDefaults() {
            const {
                name,
                position,
                mobile,
                userId,
            } = this.$store.state.sitesUser?.info;
            this.form.name = name;
            this.form.position = position;
            this.form.mobile = mobile;
            this.userId = userId;
        },
    },

    watch: {
        "parentModal.dialog": {
            immediate: true,
            handler() {
                this.getDefaults();
            },
        },
    },

    computed: {
        formErrors() {
            if (
                this.$store.state.validation.errors[
                    SITES_USER_BASIC_INFO_UPDATE
                ]
            ) {
                return this.$store.state.validation.errors[
                    SITES_USER_BASIC_INFO_UPDATE
                ];
            }
            return {};
        },

        parentModal() {
            return findParentByName(this, "EditBasicInfoModal");
        },
        parentModule() {
            return findParentByName(this, "SitesUsersUserPage");
        },
    },
};
</script>