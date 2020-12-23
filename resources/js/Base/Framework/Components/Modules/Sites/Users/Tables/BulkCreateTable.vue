<template>
    <v-data-table
        fixed-header
        :headers="tableHeaders"
        :items="usersFormatted"
        :loading="loading"
        class="bulk-upload-table"
        show-expand
    >
        <template v-slot:item.name="props">
            <RowEditor label="Name" name="name" :props="props">
                {{ props.item.name }}
            </RowEditor>
        </template>

        <template v-slot:item.position="props">
            <RowEditor label="Position" name="position" :props="props">
                {{ props.item.position }}
            </RowEditor>
        </template>

        <template v-slot:item.password="props">
            <RowEditor label="Password" name="password" :props="props">
                {{ props.item.password }}
            </RowEditor>
        </template>

        <template v-slot:item.mobile="props">
            <RowEditor label="Mobile" name="mobile" :props="props">
                <v-tooltip
                    top
                    v-if="!isValueUnique('mobile', props.item.mobile)"
                >
                    <template v-slot:activator="{ on }">
                        <v-icon class="warning--text" v-on="on">
                            mdi-alert-circle
                        </v-icon>
                    </template>
                    <div>Mobile Number not unique</div></v-tooltip
                >{{ props.item.mobile }}
            </RowEditor>
        </template>

        <template v-slot:item.receiveNCAcceptDeclineSMS="{ item }">
            <v-icon>{{
                getConditionIcon(item.receiveNCAcceptDeclineSMS)
            }}</v-icon>
        </template>

        <template v-slot:item.receiveEvacNCSMS="{ item }">
            <v-icon>{{ getConditionIcon(item.receiveEvacNCSMS) }}</v-icon>
        </template>

        <template v-slot:item.receiveDevice="{ item }">
            <v-icon>{{ getConditionIcon(item.receiveDevice) }}</v-icon>
        </template>

        <template v-slot:item.receiveTCU="{ item }">
            <v-icon>{{
                getConditionIcon(
                    item.receiveTCU,
                    site.isReceiveTCUOfflineAlertsAllowed
                )
            }}</v-icon>
        </template>

        <template v-slot:item.data-table-expand="{ item }">
            <td>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon
                            class="error--text"
                            @click="removeRow(item.tempKey)"
                            v-on="on"
                            >mdi-delete-circle</v-icon
                        >
                    </template>
                    <span>Remove Row</span>
                </v-tooltip>
            </td>
            <td v-if="Object.keys(item.errors || {}).length > 0">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-icon class="error--text" v-on="on"
                            >mdi-alert-circle</v-icon
                        >
                    </template>
                    <div v-for="(error, key) of item.errors">
                        {{ error[0] }}
                    </div>
                </v-tooltip>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import { headers } from "~/Application/Config/Sites/User/BulkCreate";
import RowEditor from "~/Framework/Components/Widgets/Table/RowEditTextField";

export default {
    name: "BulkCreateTable",
    components: {
        RowEditor,
    },
    data() {
        return {
            headers,
            removedUsers: [],
        };
    },
    props: {
        users: {
            required: true,
            type: Array,
        },
        loading: {
            required: true,
        },
    },
    inject: ["siteUsers", "siteData"],
    methods: {
        resetFilters() {
            this.removedUsers = [];
        },
        removeRow(row) {
            this.removedUsers.push(row);
        },
        isValueUnique(column, value) {
            const siteUsers = this.siteUsers() || [];
            const temporaryAndRegisteredUsers = [
                ...siteUsers,
                ...this.usersFormatted,
            ];
            const valueCountArr = temporaryAndRegisteredUsers.filter(
                (user) => user[column] == value
            );
            return valueCountArr.length === 1;
        },
        getConditionIcon(value, additionalTruthyValue = true) {
            const truthyValue = ["Y", "y"];
            return truthyValue.indexOf(value) !== -1 && additionalTruthyValue
                ? "mdi-checkbox-marked-circle"
                : "mdi-checkbox-blank-circle-outline";
        },
    },
    computed: {
        usersFormatted() {
            return (this.users || [])
                .map((user, key) => {
                    if (user.mobile[0] != "+" && user.mobile[0] != "0") {
                        user.mobile = `0${user.mobile}`;
                    }
                    return user;
                })
                .filter(
                    (user) => this.removedUsers.indexOf(user.tempKey) === -1
                );
        },
        tableHeaders() {
            return this.headers;
        },
        site() {
            return this.siteData();
        },
    },
    watch: {
        usersFormatted: {
            immediate: true,
            handler(value) {
                this.$emit("dataFormatted", this.usersFormatted);
            },
        },
    },
};
</script>