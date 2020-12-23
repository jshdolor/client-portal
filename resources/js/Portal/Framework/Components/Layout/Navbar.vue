<template>
    <v-app-bar
        elevation="1"
        color="white"
        :clipped-left="drawer.clipped"
        outlined
        app
        dense
    >
        <AppBarNavIcon />

        <slot></slot>
    </v-app-bar>
</template>

<script>
import { drawer } from "@portal/Application/Config/layout";
import AppBarNavIcon from "~/Framework/Components/Widgets/AppBarNavIcon";

export default {
    name: "AppNavbar",

    components: {
        AppBarNavIcon,
    },

    data() {
        return {
            drawer,
        };
    },
};
</script>

