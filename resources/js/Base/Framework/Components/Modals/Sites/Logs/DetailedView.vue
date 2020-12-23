<template>
    <v-dialog v-model="dialog" width="700">
        <v-card>
            <v-card-title>
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col v-for="(column, i) in displayData" :key="i">
                        <v-list-item
                            two-line
                            v-for="(display, j) in column"
                            :key="j"
                        >
                            <v-list-item-content>
                                <v-list-item-title
                                    class="font-weight-medium"
                                    :class="
                                        display.textColor
                                            ? display.textColor
                                            : ''
                                    "
                                    >{{
                                        display.value ? display.value : "-"
                                    }}</v-list-item-title
                                >
                                <v-list-item-subtitle>{{
                                    display.label
                                }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import BaseModal from "~/Framework/Components/Modals/BaseModal";

export default {
    extends: BaseModal,
    name: "SiteLogsDetailedView",

    data() {
        return {
            dialog: false,
        };
    },

    props: {
        infoData: {
            required: true,
        },
    },
};
</script>