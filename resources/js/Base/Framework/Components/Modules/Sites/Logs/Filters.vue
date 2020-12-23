<template>
    <v-select
        :items="filters"
        v-model="selectedFilters"
        :label="label"
        multiple
    >
        <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 4">
                <span>{{ item }}</span>
            </v-chip>
            <span v-if="index === 4" class="grey--text caption">
                (+{{
                    selectedFilters.length - 4 === 1
                        ? `${selectedFilters.length - 4} other`
                        : `${selectedFilters.length - 4} others`
                }}
                )
            </span>
        </template>
        <template v-slot:prepend-item>
            <v-list-item ripple @click="toggle">
                <v-list-item-action>
                    <v-icon>
                        {{ icon }}
                    </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Select All </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
        </template>
    </v-select>
</template>
<script>
export default {
    name: "LogsFilters",

    data() {
        return {
            selectedFilters: [],
        };
    },

    methods: {
        toggle() {
            this.$nextTick(() => {
                if (this.selectedAll) {
                    this.selectedFilters = [];
                } else {
                    this.selectedFilters = this.filters;
                }
            });
        },
    },

    watch: {
        init(value) {
            if (value) {
                this.selectedFilters = this.filters;
            }
        },
        selectedFilters() {
            this.$emit("site:logs:filter", this.selectedFilters);
        },
    },

    computed: {
        selectedAll() {
            return this.selectedFilters.length === this.filters.length;
        },
        someSelected() {
            return this.selectedFilters.length > 0 && !this.selectedAll;
        },
        icon() {
            if (this.selectedAll) return "mdi-close-box";
            if (this.someSelected) return "mdi-minus-box";
            return "mdi-checkbox-blank-outline";
        },
    },

    props: {
        filters: {
            required: true,
        },
        init: {
            required: true,
        },
        label: {
            required: true,
        },
    },
};
</script>