<template>
    <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                <div><v-icon small>mdi-trash-can</v-icon> DELETE</div>
            </v-btn>
        </template>
        <v-card :loading="isSubmitting">
            <v-card-title>
                <span class="headline">Delete this Site User</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="text-vanguard-h6 mt-4" v-html="message"></div>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col class="text-right">
                        <v-btn
                            :loading="isSubmitting"
                            class="vanguard-action-btn"
                            @click="deleteUser"
                        >
                            DELETE SITE USER
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import BaseModal from "~/Framework/Components/Modals/BaseModal";
import {
    MESSAGE_SUCCESS_DELETE_SITE_USER,
    MESSAGE_DELETE_SITE_USER,
} from "~/Application/Constants";
import SiteUserService from "~/Application/Services/Sites/SitesUsersService";
import { replaceTextValues } from "~/Framework/Helpers/String";
export default {
    extends: BaseModal,
    name: "DeleteSitesUserModal",
    data() {
        return {
            dialog: false,
            isSubmitting: false,
        };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        userId: {
            required: true,
        },
    },
    methods: {
        async deleteUser() {
            this.isSubmitting = true;
            const isSiteUserDeleted = await SiteUserService.delete(this.userId);
            if (isSiteUserDeleted) {
                const message = replaceTextValues(
                    MESSAGE_SUCCESS_DELETE_SITE_USER,
                    { name: this.nameUserId }
                );
                this.$root.$emit("showMessage", message);
                this.$router.replace({ name: "sites.users" });
            }
            this.isSubmitting = false;
        },
    },
    computed: {
        message() {
            return replaceTextValues(MESSAGE_DELETE_SITE_USER, {
                name: this.nameUserId,
            });
        },
        nameUserId() {
            return `${this.name} (${this.userId})`;
        },
    },
};
</script>