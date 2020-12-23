<template>
    <v-dialog v-model="dialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="vanguard-action-btn" v-bind="attrs" v-on="on">
                CREATE USER
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Create User</span>
                <v-spacer />
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <CreateUserForm></CreateUserForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import CreateUserForm from "~/Framework/Components/Forms/Sites/Users/CreateUser";
import BaseModal from "~/Framework/Components/Modals/BaseModal";

export default {
    extends: BaseModal,
    name: "CreateSitesUserModal",
    components: {
        CreateUserForm,
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>