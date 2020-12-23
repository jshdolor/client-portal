
<template>
    <v-navigation-drawer
        v-model="drawerOpen"
        v-bind="drawer"
        class="elevation-5"
        app
    >
        <Logo class="my-3" />

        <UserAvatar :name="name" />
        <v-divider dark></v-divider>

        <v-list class="pt-0">
            <v-list-item
                :to="item.path"
                v-for="item in filteredMenu"
                :key="item.path"
                link
                active
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script>
import { drawer } from "@portal/Application/Config/layout";
import { menu } from "@portal/Application/Config";

import Logo from "@portal/Framework/Components/Widgets/Logo";
import UserAvatar from "@portal/Framework/Components/Widgets/UserAvatar";

import AuthService from "~/Application/Services/Auth";

export default {
    name: "Sidebar",
    components: {
        UserAvatar,
        Logo,
    },
    data() {
        return {
            drawer,
        };
    },

    methods: {
        async logout() {
            await AuthService.logout();
            window.location.href = "/";
        },
    },

    props: {
        initilized: {
            type: Boolean,
            default: false,
            required: true,
        },
    },

    computed: {
        user() {
            return this.$store.state.user.profile;
        },
        name() {
            return this.user.name;
        },

        filteredMenu() {
            return menu;
        },
        drawerOpen: {
            get() {
                return this.$store.state.intent.showDrawer;
            },
            set(value) {
                this.$store.dispatch(
                    `intent/${value ? "showDrawer" : "hideDrawer"}`
                );
            },
        },
    },
};
</script>
