<template>
    <v-btn
        :disabled="disabled"
        :loading="isSubmitting"
        @click="() => processUsers()"
        class="vanguard-action-btn"
    >
        Create Users
    </v-btn>
</template>
<script>
import SitesUsersService from "~/Application/Services/Sites/SitesUsersService";
import BulkCreateSiteUserRequest from "~/Application/Services/Sites/Requests/BulkCreateSiteUserRequest";
import { findParentByName } from "~/Framework/Helpers";
import UnhandledException from "~/Infrastructure/Exception/UnhandledException";
import { allowedUsersPerSite } from "~/Application/Config";

export default {
    name: "BulkCreate",

    data() {
        return {
            isSubmitting: false,
        };
    },

    props: {
        users: {
            required: true,
            type: Array,
        },
        permissionPreset: {
            type: String,
            default: "",
        },
    },

    computed: {
        disabled() {
            return (
                this.users.length === 0 ||
                this.isSubmitting ||
                this.workerPresetNotAvailable ||
                !this.permissionPreset
            );
        },
        parentModal() {
            return findParentByName(this, "BulkUploadModal");
        },
        parentModule() {
            return findParentByName(this, "SitesUsersPage");
        },
        userLimit() {
            return this.parentModule?.site?.userLimit || 0;
        },
        workerPresetNotAvailable() {
            return (
                this.permissionPreset === "Worker" &&
                this.userLimit <= allowedUsersPerSite
            );
        },
    },

    methods: {
        async processUsers() {
            this.isSubmitting = true;
            this.$emit("bulk:submitting", true);
            try {
                const request = new BulkCreateSiteUserRequest(
                    this.users,
                    this.permissionPreset
                );
                const data = await SitesUsersService.bulk(request);

                this.$emit("bulk:submitting", false);
                this.isSubmitting = false;

                this.parentModal.hide();

                this.$root.$emit(
                    "showMessage",
                    "Created all users from CSV file"
                );
                await this.parentModule.getData();
            } catch (e) {
                if (e?.response?.data?.error?.message) {
                    const errors = e?.response?.data?.error?.message;
                    let message = "Check for errors";

                    if (typeof errors !== "string") {
                        this.$emit("errors", errors);
                    } else {
                        message = errors;
                    }

                    new UnhandledException({
                        message,
                    });
                } else {
                    new UnhandledException();
                }
            }
            this.$emit("bulk:submitting", false);
            this.isSubmitting = false;
        },
    },
};
</script>
