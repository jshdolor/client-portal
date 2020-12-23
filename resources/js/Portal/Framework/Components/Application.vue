<template>
    <v-app id="app">
        <Sidebar :initilized="isInitialized" />
        <v-main class="grey lighten-4">
            <div  v-if="isInitialized">
                <router-view></router-view>
            </div>
            <v-container v-else>
                <PageLoader :show="!isInitialized" />
            </v-container>

            <v-snackbar
                v-model="message.show"
                :color="message.error ? 'error' : ''"
                :timeout="6000"
            >
                {{ message.text }}
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import Sidebar from "@portal/Framework/Components/Layout/Sidebar";
import UserProfileService from "~/Application/Services/User";
import BaseApplication from "~/Framework/Components/Application";
import PageLoader from "~/Framework/Components/Widgets/PageLoader";

export default {
    extends: BaseApplication,
    name: "Portal",

    components: {
        Sidebar,
        PageLoader,
    },

    methods: {
        async bootPortal() {
            const profile = await UserProfileService.getProfile();
            this.$store.dispatch("user/setProfile", profile);
        },
    },

    data() {
        return {
            message: {
                show: false,
                text: "",
                error: false,
            },
        };
    },

    watch: {
        isInitialized(newValue) {
            if (newValue) {
                this.bootPortal();
            }
        },
        "message.show"(newVal) {
            if (!newVal) {
                this.message = {
                    show: false,
                    text: "",
                    error: false,
                };
            }
        },
    },

    mounted() {
        this.$root.$on("showMessage", (text, error = false) => {
            this.message = {
                show: true,
                text,
                error,
            };
        });
    },
};
</script>