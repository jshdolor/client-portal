<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
        :disabled="disabled"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="internalDate"
                :label="label"
                :prepend-icon="icon"
                v-bind="attrs"
                readonly
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="datepickerDate"
            no-title
            @input="close"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import { toJsDate, formatDate } from "~/Framework/Helpers/Date";

export default {
    name: "DatepickerOnMenu",

    data() {
        return {
            menu: false,
        };
    },

    props: {
        label: {
            type: String,
        },
        date: {
            default: new Date().toDateString(),
        },
        icon: {
            default: "mdi-calendar",
        },
        dateFormat: {
            default: "dd/LL/yyyy",
        },
        disabled: {
            default: false,
        },
    },

    computed: {
        internalDate: {
            get() {
                return formatDate(this.date, "dd/LL/yyyy") ?? "-";
            },
            set(value) {
                this.emitExternalValue(value);
            },
        },
        datepickerDate: {
            get() {
                return (
                    formatDate(this.date, "yyyy-LL-dd") ??
                    new Date().toISOString().substr(0, 10)
                );
            },
            set(value) {
                this.emitExternalValue(value);
            },
        },
    },

    methods: {
        save() {
            this.$refs.menu.save(this.internalDate);
            this.$emit("datepicker:save", this.internalDate);
        },
        close() {
            this.menu = false;
        },
        emitExternalValue(date) {
            const externalDate = formatDate(date, this.dateFormat);
            this.$emit("datepicker:value", externalDate);
        },
    },
};
</script>