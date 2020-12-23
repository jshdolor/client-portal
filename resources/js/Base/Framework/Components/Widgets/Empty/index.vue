<template>
    <v-container class="empty-component-container" fluid>
        <v-row class="" justify="center" align="center">
            <v-col class="text-center" cols="12">
                <v-icon color="primary" class="text-h1"
                    >mdi-playlist-remove</v-icon
                >
                <div class="text-vanguard-h5 text-vanguard-bold">
                    {{ message }}
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "EmptyComponent",
    props: {
        message: {
            default: "No Data yet",
        },
    },
};
</script>

<style scoped>
.empty-component-container .row {
    height: calc(100vh - 200px);
}
</style>