<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Change Password</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>Forgot Password</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Force TCU Restart</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Force TCU Update</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>Force GPServices Update</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    name: "SiteSideMenu",
};
</script>