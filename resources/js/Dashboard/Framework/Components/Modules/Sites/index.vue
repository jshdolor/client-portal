

<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4" xl="4" md="4" sm="12">
                <v-text-field v-model="search">
                    <template v-slot:label>
                        <v-icon style="vertical-align: middle;"
                            >mdi-magnify</v-icon
                        >
                        Search Users
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="8" class="text-right">
                <v-btn class="ma-1" outlined color="dark">View Map</v-btn>
                <v-btn class="ma-1" outlined color="dark">Bulk Upload</v-btn>
                <v-btn class="ma-1" outlined color="dark">Create User</v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12">
                <v-data-table
                    :headers="headersWithIcon"
                    :items="users"
                    :search="search"
                    :loading="dataLoading"
                    :item-class="(item) => 'row-selectable'"
                    @click:row="goToUser"
                >
                    <template v-slot:item.condition1="{ item }">
                        <v-simple-checkbox
                            readonly
                            :value="item.condition1"
                        ></v-simple-checkbox>
                    </template>

                    <template v-slot:item.condition2="{ item }">
                        <v-simple-checkbox
                            readonly
                            :value="item.condition2"
                        ></v-simple-checkbox>
                    </template>

                    <template v-slot:item.receiveDevice="{ item }">
                        <v-simple-checkbox
                            readonly
                            :value="item.receiveDevice"
                        ></v-simple-checkbox>
                    </template>

                    <template v-slot:item.receiveTCU="{ item }">
                        <v-simple-checkbox
                            readonly
                            :value="item.receiveTCU"
                        ></v-simple-checkbox>
                    </template>

                    <template v-slot:item.icon="{ item }">
                        <v-icon right>mdi-arrow-right</v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BaseSitesUserPage from "~/Framework/Components/Modules/Sites/Users";

export default {
    extends: BaseSitesUserPage,
    name: "SitesUserPage",

    methods: {
        goToUser({ siteId }) {
            this.$router.push({ name: "sites.site", params: { siteId } });
        },
    },
    computed: {
        headersWithIcon() {
            return [...this.headers, { text: "", value: "icon", align: "end" }];
        },
    },
};
</script>