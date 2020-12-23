<template>
    <div>
        <v-row justify="space-around" class="my-3 pt-3">
            <v-skeleton-loader type="avatar" :loading="name.length === 0">
                <v-avatar v-bind="avatarSettings">
                    <div class="initials">{{ initials }}</div>
                </v-avatar>
            </v-skeleton-loader>
        </v-row>
        <v-row justify="space-around" class="my-3 user-name-display">
            {{ name | titlecase }}
        </v-row>
    </div>
</template>

<script>
import { primaryColor } from "~/Application/Config";

export default {
    name: "UserAvatar",

    data() {
        return {
            avatarSettings: {
                color: primaryColor,
                rounded: "true",
                size: "155",
            },
        };
    },

    props: {
        name: {
            required: true,
            type: String,
            default: "",
        },
    },

    computed: {
        initials() {
            return this.name
                .split(" ")
                .filter((name, i) => i < 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        },
    },
};
</script>