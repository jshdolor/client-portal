<template>
    <v-dialog v-model="dialog" width="450">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                <div><v-icon small>mdi-key</v-icon> Change Password</div>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Change Password</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <ChangePasswordForm></ChangePasswordForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import ChangePasswordForm from "~/Framework/Components/Forms/Sites/Users/ChangePassword";
import BaseModal from "~/Framework/Components/Modals/BaseModal";

export default {
    extends: BaseModal,
    name: "ChangePasswordModal",
    components: {
        ChangePasswordForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>