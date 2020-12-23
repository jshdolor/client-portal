<template>
    <v-card class="card-action-display" :loading="loading" outlined>
        <div class="card-toolbar pa-3">
            <v-row align="center" justify="space-between" no-gutters>
                <span class="card-toolbar-title">
                    <slot name="title">{{ title }} </slot>
                </span>
                <slot name="action">
                    <v-btn
                        small
                        text
                        ripple
                        :disabled="loading"
                        @click="action"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </slot>
            </v-row>
        </div>
        <v-card-text>
            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "ActionDisplayCard",

    props: ["title", "action", "loading"],
};
</script>

