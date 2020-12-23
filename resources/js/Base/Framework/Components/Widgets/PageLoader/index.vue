<template>
    <div v-if="show">
        <v-skeleton-loader
            :boilerplate="false"
            type="article"
            transition="scale-transition"
            :tile="true"
            class="mx-auto"
        >
        </v-skeleton-loader>
        <v-skeleton-loader
            :boilerplate="false"
            type="article"
            transition="scale-transition"
            :tile="true"
            class="mx-auto"
        >
        </v-skeleton-loader>
        <v-skeleton-loader
            :boilerplate="false"
            type="article"
            transition="scale-transition"
            :tile="true"
            class="mx-auto"
        >
        </v-skeleton-loader>
    </div>
</template>

<script>
export default {
    name: "PageLoader",
    props: ["show"],
};
</script>