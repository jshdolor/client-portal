
<template>
    <CardActionDisplay title="Basic Info" :loading="loading">
        <v-list-item two-line v-for="(value, key) in basicInfo" :key="key">
            <v-list-item-content v-if="value">
                <v-list-item-title class="value-text">{{
                    value
                }}</v-list-item-title>
                <v-list-item-subtitle class="key-text">{{
                    key
                }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <template slot="action">
            <EditBasicInfoModal :loading="loading"></EditBasicInfoModal>
        </template>
    </CardActionDisplay>
</template>

<script>
import CardActionDisplay from "~/Framework/Components/Widgets/Card/ActionDisplayToolbar";
import EditBasicInfoModal from "~/Framework/Components/Modals/Sites/Users/EditBasicInfo";

export default {
    name: "BasicInfoCard",
    components: {
        CardActionDisplay,
        EditBasicInfoModal,
    },
    methods: {
        displayUserId(id) {
            if (!id) return "";
            return id.toString().padStart(2, "0");
        },
    },
    computed: {
        basicInfo() {
            return {
                "User ID": this.displayUserId(this.info.userId),
                Name: this.info.name,
                Position: this.info.position,
                "Mobile Number": this.info.mobile,
                "Last Login": this.info.lastLogin,
            };
        },
        loading() {
            return this.info.userId != this.$route.params.userId;
        },
        info() {
            return this.$store.state.sitesUser?.info;
        },
    },
};
</script>

<style scoped>
.value-text {
    font-size: 20px;
}

.key-text {
    font-size: 14px;
}
</style>