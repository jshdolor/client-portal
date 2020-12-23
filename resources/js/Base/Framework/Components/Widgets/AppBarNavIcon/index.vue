<template>
    <v-app-bar-nav-icon
        @click="showDrawer"
        v-if="!isDrawerShowing"
    ></v-app-bar-nav-icon>
</template>

<script>
export default {
    name: "AppBarNavIcon",
    methods: {
        showDrawer() {
            this.$store.dispatch("intent/showDrawer");
        },
    },

    computed: {
        isDrawerShowing() {
            return this.$store.state.intent.showDrawer;
        },
    },
};
</script>