<template>
    <v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab exact :to="to" v-for="{ label, to } in navMenu" :key="to.name">{{
            label
        }}</v-tab>
    </v-tabs>
</template>

<script>
import { menu } from "@portal/Application/Config";

export default {
    name: "Navbar",

    computed: {
        currentMenu() {
            return menu.find((m) => m.path == "/sites");
        },
        navMenu() {
            return this.currentMenu.nav.map((navItem) => {
                return {
                    to: { name: navItem.name, params: this.siteId },
                    label: navItem.label,
                };
            });
        },
        siteId() {
            return this.$route.params.siteId;
        },
    },
};
</script>

<style scoped>
.v-tab {
    font-size: 1rem;
}
.v-tab--active {
    padding-top: 4px;
    border-bottom: 4px solid;
}
</style>