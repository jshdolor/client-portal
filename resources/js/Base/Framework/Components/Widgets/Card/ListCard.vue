<template>
    <v-skeleton-loader type="card" :loading="loading">
        <v-card class="card-action-display" outlined>
            <div
                class="card-toolbar card-title-large py-1"
                v-if="titleSize === 'large'"
            >
                <v-row>
                    <v-col class="text-center pa-0">
                        <span class="card-toolbar-title"
                            ><slot name="title">{{ title }} </slot>
                        </span>
                    </v-col>
                </v-row>
                <v-row class="my-2" v-if="hasTitleValueSlot">
                    <v-col class="text-center card-toolbar-title-value pa-0">
                        <slot name="title-value"></slot>
                    </v-col>
                </v-row>
                <slot name="subtitle"></slot>
            </div>
            <div class="card-toolbar px-2 pt-2" v-else>
                <v-row align="center" justify="space-between" no-gutters>
                    <span class="card-toolbar-title">
                        <slot name="title">{{ title }} </slot>
                    </span>
                    <span class="card-list-value"
                        ><slot name="title-value"></slot
                    ></span>
                </v-row>
            </div>
            <v-card-text class="list-main" v-if="listData.length > 0">
                <v-row
                    class="px-2 pt-3 pb-1 list-container"
                    align="center"
                    justify="space-between"
                    no-gutters
                    :key="i"
                    v-for="(data, i) in listData"
                >
                    <div>
                        <div
                            class="card-list-title"
                            v-if="data.hasOwnProperty('title')"
                            v-html="nullDisplay(data.title)"
                        ></div>
                        <div
                            v-if="data.hasOwnProperty('subtitle')"
                            class="card-list-subtitle grey--text"
                            v-html="nullDisplay(data.subtitle)"
                        ></div>
                    </div>
                    <div
                        class="card-list-value"
                        v-if="data.hasOwnProperty('value')"
                        v-html="nullDisplay(data.value)"
                    ></div>
                </v-row>
            </v-card-text>
            <v-card-text v-if="hasCustomDisplay">
                <slot name="custom-list-display"></slot>
            </v-card-text>
            <v-card-text class="list-footer" v-if="hasFooterSlot">
                <slot name="list-footer"></slot>
            </v-card-text>
        </v-card>
    </v-skeleton-loader>
</template>

<script>
export default {
    name: "SummaryListCard",
    props: {
        title: {},
        loading: {},
        listData: {
            type: Array,
            default: () => [],
        },
        titleSize: {
            default: "large",
        },
    },
    methods: {
        nullDisplay(display) {
            if (!display && display != 0) {
                return "-";
            }

            const span = document.createElement("span");
            span.innerHTML = display;
            const textValue = span.textContent;

            if (textValue === "null" || textValue === "undefined") {
                return "-";
            }

            return display;
        },
    },

    computed: {
        hasFooterSlot() {
            return !!this.$slots["list-footer"];
        },
        hasTitleValueSlot() {
            return !!this.$slots["title-value"];
        },
        hasCustomDisplay() {
            return !!this.$slots["custom-list-display"];
        },
    },
};
</script>

<style lang="scss" scoped>
.card-action-display {
    .card-list- {
        &title,
        &value {
            font-size: 20px;
        }

        &subtitle {
            font-size: 14px;
        }
    }

    .list-container {
        border-bottom: 1px solid #707070;
        &:last-child {
            border-bottom: 0;
        }
    }

    .card-toolbar:only-child {
        border-bottom: none;
    }

    .card-title-large {
        .card-toolbar-title-value {
            font-family: HelveticaNeueBold;
            font-size: 69px;
            line-height: 80%;
        }
    }
}
</style> 