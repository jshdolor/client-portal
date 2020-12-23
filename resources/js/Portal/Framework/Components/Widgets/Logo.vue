<template>
    <v-list two-line subheader>
        <v-list-item class="vanguard-logo">
            <img :src="logoSrc" />
            <v-list-item-content>
                <v-list-item-title class="title"> Vanguard </v-list-item-title>
                <v-list-item-subtitle class="subtitle">
                    Wireless
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: "Logo",

    data() {
        return {
            logoSrc: "/img/logo.png",
        };
    },
};
</script>

<style scoped>
.v-application .title {
    font-family: HelveticaNeueBold !important;
    font-size: 20px !important;
    text-align: right;
    margin-bottom: 0;
    line-height: 1;
}
.v-application .subtitle {
    text-align: right !important;
    font-size: 14px !important;
    text-transform: uppercase;
    font-family: HelveticaNeueLight !important;
}
img {
    height: 30px;
}
</style>