<template>
    <v-row>
        <v-col v-for="(column, i) in displayData" :key="i">
            <v-list-item two-line v-for="(display, j) in column" :key="j">
                <v-list-item-content>
                    <v-list-item-title
                        class="font-weight-medium"
                        :class="display.textColor ? display.textColor : ''"
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
</template>

<script>
export default {
    name: "CompanyDataDisplay",
    props: {
        company: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            displayRef: [
                {
                    label: "Company Name",
                    value: this.company.name,
                },
                {
                    label: "Contact Person Name",
                    value: this.company.contactPerson,
                },
                {
                    label: "Job Title",
                    value: this.company.jobTitle,
                },
                {
                    label: "Email",
                    value: this.company.personEmail,
                },
                {
                    label: "Mobile",
                    value: this.company.personMobile,
                },
                {
                    label: "Landline Number",
                    value: this.company.personLandline,
                },
            ],
            columns: 2,
        };
    },
    computed: {
        displayData() {
            const contentPerColumn = Math.ceil(
                this.displayRef.length / this.columns
            );

            const arr = new Array(this.columns).fill([]);

            return arr.map((v, i) => {
                return this.displayRef.filter((d, key) => {
                    return (
                        key < (i + 1) * contentPerColumn &&
                        key >= i * contentPerColumn
                    );
                });
            });
        },
    },
};
</script>

<style scoped>
</style>