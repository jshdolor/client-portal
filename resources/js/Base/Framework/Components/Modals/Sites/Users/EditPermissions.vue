<template>
    <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                :disabled="loading"
                small
                text
                ripple
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Permissions</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-skeleton-loader
                    ref="skeleton"
                    type="list-item-avatar-two-line"
                    :loading="permissions.length === 0"
                    class="mx-auto"
                >
                    <EditPermissionsForm
                        :permissions="permissions"
                    ></EditPermissionsForm
                ></v-skeleton-loader>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import EditPermissionsForm from "~/Framework/Components/Forms/Sites/Users/EditPermissions";
import PermissionsService from "~/Application/Services/Permissions";
import BaseModal from "~/Framework/Components/Modals/BaseModal";

export default {
    extends: BaseModal,
    name: "EditPermissionsModal",
    components: {
        EditPermissionsForm,
    },
    data() {
        return {
            dialog: false,
            permissions: [],
        };
    },
    watch: {
        dialog(newVal) {
            if (!newVal) {
                this.$emit("close");
            }
        },
    },
    props: ["loading"],
    async mounted() {
        this.permissions = await PermissionsService.getAll();
    },
};
</script>