<template>
    <div id="app">
        <ol class="breadcrumb">
            test
        </ol>
        <Sidebar />
        <section id="content" v-if="isInitialized">
            <div class="container">
                <v-app id="app">
                    <router-view></router-view>
                </v-app>
            </div>
        </section>
    </div>
</template>

<script>
import BaseApplication from "~/Framework/Components/Application";
import Sidebar from "@dashboard/Framework/Components/Layout/Sidebar";

export default {
    extends: BaseApplication,
    name: "Dashboard",

    components: {
        Sidebar,
    },
};
</script>