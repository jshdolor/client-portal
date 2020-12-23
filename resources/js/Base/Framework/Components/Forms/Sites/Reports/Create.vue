<template>
    <v-form>
        <v-container fluid>
            <v-row align="start">
                <v-col cols="2" class="form-label"> Period </v-col>
                <v-col cols="5">
                    <DatepickerOnMenu label="Start" />
                </v-col>
                <v-col cols="5">
                    <DatepickerOnMenu label="End" />
                </v-col>
            </v-row>
            <v-row align="start">
                <v-col cols="2" class="form-label"> Contents </v-col>
                <v-col cols="10">
                    <v-row>
                        <v-col>
                            <v-checkbox :value="true" label="System Status" />
                            <v-checkbox
                                :value="true"
                                label="Internet Stability"
                            />
                            <v-checkbox :value="true" label="Devices" />
                        </v-col>
                        <v-col>
                            <v-checkbox :value="true" label="Users" />
                            <v-checkbox :value="true" label="Events" />
                            <v-checkbox :value="true" label="Call outs" />
                        </v-col>
                        <v-col>
                            <v-checkbox :value="true" label="System failures" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
import DatepickerOnMenu from "~/Framework/Components/Widgets/DatepickerOnMenu";

export default {
    name: "CreateReportForm",
    components: {
        DatepickerOnMenu,
    },
};
</script>

<style scoped>
.form-label {
    font-size: 20px;
}
</style>